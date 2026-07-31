# Vega Marketplace

Plugin catalog for Vega, Altair, and Deneb.

```sh
pnpm install
pnpm check
```

`catalog.json` is the catalog endpoint consumed by Altair. After changing it,
run `pnpm catalog:digest` to update `catalog.sha256`.

The catalog contains metadata only. External runtimes and plugin packages are
resolved and installed by the host application.
