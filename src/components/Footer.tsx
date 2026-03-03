/**
 * Copyright (c) 2025 adoravel
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { css, Import } from "~/mech/css.ts";
import { Fluxer, GitHub, Mail, Tangled } from "./Icon.tsx";

const footer = css(`
	:scope {
		color: var(--theme-foreground-bruh);
		font-size: var(--font-size-md);
	}

	ul {
		display: flex;
		flex-wrap: wrap;
		padding-left: 0;
		margin-top: var(--space-4);
		list-style: none;
		gap: var(--space-2);
	}

	ul > li > :is(a,button) {
		font-size: var(--font-size-sm);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--space-1) var(--space-4);
		gap: 1ch;
		color: var(--theme-foreground-alt);
		background-color: var(--theme-surface);
		border: none;
		outline: none;
		border-radius: 1000px;
		cursor: pointer;
		&:hover {
			filter: brightness(0.75);
		}
	}

	hr {
		border: none;
		border-top: 1px solid var(--theme-surface-border);
		margin: var(--section-spacing) 0;
	}
`);

export function Footer() {
	return (
		<footer class={footer.scope}>
			<hr />
			<Import styles={[footer]} />
			<p>
				© {new Date().getFullYear()} <span class="highlight">kyure</span>
				{" · "}
				Made with <span class="highlight">❤</span> · Source code available at{" "}
				<a href="https://kyu.re/~kyu.re">git.acpi.at</a> under the{" "}
				<a href="https://spdx.org/licenses/AGPL-3.0-or-later.html">
					GNU Affero General Public License v3.0
				</a>
				, with all site content licensed under{" "}
				<a href="https://creativecommons.org/licenses/by-sa/4.0/">
					CC BY-SA 4.0
				</a>
				.
			</p>
			<ul>
				<li>
					<a href="https://github.com/adoravel">
						<GitHub />
						adoravel
					</a>
				</li>
				<li>
					<a href="https://tangled.org/kyu.re">
						<Tangled />
						kyu.re
					</a>
				</li>
				<li>
					{/* @ts-expect-error */}
					<button onclick="let t=this.lastChild,n=t.nodeValue;navigator.clipboard.writeText(n.trim());if(!this.dataset.t){this.dataset.t=n;t.nodeValue=' copied to clipboard';setTimeout(()=>{t.nodeValue=this.dataset.t;delete this.dataset.t},3000)}">
						<Fluxer />
						queen#0001
					</button>
				</li>
				<li>
					{/* @ts-expect-error */}
					<button onclick="window.open(atob(this.textContent.trim()),'_blank','noopener')">
						<Mail />
						bWFpbG1lOmtAa3l1LnJlCg==
					</button>
				</li>
			</ul>
		</footer>
	);
}
