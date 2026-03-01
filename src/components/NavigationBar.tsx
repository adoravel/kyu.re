/**
 * Copyright (c) 2025 adoravel
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { retrieveContext } from "../global.ts";
import { css, Import } from "../mech/css.ts";

const style = css(`
	:scope {
	  display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      margin-bottom: var(--spacing-2xl);
	}

	.itemList {
		display: flex;
		flex-wrap: wrap;
		list-style: none;
		padding: var(--space-1);
		gap: var(--space-1);
		font-size: var(--font-size-md);
		font-weight: 500;
		background-color: var(--theme-surface);
		border: 1px solid var(--theme-surface-border);
		border-radius: 1000px;
		width: fit-content;
	}
	
	.selected > .item {
		background-color: var(--theme-primary);
		color: var(--theme-background);
		font-weight: 600;
		border-radius: 1000px;		
	}

	.item {
		color: var(--theme-foreground-alt);
		padding: var(--space-pad-surface) var(--space-4);
		line-height: 1rem;
		display: block;
	}
`);

interface Props<T extends readonly [string, string][]> {
	items: T;
	selected: T[number][0];
}

export function NavigationBar<P extends readonly [string, string][]>({ items, selected }: Props<P>) {
	return (
		<>
			<Import styles={[style]} />
			<nav class={style.scope}>
				<ul class="itemList">
					{items.map(([name, href]) => (
						<li class={name === selected ? "selected" : undefined}>
							{name === selected
								? <a href={href} class="item" data-current="true" aria-current="page">{name}</a>
								: <a href={href} class="item">{name}</a>}
						</li>
					))}
				</ul>
			</nav>
		</>
	);
}
