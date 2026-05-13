/**
 * Copyright (c) 2025 adoravel
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { css, Import } from "~/mech/css.ts";
import { Layout } from "~/layout.tsx";
import { NavigationBar } from "~/components/NavigationBar.tsx";
import { Typecycle } from "~/components/Typecycle.tsx";
import SectionTitle from "~/components/SectionTitle.tsx";
import Projects from "~/components/Projects.tsx";
import { MediaItem } from "~/components/MediaItem.tsx";
import { Fm } from "~/components/Fm.tsx";
import KVTable from "~/components/KVTable.tsx";
import { Footer } from "../components/Footer.tsx";
import { friends, projects, songs } from "../constants.ts";

const home = css(`
	#heading {
		margin-bottom: var(--section-spacing);
		position: relative;
	}

	#heading h1 {
		font-size: clamp(1.5rem, 5vw + 0.5rem, var(--font-size-2xl));
		line-height: 1.25;
		margin-bottom: var(--space-1);
		display: block;
	}

	#heading h2 {
		display: inline-block;
		font-size: var(--font-size-md);
		color: var(--theme-foreground-alt);
		margin-top: 1ch;
		width: fit-content;
	}

	#intro-text-container > p {
		display: inline;
	}
	

	@media (min-width: 1550px) {
		section, #heading {
			position: relative;
		
			&::before {
				position: absolute;
				font-size: 13rem;
				font-weight: 700;
				user-select: none;
				letter-spacing: -0.075em;
				-webkit-text-stroke: 2px var(--theme-foreground);
				color: transparent;
				opacity: 0.025;
				pointer-events: none;
			}
		}

		#heading::before {
			content: ":3";
			font-size: 7rem !important;
			top: -0.25em;
			left: -5.25rem;
		}

		#intro::before {
			content: "bio";
			right: -8rem;
			top: 2.4rem;
		}

		#projects::before {
			content: "↩";
			transform: rotate(15deg);
			font-size: calc(var(--font-size-2xl) * 5);
			right: -16rem;
			top: 2rem;
		}

		#donate::before {
			content: "$";
			left: -12.5rem;
			top: 7rem;
		}

		#friends::before {
			content: "<3";
			transform: rotate(15deg);
			font-size: calc(var(--font-size-2xl) * 5);
			right: -5rem;
			top: 3rem;
		}
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

		& ~ #read-more-content { display: none !important; }
		& ~ .read-more-label-collapse { display: none; }

		&:checked {
			& ~ #read-more-content { display: inline !important; }
			& ~ .read-more-label-expand { display: none; }
			& ~ .read-more-label-collapse { display: inline-block; }
		}
	}

    .read-more-btn {
		margin-left: 1ch;
        color: var(--theme-primary);
        cursor: pointer;
        text-decoration: none;
        font-size: var(--font-size-text);
        user-select: none;
    }

	.break {
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
			<header id="heading">
				<h1>
					<Typecycle />
				</h1>
				<h2>she/her ∘ ૮ ˶ᵔ ᵕ ᵔ˶ ა</h2>
			</header>
			<section id="intro">
				<SectionTitle>Introduction</SectionTitle>
				<div id="intro-text-container">
					<p>
						I'm an aspiring computer engineer passionate about open access and well-crafted software. I really love
						linguistics, functional programming, the C programming language, and unconventional TypeScript.
					</p>
					<input type="checkbox" id="intro-toggle" class="read-more-checkbox" autocomplete="off" />
					<label for="intro-toggle" class="read-more-btn link read-more-label-expand">Read more</label>
					<label for="intro-toggle" class="read-more-btn link read-more-label-collapse">Show less</label>
					<div id="read-more-content">
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
			<section id="song">
				<SectionTitle>Current favourite songs</SectionTitle>
				<ul class="media">
					{songs.map((song) => (
						<li>
							<MediaItem {...song} />
						</li>
					))}
				</ul>
			</section>
			<section id="projects">
				<SectionTitle>Projects</SectionTitle>
				<Projects
					projects={projects}
				/>
			</section>
			<section id="fm">
				<SectionTitle>Recently listened</SectionTitle>
				<Fm />
			</section>
			<section id="friends">
				<SectionTitle>{"Friends &lt;3"}</SectionTitle>
				<p>Precious friendships; from the bottom of my heart, I am genuinely grateful for their existence~</p>
				<div class="buttons">
					<iframe width="88" height="31" style="border:none" src="/button.min.html"></iframe>
					<a href={friends[0].href} rel="noopener nofollow">
						<img src={friends[0].src} alt={friends[0].alt} width="88" height="31" />
					</a>
					<iframe
						width="88"
						height="31"
						style="border:none"
						sandbox="allow-scripts allow-popups"
						srcdoc="<!doctype html><body onload=&#34;d=d.style,d.position=`absolute`,x=0,y=Math.random()*66|0,u=v=1,c=3;setInterval`x+=u${166}y+=v,z=x<=0||x>=20,w=y<=0||y>=67;z&&w?c=(c+3)%6-1:0,u^=-z-z,v^=-w-w;d.background='hwb('+60*c+' 0 0)';d.top=x+'px',d.left=y+'px'`&#34;bgcolor=#000><a href=https://github.com/rniii target=_blank><img id=d src=data:image/gif;base64,R0lGODdhFQALAHcAACH5BAkKAAAALAAAAAAVAAsAgAAAAAAAAAInDI4Xa6m8EkNQPQtivnvuH3mc1pSlU3EUxJrtC8eig851Q2daTjMFADs>"
					/>
					{friends.slice(1).map(({ href, src, alt }) => (
						<a href={href} rel="noopener nofollow">
							<img src={src} alt={alt} width="88" height="31" />
						</a>
					))}
				</div>
			</section>
			<section id="donate">
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
