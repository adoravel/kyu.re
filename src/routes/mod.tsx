/**
 * Copyright (c) 2025 adoravel
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { Context } from "@july/snarl";
import { css, Import } from "~/mech/css.ts";
import { Layout } from "~/layout.tsx";
import { NavigationBar } from "~/components/NavigationBar.tsx";
import { Typecycle } from "~/components/Typecycle.tsx";
import SectionTitle from "~/components/SectionTitle.tsx";
import Projects, { ProjectLanguage } from "~/components/Projects.tsx";
import { MediaItem } from "~/components/MediaItem.tsx";
import { Fm } from "~/components/Fm.tsx";
import { Bluesky, Fluxer, GitHub, Mail, Tangled } from "~/components/Icon.tsx";
import KVTable from "~/components/KVTable.tsx";
import { Footer } from "../components/Footer.tsx";

const age = new Date(new Date().getFullYear(), 8, 1) >= new Date()
	? new Date().getFullYear() - 2007 - 1
	: new Date().getFullYear() - 2007;

const home = css(`
	.heading {
		margin-bottom: var(--spacing-2xl);
		position: relative;
	}

	.heading h1 {
		font-size: var(--font-size-2xl);
		line-height: 1.2;
		margin-bottom: var(--space-1);
		display: block;
	}

	.heading h2 {
		display: inline-block;
		font-size: 0.875rem;
		color: var(--theme-foreground-alt);
		margin-top: 1ch
		width: fit-content;
	}

	.intro-text-container > p {
		display: inline;
	}
	
	section, .heading {
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

	.projects::before {
		content: "↩";
		transform: rotate(15deg);
		font-size: calc(var(--font-size-2xl) * 5);
		right: -16rem;
		top: 2rem;
	}

	section {
		margin-bottom: var(--section-spacing);
	}

	.media {
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

	.highlight {
  		color: var(--theme-primary);
	}

	.dats-me {
		background-clip: text !important;
		-webkit-background-clip: text !important;
		-webkit-text-fill-color: transparent;
		animation: dats-lowkey-me 60s linear infinite;
		background-size: 1000% 100% !important;
		background: repeating-linear-gradient( -90deg, #a6e3a1, #a6e3a1, #e5c76b, #e5c76b, #1e66f5, #1e66f5, #89b4fa, #89b4fa, #f5c2e7, #f5c2e7, #cdd6f4, #cdd6f4, #f5c2e7, #f5c2e7, #89b4fa, #89b4fa, #d97742, #d97742, #fab387, #fab387, #f2e9e1, #f2e9e1, #f5bde6, #f5bde6, #b4637a, #b4637a );
		background-size: auto;
		background-clip: border-box;
	}

	@keyframes dats-lowkey-me {
		0% {
			background-position: 0% 50%;
		}
		100% {
			background-position: -900% 50%;
		}
	}

	.read-more-checkbox {
		display: none;
    }

    .read-more-content {
        display: none !important;
    }

    .read-more-checkbox:checked ~ .read-more-content {
        display: inline !important;
    }

    .read-more-btn {
		margin-left: 1ch;
        color: var(--theme-primary);
        cursor: pointer;
        text-decoration: none;
        font-size: 0.9em;
        user-select: none;
    }

    .read-more-checkbox:checked ~ .read-more-label-expand {
        display: none;
    }

    .read-more-label-collapse {
        display: none;
    }

    .read-more-checkbox:checked ~ .read-more-label-collapse {
        display: inline-block;
    }

	.read-more-content > .break {
		height: 1em;
	}

	.buttons {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-sm);
	}

	.buttons a {
		display: inline-block;
		text-align: center;
		width: 88px;
		height: 31px;
		image-rendering: pixelated;
		background-color: var(--theme-background-alt);
		color: var(--theme-foreground);
	}
`);

export default () => {
	return (
		<Layout class={home.scope}>
			<head>
				<title>hewo!!</title>
				<Import styles={[home]} />
			</head>
			<NavigationBar items={[["home", "/"], ["reports", "/reports"]]} selected="home" />
			<header class="heading">
				<h1>
					<Typecycle />
				</h1>
				<h2>she/her ∘ ૮ ˶ᵔ ᵕ ᵔ˶ ა</h2>
			</header>
			<section>
				<SectionTitle>Introduction</SectionTitle>
				<div class="intro-text-container">
					<p>
						I'm an aspiring computer engineer passionate about open access and well-crafted software. I really love
						linguistics, functional programming, the C programming language, and unconventional TypeScript.
					</p>
					<input type="checkbox" id="intro-toggle" class="read-more-checkbox" autocomplete="off" />
					{/* @ts-expect-error */}
					<label for="intro-toggle" class="read-more-btn link read-more-label-expand">Read more</label>
					{/* @ts-expect-error */}
					<label for="intro-toggle" class="read-more-btn link read-more-label-collapse">Show less</label>
					<div class="read-more-content">
						<div class="break" />
						<p>
							<i>In a more personal tone~.</i> Haiiii! I'm <span class="dats-me">Júlia Lívia</span>, nice to meet ya!
						</p>
						<p>
							I'm also especially interested in atypical low-level systems and the intersection of hardware and software
							interface, with a particular fascination for the x86 and RISC-V ISAs, and I love finding elegant solutions
							in places most people don't bother to look at,,
						</p>
						<p>
							I'm passionate about linguistics and philosophy, and I love meeting new people and learning from different
							perspectives!! I'm also autistic n' ADHD, so I might struggle with humour once in a while. I really like
							befriending new people and growing as a person every single day!!! If you've read this far, thanks for
							stopping by and getting to know me a bit ^-^
						</p>
						<p>
							<i>Ummm…</i>{" "}
							this site is powered by snarl, my own web framework, built on the principle that understanding comes best
							from building in a fun way. Go check it out!!!111!
						</p>
					</div>
				</div>
			</section>
			<section class="song">
				<SectionTitle>Current favourite songs</SectionTitle>
				<ul class="media">
					<li>
						<MediaItem
							sub="<span>The Death and Birth of an Angel</span><br>fallingwithscissors"
							header="(Un)Equivalent_Exchange"
							tag="metalcore, cybergrind"
							url="https://song.link/i/1722427758"
							coverUrl="https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/1c/d1/c3/1cd1c301-4c19-5c6e-f846-0377c5f89f02/artwork.jpg/512x512bb.jpg"
							platform="Released on December 22, 2023"
						/>
					</li>
					<li>
						<MediaItem
							sub="<span>Overture</span><br>Midnight Grand Orchestra"
							header="Ryuseigun"
							tag="j-pop"
							url="https://song.link/i/1627445792"
							coverUrl="https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/c9/71/9f/c9719f2f-138e-c180-9129-6126302aa8ac/TFCC-86869WW.jpg/512x512bb.jpg"
							platform="Released on July 27, 2022"
						/>
					</li>
					<li>
						<MediaItem
							sub="<span>Death Spells</span><br>Holy Fawn"
							header="Drag Me into the Woods"
							tag="doomgaze"
							url="https://song.link/i/1455576645"
							coverUrl="https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/ba/5e/a2/ba5ea2a0-55ad-78d7-fdb8-0f9c61f947a6/646920322664.jpg/512x512bb.jpg"
							platform="Released on September 14, 2018"
						/>
					</li>
				</ul>
			</section>
			<section class="projects">
				<SectionTitle>Projects</SectionTitle>
				<Projects
					projects={[
						{
							author: "w",
							name: "snarl",
							description: "a minimal web framework for deno",
							license: "Apache-2.0",
							url: "/~snarl",
							lang: ProjectLanguage.TypeScript,
						},
						{
							author: "w",
							name: "ratazana",
							description:
								"minimal implementation of logitech and razer mouse firmware, repurposing their onboard memory as a covert channel for arbitrary data",
							license: "BSD-3-Clause",
							url: "/~ratazana",
							lang: ProjectLanguage.C,
						},
						{
							author: "w",
							name: "wildcat",
							description:
								"lightweight, minimal, portable, crossplatform, and straightforward game engine inspired by raylib",
							license: "BSD-3-Clause",
							url: "/~wildcat",
							lang: ProjectLanguage.C,
						},
					]}
				/>
			</section>
			<section class="fm">
				<SectionTitle>Recently listened</SectionTitle>
				<Fm />
			</section>
			<section class="Friends">
				<SectionTitle>{"Friends &lt;3"}</SectionTitle>
				<p>Precious friendships; from the bottom of my heart, I am genuinely grateful for their existence~</p>
				<div class="buttons">
					<iframe width="88" height="31" style="border:none" src="/button.min.html"></iframe>
					<a href="https://katelyn.moe/" rel="noopener nofollow">
						<img src="https://katelyn.moe/8831.png" alt="katelyn" />
					</a>
					<a href="https://urwq.moe" rel="noopener nofollow">
						<img src="https://urwq.moe/88x31.png" alt="urwq" />
					</a>
					<a href="https://mugman.tech" rel="noopener nofollow">
						<img src="https://mugman.tech/88x31/me.gif" alt="mugman" />
					</a>
					<a href="https://www.juwuba.xyz" rel="noopener nofollow">
						<img src="https://www.juwuba.xyz/88x31.gif" alt="Júlia" />
					</a>
					<a href="https://codeberg.org/paige" rel="noopener nofollow">
						<img src="/88x31/paige.gif" alt="paige" />
					</a>
				</div>
			</section>
			<section class="piggy-bank">
				<SectionTitle>Piggy bank</SectionTitle>
				<p>
					If you enjoy throwing money at people on the internet, please consider me to help keep my projects alive and
					help me navigate some rough financial patches and stay afloat while things are tight (like rn)
				</p>
				<KVTable
					data={{
						"GitHub Sponsors": ["adoravel", "https://github.com/sponsors/adoravel"],
						"Ko-Fi": ["west", "https://ko-fi.com/west"],
					}}
				/>
			</section>
			<Footer />
		</Layout>
	);
};
