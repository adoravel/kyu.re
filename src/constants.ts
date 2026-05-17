import { Project, ProjectLanguage } from "~/components/Projects.tsx";
import { MediaItemProps } from "./components/MediaItem.tsx";

function art(path: string, size = "512x512bb"): string {
	return `https://is1-ssl.mzstatic.com/image/thumb/${path}.jpg/${size}.jpg`;
}

export const songs: MediaItemProps[] = [
	{
		header: "matryoshka",
		album: "heartstrings",
		artist: "lexycat",
		tag: "digicore, plunderphonics",
		url: "https://song.link/i/1722427758",
		coverUrl: art("Music211/v4/b9/7b/66/b97b6672-7c40-8b1c-fd7b-51e8866c0a6a/cover_198662567310"),
		releaseDate: "Released on August 18, 2024",
	},
	{
		header: "tile floors",
		album: "lettinggomakestheheartburnhotter",
		artist: "fallingwithscissors",
		tag: "experimental metalcore",
		url: "https://song.link/i/1681979278",
		coverUrl: art("Music116/v4/53/4d/18/534d18da-75d9-5d48-2a14-17256a49c2c9/9b0f51d8-05f2-47a6-ba89-01ad8804828b"),
		releaseDate: "Released on April 17, 2023",
	},
	{
		header: "lose myself in you",
		album: "lose myself in you",
		artist: "coffret de bijoux",
		tag: "atmospheric black metal",
		url: "https://song.link/i/1886039227",
		coverUrl: art("Music221/v4/39/19/03/39190326-8671-70f7-a488-39ae4d6d74bb/5063959778586_cover"),
		releaseDate: "Released on March 9, 2026",
	},
];

export const projects: Project[] = [
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
		name: "ribbon",
		description: "modular client mod for fluxer",
		url: "/~ribbon",
		license: "EUPL-1.2 & MPL-2.0",
		lang: ProjectLanguage.TypeScript,
	},
	{
		author: "w",
		name: "scrobkit",
		description: "a minimal CLI toolkit for working with last.fm scrobbles",
		url: "/~scrobkit",
		license: "BSD-3-Clause",
		lang: ProjectLanguage.TypeScript,
	},
	{
		author: "w",
		name: "terracotta",
		description: "mill-based toolchain for crossplatform and multi-version minecraft mod development",
		url: "/~terracotta",
		license: "LGPL-3.0",
		lang: ProjectLanguage.Scala,
	},
	{
		author: "w",
		name: "wildcat",
		description: "lightweight, minimal, portable, crossplatform, and straightforward game engine inspired by raylib",
		license: "BSD-3-Clause",
		url: "/~wildcat",
		lang: ProjectLanguage.C,
	},
];

export const friends = [
	{ href: "https://katelyn.moe/", src: "https://katelyn.moe/8831.png", alt: "katelyn" },
	{ href: "https://worf.win", src: "https://worf.win/images/worfwin.gif", alt: "worf.win" },
	// { href: "https://urwq.moe", src: "https://urwq.moe/88x31.png", alt: "urwq" },
	{ href: "https://mugman.tech", src: "https://mugman.tech/88x31/me.gif", alt: "mugman" },
	{ href: "https://www.juwuba.xyz", src: "https://www.juwuba.xyz/88x31.gif", alt: "Júlia" },
	{ href: "https://codeberg.org/paige", src: "/88x31/paige.gif", alt: "paige" },
];
