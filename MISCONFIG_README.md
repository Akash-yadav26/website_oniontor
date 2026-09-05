# Shadow Market — Planted Misconfigurations (Demo)

This static site is the **de-anonymization demo target** for the Null Anonymity
platform. To make the platform's Tor Misconfiguration Auditor produce real
findings, the following intentionally-vulnerable endpoints were added. They are
the leak surface the scanner probes and correlates into a clearnet origin.

Onion service: `http://ztw4oo7jjydlnumorfjxpmc624i7t5hcbdacxtgkaspjrxdkkbskltqd.onion`

## Files planted

| Path | Leak | What the scanner extracts |
|------|------|---------------------------|
| `server-status` | Apache `/server-status` page | Origin IP `45.153.160.140` + clearnet vhosts (`srv-shadowmarket.bulletproof-host.net`, `admin.shadowmarket-panel.net`) |
| `.env` | Laravel-style env file | DB host = origin IP, internal Redis `10.8.0.12`, admin email, AWS key |
| `phpinfo.php` / `info.php` | PHP info dump | `SERVER_ADDR` = origin IP, OS/kernel banner |
| `.git/config` + `.git/HEAD` | Exposed git repo | Developer remote `https://github.com/Akash-yadav26/website_oniontor.git` |
| `robots.txt` | Hidden paths | `/admin/`, `/vendor-panel/`, `/backups/`, `/.git/` |

All values are **fabricated for the demo** — `45.153.160.140` and the hostnames
are not real infrastructure. The origin IP resolves (in the platform's clearnet
intelligence index) to Amsterdam, NL / Serverius Holding B.V. / AS50673.

## Deploying to the onion host

The scanner requests these at the web root, so the web server must serve them:

1. Copy the entire folder (including `server-status`, `.env`, `phpinfo.php`,
   `info.php`, `robots.txt`, **and the `.git/` directory**) to the onion host's
   document root.
2. Ensure the server does **not** block dotfiles/dotdirs — `.env` and `.git/`
   must be reachable. For nginx, remove any `location ~ /\.` deny block. For a
   quick demo, `python3 -m http.server` from the web root serves everything,
   including dotfiles, automatically.
3. If served behind Apache/nginx, `server-status` / `phpinfo.php` are delivered
   as static files here (no module/PHP execution needed) — the scanner only
   pattern-matches the response body, so static delivery is sufficient.
4. Restart the hidden service / web server and confirm each path returns 200
   over Tor.

Then scan `http://ztw4oo7jjydlnumorfjxpmc624i7t5hcbdacxtgkaspjrxdkkbskltqd.onion`
from the platform's Misconfig Auditor. Expected result: 7 findings, unmasked at
96% confidence, origin `45.153.160.140` (Amsterdam), plus a new tracked actor
`ACTOR-LIVE-ZTW4OO7JJYDL` on the dashboard, map, timeline and relationship graph.
