/**
 * Copyright (c) 2025 adoravel
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { css, Import } from "~/mech/css.ts";
import { boundaries, ease, elevation, fontSize, radius, spacing, theme } from "~/layout.tsx";
import { ExternalLink, License } from "~/components/Icon.tsx";

export interface Project {
	author: string;
	name: string;
	description: string;
	lang: ProjectLanguage;
	license: string;
	url: string;
}

export enum ProjectLanguage {
	TypeScript = 0x3178c6,
	C = 0x555,
	Scala = 0xc22d40,
}

export interface ProjectsProps {
	projects: Project[];
}

const projects = css(`
	:scope {
		list-style: none;
		padding-left: 0;
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));

		@media (max-width: ${boundaries.mobileMaxWidth}) {
			grid-template-columns: 1fr;
		}

		margin-top: ${spacing[2]};
		gap: ${spacing[2]};
	}

	.project-card {
		display: flex;
		flex-direction: column;
		text-decoration: none;
		position: relative;
		overflow: hidden;
		height: 100%;
		color: ${theme.text};
		background-color: ${theme.base};
		border: 1px solid ${theme.baseBorder};
		padding: ${spacing[3]} ${spacing[4]};
		border-radius: ${radius.lg};
		line-height: ${boundaries.lineHeight + .25};
	}

	.project-card:hover {
  		background-color: ${theme.surfaceHover};
  		border-color: ${theme.surfaceBorderHover};
		
		&::before {
			transform: scale(1.125);
			opacity: 1;
		}
	}

	.project-card::before {
		display: flex;
		position: absolute;
		left: 0;
		top: -7rem;
		content: "</;^//";
		color: transparent;
		font-size: 32rem;
		letter-spacing: -0.075em;
		line-height: 0.95;
		text-align: center;
		align-items: center;
		justify-content: center;
		transition: transform ${ease.fast};
		-webkit-text-stroke: 2px ${theme.baseBorder};
		opacity: 0.32;
	}

	.external-icon {
		position: absolute;
		color: ${theme.subtext};
		top: ${spacing[3]};
		right: ${spacing[3]};
		opacity: 33%;
	}

	.license {
		font-size: ${fontSize.sm};
		color: ${theme.subtext};
		line-height: 1;
		opacity: 0.5;
	}

	.license > svg {
		vertical-align: bottom;
		margin-right: 0.5ch;
	}

	.author {
		font-size: ${fontSize.md};
		margin-bottom: ${spacing[1]};
	}

	.description {
		font-size: ${fontSize.sm};
		color: ${theme.subtext};
		margin-bottom: ${spacing[3]};
		overflow: hidden;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.description, .info, .author {
		position: relative;
		z-index: ${elevation.base};
	}

	.info {
		display: flex;
		align-items: center;
		gap: ${spacing[2]};
		font-size: ${fontSize.xs};
		color: ${theme.subtext};
		margin-top: auto;
	}

	.language {
		width: 10px;
		height: 10px;
		border-radius: ${radius.circle};
		background-color: var(--lang-colour, #ccc);
		display: inline-block;
	}
`);

export default function Projects(props: ProjectsProps) {
	if (!props.projects) return;

	return (
		<ul class={projects.scope}>
			<Import styles={[projects]} />
			{props.projects.map((project) => (
				<li>
					<a class="project-card" href={project.url} target="_blank" rel="noopener noreferrer">
						<span class="external-icon" aria-label="Open externally">
							<ExternalLink size={18} />
						</span>
						<div class="author">
							<strong>{project.author}</strong>/{project.name}
						</div>
						<p class="description">{project.description}</p>
						<div class="info">
							<span class="language" style={"--lang-colour: #" + project.lang.toString(16)}></span>
							{ProjectLanguage[project.lang]}
							<div class="license" aria-label="License">
								<License size={12} />
								<span>{project.license}</span>
							</div>
						</div>
					</a>
				</li>
			))}
		</ul>
	);
}
