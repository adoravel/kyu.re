/**
 * Copyright (c) 2025 adoravel
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import meowmix1 from "~/hash/meowmix1.ts";
import { Context, Middleware } from "@july/snarl";
import { retrieveContext } from "../global.ts";

const CLASS_RE = /\.([a-zA-Z_][\w-]*)/g;

const styleRegistry = new Map<string, string>();
const contextualisedStyles = new WeakMap<Context<any>, Set<string>>();

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
		use(ctx: Context): void;
	};

// brace characters inside string values should be replaced with unicode escapes
const CONDITIONAL_AT = /^@(media|supports|layer|container|document)\b/i;

const RAW_AT = /^@(keyframes|font-face|font-palette-values|counter-style|page|viewport|color-profile)\b/i;

function prefixSelectors(selector: string, scope: string): string {
	return selector
		.split(",")
		.map((s) => s.trim())
		.filter(Boolean)
		.map((s) => {
			if (s.includes(":scope")) return s.replace(/:scope\b/g, scope);
			if (s.startsWith("&")) return s;
			return `${scope} ${s}`;
		})
		.join(",");
}

function transformRules(src: string, scope: string): string {
	let out = "";
	let i = 0;

	while (i < src.length) {
		while (i < src.length && src[i] <= " ") i++;
		if (i >= src.length) break;

		if (src[i] === "/" && src[i + 1] === "*") {
			const end = src.indexOf("*/", i + 2);
			i = end === -1 ? src.length : end + 2;
			continue;
		}

		if (src[i] === "}") {
			i++;
			break;
		}

		let sel = "";
		let hasBlock = false;

		scan: while (i < src.length) {
			if (src[i] === "/" && src[i + 1] === "*") {
				const end = src.indexOf("*/", i + 2);
				i = end === -1 ? src.length : end + 2;
				continue;
			}
			switch (src[i]) {
				case "{":
					hasBlock = true;
					i++;
					break scan;
				case "}":
					break scan;
				default:
					sel += src[i++];
			}
		}

		sel = sel.trim();
		if (!hasBlock || !sel) break;

		const blockStart = i;
		let depth = 1;
		while (i < src.length && depth > 0) {
			if (src[i] === "{") depth++;
			else if (src[i] === "}") depth--;
			i++;
		}

		const block = src.slice(blockStart, i - 1);

		if (RAW_AT.test(sel)) {
			out += `${sel}{${block}}`;
		} else if (CONDITIONAL_AT.test(sel)) {
			out += `${sel}{${transformRules(block, scope)}}`;
		} else {
			out += `${prefixSelectors(sel, scope)}{${block}}`;
		}
	}

	return out;
}

function generateScopedStyle(content: string, scopeId: string): string {
	return transformRules(content.trim(), `.${scopeId}`);
}

function extractClassKeys(input: string): Set<string> {
	const classes = new Set<string>();
	CLASS_RE.lastIndex = 0;

	let match;
	while ((match = CLASS_RE.exec(input)) !== null) {
		classes.add(match[1]);
	}

	return classes;
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

export function styleInjectionMiddleware(): Middleware {
	return async (ctx, next) => {
		const res = await next();

		const mem = contextualisedStyles.get(ctx);
		if (!mem || mem.size === 0) return res;

		const html = await res.text();

		const links = [...mem]
			.map((hash) => `<link rel="stylesheet" href="/css/${hash}.css">`)
			.join("");

		const injected = html.replace("</head>", `${links}</head>`);

		return new Response(injected, {
			headers: res.headers,
		});
	};
}

declare module "@july/snarl" {
	interface Context {
		useStyles(...styles: ScopedStyles<string>[]): void;
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

export function Import({ styles = [] }: { styles: ScopedStyles<string>[] }) {
	const ctx = retrieveContext()!;
	if (styles.length) {
		ctx.useStyles(...styles);
	}
	return null;
}
