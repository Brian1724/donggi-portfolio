# Mobile performance report

Measured against the local production static export on 2026-09-23 with Lighthouse mobile throttling and Google Chrome headless.

| Metric | Result |
| --- | ---: |
| Performance | 78 / 100 |
| Accessibility | 100 / 100 |
| LCP | 6.06 s |
| CLS | 0 |
| TBT | 5 ms |
| Transfer size | 2.44 MiB |

## Checks

- The mobile hero selects `donggi-hero-mobile-v2.webm` or its MP4 fallback through `<source media="(max-width: 720px)">`.
- A responsive poster is rendered before the hero video. This improved the measured performance score from 72 to 78 and LCP from 8.73 s to 6.06 s.
- The Sony A7C II glTF is 1,764,052 bytes (1.68 MiB), under the 2 MiB compression threshold.
- The image build generates 480, 960, and 1440 pixel WebP variants and `srcset` markup for 74 source images.
- Dialogs use native modal focus containment. Photo and film dialogs support Escape and left/right arrow keys.

## Remaining opportunity

The 16-second mobile hero WebM is 1.23 MiB and remains the largest initial transfer. A later visual edit could shorten its loop or lower its bitrate, but that would change the authored footage and should be reviewed separately.
