/**
 * Copyright (c) 2025 adoravel
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { css, Import } from "../mech/css.ts";
import { FM_USER, tracks } from "../utils/fm.ts";

const fm = css(`
	.fm-more:hover {
  		opacity: 1;
	}

	.fm-more::before {
		content: "→";
		position: absolute;
		color: transparent;
		font-size: 15rem;
		-webkit-text-stroke: 2px var(--theme-surface-border);
		z-index: var(--z-background);
	}

	.fm-more {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		background: var(--theme-inner);
		border: 1px solid var(--theme-surface-border);
		border-radius: var(--radius-music);
		overflow: hidden;
		font-size: var(--font-size-sm);
		color: var(--theme-foreground);
		padding: var(--space-3);
		z-index: var(--z-base);
		width: 100%;
		height: 100%;
		opacity: 0.75;
		@media (max-width: 930px) {
			display: none;
		}
	}

	:scope {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-lg);
		padding: 0;
		margin: 0;
		margin-top: var(--space-2);
		list-style: none;
		@media (max-width: 640px) {
     		flex-direction: column;
    		align-items: center;
   		}
	}
	
	li > a {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-3);
		text-align: center;
		max-width: var(--avatar-size);
	}

	li > a > .cover {
		width: var(--avatar-size);
		height: var(--avatar-size);
		border-radius: var(--radius-music);
		object-fit: cover;
		background: var(--theme-background-alt);
	}

	li > a > .meta {
		display: flex;
		flex-direction: column;
		font-size: var(--font-size-md);
		color: var(--theme-foreground-alt);
	}

	li > a > .meta strong {
		font-weight: 600;
		font-size: var(--font-size-base);
		color: var(--theme-foreground);
	}

	@media (max-width: 640px) {
		li > a > .cover {
			flex-shrink: 0;
		}
		li > a > .meta {
			align-items: flex-start;
		}
	}

	li > a > .meta strong,
	li > a > .meta span {
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	line-clamp: 2;
	overflow: hidden;
	word-wrap: anywhere;
	text-overflow: ellipsis;
	max-width: 100%;
}
`);

export function Fm() {
	if (!tracks) return;

	const content = tracks().slice(0, 4);

	return (
		<ul class={fm.scope}>
			<Import styles={[fm]} />
			{content.map((track) => (
				<li class="fm-recent" key={track.artist + track.name}>
					<a href={track.url}>
						<img
							class="cover"
							src={track.cover ||
								"https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png"}
							alt=""
						/>
						<div class="meta">
							<strong class="title">{track.name}</strong>
							<span>{track.artist}</span>
							{track.playing
								? (
									<span class="loved" title="Now playing">
										▷
									</span>
								)
								: (
									track.loved && (
										<span class="loved" title="Loved">
											❤
										</span>
									)
								)}
						</div>
					</a>
				</li>
			))}
			<li>
				<a class="fm-more" href={`https://last.fm/user/${FM_USER}`}>
					Check out more on Last.fm
				</a>
			</li>
		</ul>
	);
}
