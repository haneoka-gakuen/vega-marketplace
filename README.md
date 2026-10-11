# Vega Marketplace

The official plugin catalog of the Vega suite. One `catalog.json` lists every
official plugin for [Vega](https://github.com/haneoka-gakuen/vega) (the
player), [Altair](https://github.com/haneoka-gakuen/altair) (the editor) and
[Deneb](https://github.com/haneoka-gakuen/deneb) (the builder): what each one
does, what it needs, which permissions it asks for and where its package comes
from. Altair's plugin manager reads it to offer plugins to your project, and
Vega and Deneb use the same entries to check and lock what a project uses.

The catalog is data only. Nothing in it is downloaded or executed by reading
it; the host decides what to install.

## What is listed

29 plugins in the `haneoka.official` catalog:

| Group | Plugins |
| --- | --- |
| Altair editor | ADV, Bestdori, Drafts, Flow, Haneoka, History, Marketplace, Models, Prose, Vega Preview, WebGAL, Workspace Browser |
| Rendering | Three.js renderer, Pixi renderer, Composed models, Cubism (Live2D), Spine |
| Interface | Portable UI, Default Shell, Haneoka theme, Ending |
| Rich text | Rich text service, BBCode, HTML, LaTeX, Markdown, Typst |
| Compatibility and hosting | WebGAL runtime, Haneoka host |

## Using the catalog

From Altair, point the marketplace at the raw file:

```ts
await marketplace.loadCatalog({
  kind: "http",
  id: "official",
  url: "https://raw.githubusercontent.com/haneoka-gakuen/vega-marketplace/main/catalog.json",
});
```

Or depend on the package and import it:

```sh
pnpm add @haneoka/vega-catalog-official
```

```ts
import vegaOfficialPluginCatalog, { VEGA_OFFICIAL_PLUGIN_CATALOG_ID } from "@haneoka/vega-catalog-official";
```

`catalog.sha256` holds the SHA-256 of `catalog.json`, so a host can verify
the file it downloaded.

## Entry format

```json
{
  "format": "vega-plugin-entry",
  "formatVersion": 1,
  "id": "haneoka.cubism",
  "name": "Cubism Character",
  "version": "0.1.0",
  "apiVersion": 1,
  "description": "Generic Cubism 2/3/4/5 runtime, renderer adapter and AIUEO viseme provider; Core binaries are host-provisioned",
  "publisher": "Haneoka Gakuen",
  "tags": ["character", "cubism", "live2d", "official"],
  "capabilities": ["character"],
  "permissions": ["audio:analysis", "render:webgl"],
  "externalRuntimes": [
    {
      "id": "live2d.cubism-core",
      "name": "Live2D Cubism Core",
      "version": "*",
      "license": "LicenseRef-Live2D-Cubism-SDK",
      "homepage": "https://www.live2d.com/en/sdk/license/",
      "provisioning": ["application-bundle", "host"]
    }
  ],
  "targets": { "runtimes": ["vega"] }
}
```

(Shortened from the real entry, which lists two more Live2D runtimes.)

| Field | Meaning |
| --- | --- |
| `id`, `name`, `version`, `apiVersion` | Identity; `id@version` is unique in the catalog. |
| `description`, `publisher`, `tags` | Shown when searching. |
| `capabilities` | What the plugin contributes (render, character, theme, ui-slot, rich-text…). |
| `permissions` | What it needs from the host. |
| `dependencies`, `optionalDependencies` | Other plugins and version ranges. |
| `externalRuntimes` | Third-party runtimes the user must supply, such as the Live2D Cubism Core. |
| `targets` | Platforms it supports. |
| `source`, `integrity` | Where to get the package and its digest. |

A catalog may also carry Altair-specific details (editor scope, supported
Altair versions, conflicts) under `extensions.altair.entries`, keyed by
`id@version`.

## Changing the catalog

1. Edit `catalog.json`.
2. Run `pnpm catalog:digest` to update `catalog.sha256`.
3. Run `pnpm check` — it validates every entry and the digest.

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to propose a change.

## License

MPL-2.0. See [LICENSE](LICENSE).
