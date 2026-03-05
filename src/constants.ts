import { ProjectLanguage } from "~/components/Projects.tsx";
import { MediaItemProps } from "./components/MediaItem.tsx";

function art(path: string, size = "512x512bb.jpg"): string {
	return `https://is1-ssl.mzstatic.com/image/thumb/${path}/${size}`;
}

export const songs: MediaItemProps[] = [
	{
		header: "(Un)Equivalent_Exchange",
		album: "The Death and Birth of an Angel",
		artist: "fallingwithscissors",
		tag: "metalcore, cybergrind",
		url: "https://song.link/i/1722427758",
		coverUrl: art("Music116/v4/1c/d1/c3/1cd1c301-4c19-5c6e-f846-0377c5f89f02/artwork.jpg"),
		releaseDate: "Released on December 22, 2023",
	},
	{
		header: "Tá Perdoado",
		album: "Samba Meu",
		artist: "Maria Rita",
		tag: "samba, mpb",
		url: "https://song.link/i/263514926",
		coverUrl: art("Music125/v4/f5/8e/a6/f58ea644-ce2d-ed8f-765c-6c8af49b8b7e/mzi.cnyqyppy.jpg"),
		releaseDate: "Released on September 1, 2007",
	},
	{
		header: "i need to see",
		album: "my limbs are not mine",
		artist: "coffret de bijoux",
		tag: "atmospheric black metal",
		url: "https://song.link/i/1877277808",
		coverUrl: art("Music211/v4/27/94/f3/2794f31b-256b-1282-5c7e-6c4d99a3e0f5/5063907590277_cover.jpg"),
		releaseDate: "Released on January 2, 2026",
	},
];

export const projects = [
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
		description: "lightweight, minimal, portable, crossplatform, and straightforward game engine inspired by raylib",
		license: "BSD-3-Clause",
		url: "/~wildcat",
		lang: ProjectLanguage.C,
	},
];

export const friends = [
	{ href: "https://katelyn.moe/", src: "https://katelyn.moe/8831.png", alt: "katelyn" },
	{ href: "https://worf.win", src: "https://worf.win/images/worfwin.gif", alt: "worf.win" },
	{ href: "https://urwq.moe", src: "https://urwq.moe/88x31.png", alt: "urwq" },
	{ href: "https://mugman.tech", src: "https://mugman.tech/88x31/me.gif", alt: "mugman" },
	{ href: "https://www.juwuba.xyz", src: "https://www.juwuba.xyz/88x31.gif", alt: "Júlia" },
	{ href: "https://codeberg.org/paige", src: "/88x31/paige.gif", alt: "paige" },
];
