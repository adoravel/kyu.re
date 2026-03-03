/**
 * Copyright (c) 2025 adoravel
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { css, Import } from "~/mech/css.ts";

export interface Project {
	author: string;
	name: string;
	description: string;
	lang: string;
	license: string;
	url: string;
}

export enum ProjectLanguage {
	TypeScript = "#3178c6",
	C = "#555",
}

export interface ProjectsProps {
	projects: Project[];
}

const projects = css(`
	:scope {
		list-style: none;
		padding-left: 0;
		display: grid;
		margin-top: var(--space-2);
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: var(--space-2);

		@media (max-width: 600px) {
			grid-template-columns: 1fr;
		}
	}

	.project-card {
		display: flex;
		flex-direction: column;
		text-decoration: none;
		line-height: 1.75;
		height: 100%;
		color: var(--theme-foreground);
		background-color: var(--theme-inner);
		border: 1px solid var(--theme-inner-border);
		padding: var(--space-3) var(--space-4);
		border-radius: var(--radius-lg);
		position: relative;
		overflow: hidden;
	}

	.project-card:hover {
  		background-color: rgba(255, 255, 255, 0.025);
  		border-color: rgba(255, 255, 255, 0.125);

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
		-webkit-text-stroke: 2px var(--theme-inner-border);
		opacity: 0.16;
	}

	.external-icon {
		position: absolute;
		color: var(--theme-foreground-alt);
		top: var(--space-3);
		right: var(--space-3);
		opacity: 33%;
	}

	.license {
		font-size: var(--font-size-sm);
		color: var(--theme-foreground-alt);
		line-height: 1;
		opacity: 0.5;
	}

	.license > svg {
		vertical-align: bottom;
		margin-right: 0.5ch;
	}

	.author {
		font-size: calc(var(--font-size-sm) * 1.25);
		margin-bottom: var(--space-1)
	}

	.description {
		font-size: var(--font-size-sm);
		color: var(--theme-foreground-alt);
		margin-bottom: var(--space-3);
		overflow: hidden;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.description, .info, .author {
		position: relative;
		z-index: 1;
	}

	.info {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		font-size: var(--font-size-xs);
		color: var(--theme-foreground-alt);
		margin-top: auto;
	}

	.language {
		width: 10px;
		height: 10px;
		border-radius: var(--radius-circle);
		background-color: var(--lang-color, #ccc);
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
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="18"
								height="18"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<title>Open Externally</title>
								<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
								<path d="M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6"></path>
								<path d="M11 13l9 -9"></path>
								<path d="M15 4h5v5"></path>
							</svg>
						</span>
						<div class="author">
							<strong>{project.author}</strong>/{project.name}
						</div>
						<p class="description">{project.description}</p>
						<div class="info">
							<span class="language" style={`--lang-color:${project.lang};`}></span>
							{project.lang === ProjectLanguage.TypeScript
								? "TypeScript"
								: project.lang === ProjectLanguage.C
								? "C"
								: "Unknown"}
							<div class="license" aria-label="License">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="12"
									height="12"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<title>License</title>
									<path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"></path>
									<path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"></path>
									<path d="M7 21h10"></path>
									<path d="M12 3v18"></path>
									<path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"></path>
								</svg>
								<span>{project.license}</span>
							</div>
						</div>
					</a>
				</li>
			))}
		</ul>
	);
}
