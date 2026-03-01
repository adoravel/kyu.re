/**
 * Copyright (c) 2025 adoravel
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { Context, Middleware } from "@july/snarl";
import { minify as mini } from "@minify-html/deno";

const cache = new Map<string, string>();

const encoder = new TextEncoder();
const decoder = new TextDecoder();

async function sha1(input: string): Promise<string> {
	const hash = await crypto.subtle.digest("SHA-1", new TextEncoder().encode(input));
	return Array.from(new Uint8Array(hash))
		.map((b) => b.toString(16).padStart(2, "0"))
		.join("");
}

export default function minify(): Middleware {
	return async (_ctx: Context, next: () => Promise<Response>) => {
		const response = await next();

		const contentType = response.headers.get("Content-Type") || "";
		if (!contentType.includes("text/html") && !contentType.includes("text/css")) {
			return response;
		}

		let body = await response.text();
		if (!body) return response;

		const hash = await sha1(body);
		if (cache.has(hash)) {
			return new Response(cache.get(hash), {
				status: response.status,
				statusText: response.statusText,
				headers: response.headers,
			});
		}

		if (contentType.includes("text/css")) {
			body = body
				.replace(/\/\*[\s\S]*?\*\//g, "")
				.replace(/\s*([{}:;,])\s*/g, "$1")
				.replace(/^\s+|\s+$/gm, "")
				.replace(/\n+/g, "");
		} else {
			const data = mini(encoder.encode(body), {
				keep_spaces_between_attributes: false,
				keep_comments: false,
				minify_css: true,
				minify_js: true,
			});
			body = decoder.decode(data);
		}
		cache.set(hash, body);

		return new Response(body, {
			status: response.status,
			statusText: response.statusText,
			headers: response.headers,
		});
	};
}
