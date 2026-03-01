/**
 * Copyright (c) 2025 adoravel
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import meowmix1 from "~/hash/meowmix1.ts";
import { Context, Middleware } from "@july/snarl";
import { Component, Fragment, jsx, JsxElement, JsxNode } from "@july/snarl/jsx-runtime";
import { retrieveContext } from "../global.ts";

const CLASS_RE = /\.([a-zA-Z_][\w-]*)/g;

const styleRegistry = new Map<string, string>();

const contextualisedStyles = new WeakMap<Context<any>, Set<string>>();
type Until<T extends string, Delims extends string> = T extends `${infer Before}${Delims}${string}` ? Before
	: T;

type ExtractFlatClassKeys<T extends string> = T extends `${infer _}.${infer Rest}`
	? Rest extends `${infer Name}${" " | "{" | ":" | "\n" | "\t" | "," | ">" | "+" | "~" | "[" | "." | "#"}${infer Tail}`
		? Name | ExtractFlatClassKeys<Tail>
	: Rest extends `${infer Name}` ? Name
	: never
	: never;

export type ScopedStyles<T extends string> =
	& {
		[K in ExtractFlatClassKeys<T>]: string;
	}
	& {
		readonly scope: string;
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
	return `@scope(.${scopeId}){${content}}`;
}

export function css<const S extends string>(src: S): ScopedStyles<S> {
	src = src.trim() as S;
	if (!src) throw new Error("css: empty stylesheet");

	const hash = meowmix1(src);
	if (styleRegistry.has(hash)) {
		throw new Error(`css: hash collision ${hash}`);
	}

	const style = generateScopedStyle(src, hash);
	styleRegistry.set(hash, style);

	const result: any = {
		scope: hash,
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

	const keys = extractClassKeys(src);
	for (const key of keys) {
		result[key] = key;
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

		get styles(): Component;
	}
}

Context.prototype.useStyles = function (...styles: ScopedStyles<string>[]) {
	let mem = contextualisedStyles.get(this);
	if (!mem) {
		contextualisedStyles.set(this, mem = new Set());
	}
	for (const s of styles) {
		mem.add(s.scope);
	}
};

Object.defineProperty(Context.prototype, "styles", {
	get(this: Context): Component {
		// deno-lint-ignore no-this-alias
		const ctx = this;

		return (_props: any = {}) => {
			const mem = contextualisedStyles.get(ctx);
			if (!mem || mem.size === 0) return null;

			const nodes: JsxElement[] = [];

			for (const hash of mem) {
				nodes.push(
					jsx("link", {
						rel: "stylesheet",
						href: `/css/${hash}.css`,
					}),
				);
			}

			mem.clear();
			return jsx(Fragment, { children: nodes });
		};
	},
});

export function Import({ styles = [] }: { styles: ScopedStyles<string>[] }) {
	const ctx = retrieveContext()!;
	if (styles.length) {
		ctx.useStyles(...styles);
	}
	return jsx("head", { children: ctx.styles({}) as JsxElement[] });
}
