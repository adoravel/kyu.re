/**
 * Copyright (c) 2025 adoravel
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { css, Import } from "~/mech/css.ts";

export interface MediaItemProps {
	header: string;
	sub: string;
	platform: string;
	url: string;
	tag?: string;
	coverUrl?: string;
	action?: string;
}

const styles = css(`
	:scope {
		display: flex;
		flex-direction: column;
		background: var(--theme-inner);
		border: 1px solid var(--theme-surface-border);
		border-radius: var(--radius-lg);
		width: 100%;
		font-size: var(--font-size-sm);
		color: var(--theme-foreground-alt);

		@media (max-width: 300px) {
		}
	}

	.link {
		margin-left: auto;
		gap: var(--space-1);
		font-size: var(--font-size-xs);
		color: var(--theme-foreground-bruh);
	}

	.link::after {
		background-color: var(--theme-foreground-bruh) !important; 
	}
	
	.link:hover {
		&::after {
			background-color: var(--theme-primary) !important; 
		}
		color: var(--theme-primary);
	}
	
	.header {
		border-bottom: 1px solid var(--theme-inner-border);
		padding: var(--space-2) var(--space-4);
		display: flex;
		align-items: center;
		gap: var(--space-2);
	}

	.live {
		display: flex;
		align-items: center;
		font-size: var(--font-size-xs);
		color: var(--theme-foreground-bruh);
		letter-spacing: 0.06em;
	}

	.body {
		padding: var(--space-4);
		display: flex;
		gap: var(--space-4);
		align-items: flex-start;
		@media (max-width: 600px) {
			align-items: center;
			text-align: center;
			flex-direction: column;
		}
	}

	.art {
		width: 64px;
		height: 64px;
		background: var(--theme-inner);
		border: 1px solid var(--theme-inner-border);
		border-radius: var(--radius-music);
		overflow: hidden;
		flex-shrink: 0;
	}
	
	.info-tag {
		margin-left: 1ch;
		color: var(--theme-foreground-bruh);
	}
	
	.default-pattern {
		width: 64px;
		height: 64px;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-template-rows: repeat(4, 1fr);
	}

	.art-px   { display: block; }
	.art-px-0 { background: var(--theme-inner); }
	.art-px-1 { background: var(--theme-primary); opacity: 0.85; }
	.art-px-2 { background: var(--theme-on-primary); opacity: 0.9; }
	.art-px-3 { background: var(--theme-foreground-bruh); opacity: 0.25; }
	.art-px-4 { background: var(--theme-surface-border); }

	.art[data-loaded] > .default-pattern {
    	display: none;
	}
	
	.info {
		display: flex;
		flex-direction: column;
		line-height: 1.75;
	}

	.info-title {
		font-size: var(--font-size-md);
		color: var(--theme-foreground);
		font-weight: 500;
	}

	.info-artist {
		font-size: var(--font-size-sm);
		color: var(--theme-foreground-alt);
	}

	.info-artist > span {
		color: var(--theme-foreground-bruh);
	}

	.art-cover {
		width: 64px;
		height: 64px;
		 object-fit: cover;
	}
`);

const ART_PATTERN = [
	[0, 1, 2, 0],
	[1, 4, 1, 3],
	[2, 1, 3, 1],
	[0, 3, 1, 2],
] as const;

function Art({ url }: { url: string | undefined }) {
	return (
		<div class="art">
			<img class="art-cover" alt="" src={url} onload="this.parentNode.dataset.loaded=''" onerror="this.remove()" />
			<div class="default-pattern">
				{ART_PATTERN.flat().map((n) => <span class={`art-px art-px-${n}`} />)}
			</div>
		</div>
	);
}

export function MediaItem({
	header,
	sub,
	platform = "apple music",
	coverUrl,
	action = "listen",
	url,
	tag,
}: MediaItemProps) {
	return (
		<>
			<Import styles={[styles]} />
			<div class={styles.scope}>
				<div class="header">
					<div class="live">
						{platform}
					</div>
					<a class="link" href={url} target="_blank" rel="noopener noreferrer">
						{action}
					</a>
				</div>
				<a class="body" href={url} target="_blank" rel="noopener noreferrer">
					<Art url={coverUrl} />
					<div class="info">
						<div class="info-title">
							{header}
							{tag && <span class="info-tag">{tag}</span>}
						</div>
						<div class="info-artist">{sub}</div>
					</div>
				</a>
			</div>
		</>
	);
}
