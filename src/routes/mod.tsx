/**
 * Copyright (c) 2025 adoravel
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { Context } from "@july/snarl";
import { css, Import } from "../mech/css.ts";
import { Layout } from "../layout.tsx";
import { NavigationBar } from "../components/NavigationBar.tsx";
import { Typecycle } from "../components/Typecycle.tsx";
import SectionTitle from "../components/SectionTitle.tsx";

const home = css(`
	.heading {
		margin-bottom: var(--spacing-2xl);
		view-transition-name: title;
		position: relative;
	}

	.heading h1 {
		font-size: var(--font-size-2xl);
		line-height: 1.2;
		margin-bottom: var(--space-1);
		display: inline-block;
	}

	.heading h2 {
		font-size: 0.9rem;
		color: var(--theme-foreground-alt);
	}

	.intro, .heading {
		position: relative;

		&::before {
			position: absolute;
			font-size: 13rem;
			font-weight: 700;
			z-index: var(--z-background);
			user-select: none;
			letter-spacing: -0.075em;
			-webkit-text-stroke: 2px var(--theme-foreground);
			color: transparent;
			opacity: 0.025;
			pointer-events: none;
		}
	}
	
	.heading::before {
		content: ":3";
		font-size: 7rem !important;
		top: -0.25em;
		left: -5.25rem;
	}

	.intro::before {
		content: "bio";
		right: -8rem;
		top: 2.4rem;
	}
`);

export default () => {
	return (
		<Layout class={home.scope}>
			<head>
				<title>hewo!!</title>
				<Import styles={[home]} />
			</head>
			<NavigationBar items={[["home", "/"], ["contact", "/contact"], ["reports", "/reports"]]} selected="home" />
			<header class="heading">
				<h1>
					<Typecycle />
				</h1>
				<h2>she/her ∘ free software advocate ∘ linguistics enthusiast ૮ ˶ᵔ ᵕ ᵔ˶ ა</h2>
			</header>
			<section class="intro">
				<SectionTitle>Introduction</SectionTitle>
				<p>
					I'm an aspiring computer engineer passionate about open access and well-crafted software. I really love
					linguistics, functional programming, the C programming language, and unconventional TypeScript. I'm especially
					interested in atypical low-level systems and the intersection of hardware and software interface, with a
					particular fascination for the x86 and RISC-V ISAs, and I love finding elegant solutions in places most people
					don't bother to look at. <i>Ummm…</i>{" "}
					this site is powered by snarl, my own web framework, built on the principle that understanding comes best from
					building in a fun way.
				</p>
			</section>
		</Layout>
	);
};
