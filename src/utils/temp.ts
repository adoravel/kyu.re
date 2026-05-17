/**
 * Copyright (c) 2025 adoravel
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

export async function withInterval<T>(
	callback: () => Promise<T>,
	seconds: number,
): Promise<() => T> {
	let value: T = await callback();

	async function tick() {
		try {
			value = await callback();
		} catch (e) {
			console.warn("withInterval: op failed, keeping stale value", e);
		}
		setInterval(tick, seconds * 1000);
	}
	setInterval(tick, seconds * 1000);

	return () => value;
}
