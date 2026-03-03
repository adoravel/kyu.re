/**
 * Copyright (c) 2025 adoravel
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { css, Import } from "../mech/css.ts";

const table = css(`
	:scope {
		border: 1px solid var(--theme-surface-border);
	}
	.kv-row {
		display: grid;
		grid-template-columns: 140px 1fr;
		border-bottom: 1px solid var(--theme-surface-border);
		transition: background 0.1s;
	}
	.kv-row:last-child { border-bottom: none; }
	.kv-row:hover { background: var(--theme-surface); }
	.kv-key, .kv-val {
		padding: 11px 16px;
		line-height: 1;
		font-family: inherit;
	}
	.kv-key {
		font-size: 11px;
		font-weight: 400;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--theme-foreground-bruh);
		border-right: 1px solid var(--theme-surface-border);
	}
	.kv-val {
		font-size: 13px;
		font-weight: 300;
		color: var(--theme-primary);
	}
`);

export interface KVTableProps {
	data: Record<string, [string, string]>;
}

export default function KVTable({ data }: KVTableProps) {
	return (
		<div class={table.scope}>
			<Import styles={[table]} />
			{Object.entries(data).map(([key, [name, url]]) => (
				<div key={key} class="kv-row">
					<span class="kv-key">{key}</span>
					<a class="kv-val link" href={url} target="_blank" rel="noopener noreferrer">{name}</a>
				</div>
			))}
		</div>
	);
}
