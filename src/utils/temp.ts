/**
 * Copyright (c) 2025 adoravel
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

export async function withInterval<T>(
	callback: () => Promise<T>,
	seconds: number,
): Promise<() => T> {
	let value: T = await callback();
	let timer: number | undefined;

	async function tick() {
		clearInterval(timer);
		try {
			value = await callback();
		} catch (_) {
			// no-op
		}
		timer = setInterval(tick, seconds * 1000);
	}
	timer = setInterval(tick, seconds * 1000);

	return () => value;
}
