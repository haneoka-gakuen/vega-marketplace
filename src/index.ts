import type { VegaPluginCatalog } from "@haneoka/vega-protocol";
import catalogJson from "../catalog.json" with { type: "json" };

export const vegaOfficialPluginCatalog =
  catalogJson as VegaPluginCatalog;

export const VEGA_OFFICIAL_PLUGIN_CATALOG_ID =
  vegaOfficialPluginCatalog.id;

export default vegaOfficialPluginCatalog;
