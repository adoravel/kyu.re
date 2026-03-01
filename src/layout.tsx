/**
 * Copyright (c) 2025 adoravel
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { Context } from "@july/snarl";
import { jsx, JsxElement, JsxNode } from "@july/snarl/jsx-runtime";
import { css } from "./mech/css.ts";
import meowmix1 from "./hash/meowmix1.ts";

const styles = `
	:root {
		--theme-background: #0e0811;
		--theme-background-alt: #11111b;
		--theme-surface: #18111a;
		--theme-surface-border: #2a242d;
		--theme-foreground: #f4e2f2;
		--theme-primary: #eec0f4;
		--theme-foreground-alt: #b9a6c8;
		--theme-foreground-bruh: #987f9c;
		--theme-separator: #313244;

		--space-0: 0.16rem;
		--space-1: 0.25rem;
		--space-2: 0.5rem;
		--space-pad-surface: 0.625rem;
		--space-3: 0.75rem;
		--space-4: 1rem;
		--space-5: 1.25rem;
		--space-6: 1.5rem;
		--space-7: 2rem;
		--space-8: 2.5rem;
		--space-9: 3rem;
		--space-10: 4rem;

		--spacing-xs: var(--space-1);
		--spacing-sm: var(--space-2);
		--spacing-md: var(--space-4);
		--spacing-lg: var(--space-6);
		--spacing-xl: var(--space-7);
		--spacing-2xl: var(--space-9);
		--spacing-3xl: var(--space-10);

		--section-margin: var(--space-7);
		--card-padding: var(--space-4);
		--button-padding-x: var(--space-2);
		--button-padding-y: var(--space-1);
		--input-padding: var(--space-3);

		--radius-sm: 2px;
		--radius-md: 3px;
		--radius-lg: 10px;
		--radius-circle: 1000px;
		--radius-music: 15%;

		--transition-fast: 0.2s ease-in-out;
		--transition-smooth: 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);

		--font-size-xs: 11px;
		--font-size-sm: 12px;
		--font-size-md: 0.875rem;
		--font-size-base: 17px;
		--font-size-lg: 1.1rem;
		--font-size-xl: 1.5rem;
		--font-size-2xl: 2.4rem;

		--avatar-size: 160px;

		--max-width: 55em;
		--section-spacing: 2em;

		--z-background: -1;
		--z-base: 0;
		--z-elevated: 10;
	}

	*, *::before, *::after {
		box-sizing: border-box;
		margin: 0;
	}

	body {
		background-color: var(--theme-background);
		color: var(--theme-foreground);
		max-width: var(--max-width);
		margin: 0 auto;
		padding: var(--spacing-xl) 16px;
	}

	html,
	body,
	pre,
	code,
	button {
		font-family:
			"Iosevka Custom Web", "Iosevka Custom", Iosevka, monospace, sans-serif;
		font-size: var(--font-size-base);
		text-rendering: optimizeLegibility;
		line-height: 1.75rem;
	}

	a {
		color: var(--theme-primary);
	    text-decoration: none;
	}

	section p {
		margin-bottom: var(--spacing-md);
		font-size: 0.9em;
		color: var(--theme-foreground-alt);
	}
	
	@view-transition {
		navigation: auto;
	}

	#content {
		view-transition-name: content;
	}
`;

export interface LayoutProps {
	children?: JsxElement | JsxElement[];
	class?: string;
}

interface CollectResult {
	head: JsxNode[];
	body: JsxNode[];
}

function collect(node: JsxNode, result: CollectResult): void {
	if (node == null || node === false || node === true) return;

	if (Array.isArray(node)) {
		return node.forEach((child) => collect(child, result));
	}

	if (typeof node !== "object") {
		return void result.body.push(node);
	}

	const { tag, props } = node as JsxElement;

	if (tag === "head") {
		return void result.head.push(props.children);
	}

	if (typeof tag === "function") {
		const evaluated = tag(props);
		return collect(evaluated, result);
	}

	if (props.children == null) {
		return void result.body.push(node);
	}

	const child: CollectResult = { head: [], body: [] };
	collect(props.children, child);

	if (child.head.length) {
		result.head.push(...child.head);
	}
	result.body.push(jsx(tag, { ...props, children: child.body as any }));
}

export function Layout({ children, class: className }: LayoutProps = {}) {
	const result: CollectResult = { head: [], body: [] };
	collect(children, result);

	return (
		<html lang="en">
			<head>
				<meta charset="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<style type="text/css">{styles}</style>
				<link rel="stylesheet" href="/fonts/iosevka-custom/import.css" />
				{result.head}
			</head>
			<body class={className}>
				{result.body}
			</body>
		</html>
	);
}
