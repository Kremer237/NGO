import { project } from "./project";
import { impactMetric } from "./impactMetric";
import { partner } from "./partner";
import { story } from "./story";
import { report } from "./report";
import { siteSettings } from "./siteSettings";

// Once a Sanity Studio project exists, pass this array to `defineConfig({
// schema: { types: schemaTypes } })` — each entry here maps 1:1 to a
// `defineType({ ...entry })` call. See cms/README.md.
export const schemaTypes = [project, impactMetric, partner, story, report, siteSettings];
