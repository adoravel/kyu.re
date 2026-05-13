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
    	grid-template-columns: minmax(80px, 140px) 1fr;
		border-bottom: 1px solid var(--theme-surface-border);
		transition: background 0.1s var(--transition-fast);
	}
	
	.kv-row:last-child { border-bottom: none; }
	
	.kv-row:hover { background: var(--theme-surface); }
	.kv-key, .kv-val {
		padding: 11px 16px;
		line-height: 1;
		font-family: inherit;
	}
	
	.kv-key {
		font-size: var(--font-size-xs);
		font-weight: bold;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--theme-foreground-bruh);
		border-right: 1px solid var(--theme-surface-border);
	}
	
	.kv-val {
		font-size: var(--font-size-sm);
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
