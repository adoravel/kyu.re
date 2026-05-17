/**
 * Copyright (c) 2025 adoravel
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { css, Import } from "~/mech/css.ts";
import { ease, fontSize, spacing, theme } from "~/layout.tsx";

const table = css(`
	:scope {
		border: 1px solid ${theme.surfaceBorder};
	}
	
	.kv-row {
		display: grid;
    	grid-template-columns: minmax(80px, 140px) 1fr;
		border-bottom: 1px solid ${theme.surfaceBorder};
		transition: background ${ease.fast};
	}
	
	.kv-row:last-child { border-bottom: none; }
	
	.kv-row:hover { background: ${theme.surface}; }
	
	.kv-key, .kv-val {
		padding: ${spacing[3]} ${spacing[4]};
		line-height: 1;
		font-family: inherit;
	}
	
	.kv-key {
		font-size: ${fontSize.xs};
		letter-spacing: ${spacing.letter.plus};
		color: ${theme.textMuted};
		border-right: 1px solid ${theme.surfaceBorder};
		font-weight: bold;
		text-transform: uppercase;
	}
	
	.kv-val {
		font-size: ${fontSize.sm};
		color: ${theme.accent};
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
