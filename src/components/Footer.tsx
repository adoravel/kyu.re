/**
 * Copyright (c) 2025 adoravel
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { css, Import } from "~/mech/css.ts";
import { Fluxer, GitHub, Mail, Tangled } from "./Icon.tsx";
import { fontSize, spacing, theme } from "~/layout.tsx";

const footer = css(`
	:scope {
		color: ${theme.textMuted};
		font-size: ${fontSize.md};
	}

	ul {
		display: flex;
		flex-wrap: wrap;
		padding-left: 0;
		margin-top: ${spacing[4]};
		list-style: none;
		gap: ${spacing[2]};
	}

	ul > li > :is(a,button) {
		font-size: ${fontSize.sm};
		display: flex;
		align-items: center;
		justify-content: center;
		padding: ${spacing[1]} ${spacing[4]};
		gap: 1ch;
		color: ${theme.subtext};
		background-color: ${theme.surface};
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
		border-top: 1px solid ${theme.surfaceBorder}; 
		margin: ${spacing.section} 0;
	}

	.highlight-rose {
		color: ${theme.rose};
	}
`);

export function Footer() {
	return (
		<footer class={footer.scope}>
			<hr />
			<Import styles={[footer]} />
			<p>
				© {new Date().getFullYear()} <span class="highlight">kyu.re</span>
				{" · "}
				Made with <span class="highlight-rose">❤</span> · Source code available at{" "}
				<a href="https://kyu.re/~web">https://kyu.re/~web</a> under the{" "}
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
					<button onclick="let t=this.lastChild,n=t.nodeValue;navigator.clipboard.writeText(n.trim());if(!this.dataset.t){this.dataset.t=n;t.nodeValue=' copied to clipboard';setTimeout(()=>{t.nodeValue=this.dataset.t;delete this.dataset.t},3000)}">
						<Fluxer />
						queen#0001
					</button>
				</li>

				<li>
					<button
						data-mail="bWFpbHRvOmtAa3l1LnJlCg=="
						onclick="window.open(atob(this.dataset.mail),'_blank','noopener')"
					>
						<Mail /> Email address
					</button>
				</li>
			</ul>
		</footer>
	);
}
