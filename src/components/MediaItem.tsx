/**
 * Copyright (c) 2025 adoravel
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { css, Import } from "~/mech/css.ts";
import { boundaries, fontSize, radius, spacing, theme } from "~/layout.tsx";

export interface MediaItemProps {
	header: string;
	album: string;
	artist: string;
	releaseDate: string;
	url: string;
	tag?: string;
	coverUrl?: string;
}

const styles = css(`
	:scope {
		display: flex;
		flex-direction: column;
		background: ${theme.base};
		border: 1px solid ${theme.baseBorder};
		border-radius: ${radius.lg};
		font-size: ${fontSize.sm};
		color: ${theme.subtext};
		width: 100%;
	}

	.listen-link {
		margin-left: auto;
		gap: ${spacing[1]};
		font-size: ${fontSize.xs};
		color: ${theme.textMuted};
	}

	.listen-link::after {
		background-color: ${theme.textMuted} !important; 
	}
	
	.listen-link:hover {
		&::after {
			background-color: ${theme.accent} !important; 
		}
		color: ${theme.accent};
	}
	
	.header {
		display: flex;
		align-items: center;
		border-bottom: 1px solid ${theme.baseBorder};
		padding: ${spacing[2]} ${spacing[4]};
		gap: ${spacing[2]};
	}

	.release-date {
		display: flex;
		align-items: center;
		font-size: ${fontSize.xs};
		color: ${theme.textMuted};
		letter-spacing: ${spacing.letter.plus};
	}

	.body {
		display: flex;
		align-items: flex-start;
		padding: ${spacing[4]};
		gap: ${spacing[4]};
		
		@media (max-width: ${boundaries.mobileMaxWidth}) {
			align-items: center;
			text-align: center;
			flex-direction: column;
		}
	}

	.art {
		width: 64px;
		height: 64px;
		overflow: hidden;
		flex-shrink: 0;
		background: ${theme.base};
		border: 1px solid ${theme.baseBorder}; 
		border-radius: ${radius.art};
	}
	
	.info-tag {
		margin-left: 1ch;
		color: ${theme.textMuted};
	}
	
	.default-pattern {
		width: 64px;
		height: 64px;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-template-rows: repeat(4, 1fr);
	}

	.art-px   { display: block }
	.art-px-0 { background: ${theme.base} }
	.art-px-1 { background: ${theme.accent} opacity: 0.85; }
	.art-px-2 { background: ${theme.onAccent} opacity: 0.9; }
	.art-px-3 { background: ${theme.textMuted} opacity: 0.25; }
	.art-px-4 { background: ${theme.surfaceBorder} }

	.art[data-loaded] > .default-pattern {
    	display: none;
	}
	
	.info {
		display: flex;
		flex-direction: column;
		line-height: 1.75;
	}

	.info-title {
		font-size: ${fontSize.md};
		color: ${theme.text};
		font-weight: 500;
	}

	.info-artist {
		font-size: ${fontSize.sm};
		color: ${theme.textMuted};
	}

	.info-artist > span {
		colo: ${theme.textMuted};
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
	artist,
	album,
	releaseDate,
	coverUrl,
	url,
	tag,
}: MediaItemProps) {
	return (
		<>
			<Import styles={[styles]} />
			<div class={styles.scope}>
				<div class="header">
					<div class="release-date">
						{releaseDate}
					</div>
					<a class="listen-link link" href={url} target="_blank" rel="noopener noreferrer">
						listen
					</a>
				</div>
				<a class="body" href={url} target="_blank" rel="noopener noreferrer">
					<Art url={coverUrl} />
					<div class="info">
						<div class="info-title">
							{header}
							{tag && <span class="info-tag">{tag}</span>}
						</div>
						<div class="info-artist">
							{album && <span>{album}</span>}
							<br />
							{artist}
						</div>
					</div>
				</a>
			</div>
		</>
	);
}
