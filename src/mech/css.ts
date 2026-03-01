/**
 * Copyright (c) 2025 adoravel
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import meowmix1 from "~/hash/meowmix1.ts";
import { Context, Middleware } from "@july/snarl";
import { Component, jsx, JsxElement, JsxNode } from "@july/snarl/jsx-runtime";

const CLASS_RE = /\.([a-zA-Z_][\w-]*)/g;

const styleRegistry = new Map<string, string>();

const contextualisedStyles = new WeakMap<Context<any>, Set<string>>();

type Until<T extends string, Delims extends string> = T extends `${infer Before}${Delims}${string}` ? Before
	: T;

type ExtractFromSelectors<T extends string> = T extends `${string}.${infer Rest}` ? Until<
		Rest,
		| " "
		| "\n"
		| "\t"
		| "\r"
		| "{"
		| ":"
		| ","
		| ">"
		| "+"
		| "~"
		| "["
		| "."
		| "#"
		| ";"
		| "}"
		| "/"
		| "*"
	> extends infer Name extends string ? Name extends "" ? never
		: Name | ExtractFromSelectors<Rest>
	: never
	: never;

type ExtractFlatClassKeys<T extends string> = ExtractFromSelectors<
	Until<T, "{">
>;

type ScopedStyles<T extends string> =
	& {
		[K in ExtractFlatClassKeys<T>]: string;
	}
	& {
		readonly __hash: string;
		readonly __css: string;
		href: string;

		/** mark this stylesheet as used for the current request (for contextual injection) */
		use(ctx: Context): void;
	};

function extractClassKeys(input: string): Set<string> {
	const classes = new Set<string>();
	CLASS_RE.lastIndex = 0;

	let match;
	while ((match = CLASS_RE.exec(input)) !== null) {
		classes.add(match[1]);
	}

	return classes;
}

function generateScopedStyle(content: string, scopeId: string): string {
	return content.replace(CLASS_RE, (_, name) => `.${scopeId}_${name}`);
}

export function css<const S extends string>(src: S): ScopedStyles<S> {
	src = src.trim() as S;
	if (!src) throw new Error("css: empty stylesheet");

	const keys = extractClassKeys(src);
	if (!keys.size) {
		throw new Error("css: no class selectors found");
	}

	const hash = meowmix1(src);
	if (styleRegistry.has(hash)) {
		throw new Error(`css: hash collision ${hash}`);
	}

	const style = generateScopedStyle(src, hash);
	styleRegistry.set(hash, style);

	const result: any = {
		__hash: hash,
		__css: style,
		href: `/css/${hash}.css`,
		use(ctx: Context<any>) {
			let styles = contextualisedStyles.get(ctx);
			if (!styles) {
				contextualisedStyles.set(ctx, styles = new Set());
			}
			styles.add(hash);
		},
	};

	for (const key of keys) {
		result[key] = `${hash}_${key}`;
	}
	return result as ScopedStyles<S>;
}

export function cssMiddleware(): Middleware {
	return (ctx: Context, next: () => Promise<Response>) => {
		if (
			!ctx.url.pathname.startsWith("/css/") ||
			!ctx.url.pathname.endsWith(".css")
		) {
			return next();
		}

		const hash = ctx.url.pathname.slice(5, -4);
		const content = styleRegistry.get(hash);

		if (!content) {
			return ctx.notFound();
		}

		return new Response(content, {
			headers: {
				"Content-Type": "text/css; charset=utf-8",
				"Cache-Control": "public, max-age=31536000, immutable",
			},
		});
	};
}

declare module "@july/snarl" {
	interface Context {
		useStyles(...styles: ScopedStyles<string>[]): void;

		get import(): Component<{ styles: ScopedStyles<string>[] }>;

		get styles(): Component;
	}
}

Context.prototype.useStyles = function (...styles: ScopedStyles<string>[]) {
	let mem = contextualisedStyles.get(this);
	if (!mem) {
		contextualisedStyles.set(this, mem = new Set());
	}
	for (const s of styles) {
		mem.add(s.__hash);
	}
};

Object.defineProperty(Context.prototype, "styles", {
	get(this: Context): Component {
		// deno-lint-ignore no-this-alias
		const ctx = this;

		return (_props?: JsxElement["props"]) => {
			const mem = contextualisedStyles.get(ctx);
			if (!mem || mem.size === 0) return null;

			const nodes: JsxNode[] = [];

			for (const hash of mem) {
				nodes.push(
					jsx("link", {
						rel: "stylesheet",
						href: `/css/${hash}.css`,
					}),
				);
			}

			return nodes.length === 1 ? nodes[0] : nodes;
		};
	},
});

Object.defineProperty(Context.prototype, "import", {
	get(this: Context): Component {
		// deno-lint-ignore no-this-alias
		const ctx = this;

		return function ({ styles }: Parameters<Context["import"]>[0]) {
			ctx.useStyles(...styles);
			return ctx.styles({});
		} as any;
	},
});
