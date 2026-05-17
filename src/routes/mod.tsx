/**
 * Copyright (c) 2025 adoravel
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { css, Import } from "~/mech/css.ts";
import { boundaries, fontSize, Layout, spacing, theme } from "~/layout.tsx";
// import { NavigationBar } from "~/components/NavigationBar.tsx";
import Heading from "~/components/Heading.tsx";
import SectionTitle from "~/components/SectionTitle.tsx";
import Projects from "~/components/Projects.tsx";
import { MediaItem } from "~/components/MediaItem.tsx";
import { Fm } from "~/components/Fm.tsx";
import KVTable from "~/components/KVTable.tsx";
import { Footer } from "~/components/Footer.tsx";
import { friends, projects, songs } from "~/constants.ts";

const home = css(`
	#heading {
		margin-bottom: ${spacing.section};
		position: relative;
	}

	#intro-text-container > p {
		display: inline;
	}

	#read-more-content {
		margin-top: 2ch;
		padding: 0 2ch;
		border-left: 2px solid ${theme.lift};
	}
	
	@media (min-width: ${boundaries.desktopMinWidth}) {
		section, #heading {
			position: relative;
		
			&::before {
				position: absolute;
				font-size: 13rem;
				font-weight: 700;
				user-select: none;
				letter-spacing: -0.075em;
				-webkit-text-stroke: 2px ${theme.text};
				color: transparent;
				opacity: 0.025;
				pointer-events: none;
			}
		}

		#heading::before {
			content: ":3";
			font-size: 7rem !important;
			top: 0.1em;
			left: -7rem;
		}

		#intro::before {
			content: "bio";
			right: -8rem;
			top: 2.4rem;
		}

		#projects::before {
			content: "↩";
			transform: rotate(15deg);
			font-size: calc(${fontSize["2xl"]} * 5);
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
			font-size: calc(${fontSize["2xl"]} * 5);
			right: -5rem;
			top: 3rem;
		}
	}
	
	section {
		margin-bottom: ${spacing.section};
	}

	.media {
		list-style: none;
		padding-left: 0;
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		
		margin-top: ${spacing[2]};
		gap: ${spacing[2]};
		
		@media (max-width: ${boundaries.mobileMaxWidth}) {
     		grid-template-columns: 1fr;
   		}
	}

	.highlight {
  		color: ${theme.accent};
	}

	.read-more-checkbox {
		display: none;

		& ~ #read-more-content { display: none !important; }
		& ~ .read-more-label-collapse { display: none; }

		&:checked {
			& ~ #read-more-content { display: block !important; }
			& ~ .read-more-label-expand { display: none; }
			& ~ .read-more-label-collapse { display: inline-block; }
		}
	}

    .read-more-btn {
		margin-left: 1ch;
        cursor: pointer;
        text-decoration: none;
        user-select: none;
        font-size: ${fontSize.body};
        color: ${theme.accent};
    }

	.buttons {
		display: flex;
		flex-wrap: wrap;
		gap: ${spacing[1]};
	}

	.buttons a,
	iframe {
		display: inline-block;
		text-align: center;
		width: 88px;
		height: 31px;
		image-rendering: pixelated;
		background-color: ${theme.lift};
		color: ${theme.text};
		clip-path: polygon(
			0px calc(100% - 2px),
			2px calc(100% - 2px),
			2px 100%,
			calc(100% - 2px) 100%,
			calc(100% - 2px) calc(100% - 2px),
			100% calc(100% - 2px),
			100% 2px,
			calc(100% - 2px) 2px,
			calc(100% - 2px) 0px,
			2px 0px,
			2px 2px,
			0px 2px
  		);
	}
`);

export default () => {
	return (
		<Layout class={home.scope}>
			<head>
				<title>hewo!!</title>
				<Import styles={[home]} />
				<link rel="stylesheet" href="/fonts/space-grotesk/import.css" />
			</head>
			{/* <NavigationBar items={[["home", "/"], ["reports", "/reports"]]} selected="home" /> */}
			<header id="heading">
				<Heading />
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
						<p>
							<i>In a more personal tone~</i>
						</p>
						<p>
							I'm especially interested in atypical low-level systems and the intersection of hardware and software
							interface, with a particular fascination for the x86 and RISC-V ISAs, and I love finding elegant solutions
							in places most people don't bother to look at.
						</p>
						<p>
							I'm passionate about linguistics and philosophy, and I love meeting new people to learn from their
							different perspectives!! I'm autistic, so I might struggle with tone time to time. Still, I really enjoy
							befriending new people and growing as a person every single day!!! If you've read this far, thanks for
							stopping by and getting to know me a bit ^-^
						</p>
						<p>
							<i>Ummm…</i> this site is powered by{" "}
							<a href="/~snarl">snarl</a>, my own web framework, built on the principle that the best way to understand
							something is to build it yourself and have fun doing it. Go check it out!!!111!
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
							<img src={src} alt={alt} width="88" height="31" onerror="this.parentElement.remove()" />
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
