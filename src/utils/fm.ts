/**
 * Copyright (c) 2025 adoravel
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { LastClient } from "@musicorum/lastfm";
import { withInterval } from "./temp.ts";

interface Track {
	name: string;
	artist: string;
	loved: boolean;
	playing: boolean;
	cover?: string;
	url: string;
}

export const FM_USER = "satisfeita";

const secret = "790c37d90400163a5a5fe00d6ca32ef0"; //shit ain’t mine
export let tracks: (() => Track[]) | undefined;

if (secret) {
	const client = new LastClient(secret);

	tracks = await withInterval(async () => {
		const { tracks: raw } = await client.user.getRecentTracks(FM_USER, {
			limit: 5,
			extended: true,
		});

		return raw?.map((track) => ({
			artist: track.artist.name,
			name: track.name,
			loved: "loved" in track ? track.loved as boolean : false,
			playing: track.nowPlaying || false,
			cover: track.images.pop()?.url,
			url: track.url || "#",
		}));
	}, 60);
}
