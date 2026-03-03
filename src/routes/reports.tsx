/**
 * Copyright (c) 2025 adoravel
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { css, Import } from "~/mech/css.ts";
import { Layout } from "~/layout.tsx";

const reports = css(`
	.sorry {}
`);

export default () => {
	return (
		<Layout class={reports.scope}>
			<Import styles={[reports]} />
			<span>wip, sorry</span>
		</Layout>
	);
};
