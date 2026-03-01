/**
 * Copyright (c) 2025 adoravel
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { createRouter } from "@july/snarl";
import { cssMiddleware as scopedStyles } from "~/mech/css.ts";
import { scanRoutes as scan } from "./mech/routing.ts";

const router = createRouter();
router.use(scopedStyles());

scan(router);

Deno.serve(router.fetch);
