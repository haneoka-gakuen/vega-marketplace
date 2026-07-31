# Contributing

Each catalog entry must point to an independently versioned repository and
registry package. Submit one version per change, keep entries sorted, document
permissions, targets, and any separately licensed external runtime, then run
`pnpm catalog:digest && pnpm check`.

The catalog accepts metadata only. SDKs, runtime cores, models, archives,
generated game assets, and executable download URLs are rejected.
