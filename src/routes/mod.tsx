/**
 * Copyright (c) 2025 adoravel
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { Context } from "@july/snarl";
import { css, Import } from "../mech/css.ts";
import { Layout } from "../layout.tsx";
import { NavigationBar } from "../components/NavigationBar.tsx";

const { heading, ...styles } = css(`
	.heading {
		color: blue;
	}
`);

export default () => {
	return (
		<Layout>
			<head>
				<title>hewo!!</title>
				<Import styles={[styles]} />
			</head>
			<div class={heading}>
				<NavigationBar items={[["home", "/"], ["contact", "/contact"], ["reports", "/reports"]]} selected="home" />
			</div>
		</Layout>
	);
};
