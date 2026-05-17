/**
 * Copyright (c) 2025 adoravel
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { css, Import } from "~/mech/css.ts";
import { fontSize, spacing, theme } from "~/layout.tsx";

const style = css(`
	:scope {
	  display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      margin-bottom: ${spacing.section};
	}

	.itemList {
		display: flex;
		flex-wrap: wrap;
		list-style: none;
		font-weight: 500;
		width: fit-content;
		padding: ${spacing[1]};
		gap: ${spacing[1]};
		font-size: ${fontSize.md};
		background-color: ${theme.surface};
		border: 1px solid ${theme.surfaceBorder};
		border-radius: 1000px;
	}
	
	.selected > .item {
		background-color: ${theme.accent};
		color: ${theme.background};
		font-weight: 600;
		border-radius: 1000px;
	}

	.item {
		color: ${theme.subtext};
		padding: ${spacing[2]} ${spacing[4]};
		line-height: 1;
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
