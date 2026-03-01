/**
 * Copyright (c) 2025 adoravel
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { Context } from "@july/snarl";
import { css } from "../mech/css.ts";

const { heading, ...styles } = css(`
	.heading {
		color: blue;
	}
`);

export default (ctx: Context) => {
	return (
		<html lang="en">
			<head>
				<meta charset="utf-8" />
				<ctx.import styles={[styles]} />
			</head>
			<body>
				<div class={heading}>hewo</div>
			</body>
		</html>
	);
};
