# Security

Report catalog tampering, dependency confusion, integrity mismatches, or
malicious extension metadata privately to the maintainers.

Altair treats catalog data as untrusted metadata. It never imports a URL from
the catalog directly. Deneb requires an exact lock and a separately audited
artifact map before packaging.
