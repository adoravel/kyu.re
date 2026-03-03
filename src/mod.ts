/**
 * Copyright (c) 2025 adoravel
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { createRouter } from "@july/snarl";
import { cssMiddleware as scopedStyles, styleInjectionMiddleware } from "~/mech/css.ts";
import { scanRoutes as scan } from "./mech/routing.ts";
import minify from "./mech/mini.ts";
import { contextMiddleware } from "./global.ts";
import { staticFiles } from "@july/snarl";

const router = createRouter();
router.use(minify(), styleInjectionMiddleware(), contextMiddleware(), scopedStyles());
router.use(staticFiles("./static", {
	maxAge: 259200,
}));

scan(router);

Deno.serve({ port: 8254 }, router.fetch);
