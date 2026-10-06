# Portfolio Media Optimization

## Mobile Lab Measurement

Lighthouse 13.5.0 against the local production export at `http://localhost:3013/`,
using mobile throttling and an isolated headless Chrome. The static preview server
does not model Cloudflare compression or CDN latency; these are not field metrics.
Before: one run on commit `4b89afd`. After: medians of three runs.

| Metric | Before | After |
| --- | ---: | ---: |
| Performance | 70 | 79 |
| LCP | 7.59 s | 5.73 s |
| CLS | 0 | 0 |
| TBT | 121 ms | 28.5 ms |
| Transfer | 3.58 MiB | 2.48 MiB |

After-run results, retained rather than selecting only the best score:

| Run | Performance | LCP | TBT | Transfer |
| --- | ---: | ---: | ---: | ---: |
| 1 | 63 | 5.73 s | 633 ms | 2.48 MiB |
| 2 | 79 | 5.74 s | 28.5 ms | 2.48 MiB |
| 3 | 85 | 4.36 s | 0 ms | 0.63 MiB |

Run 3 did not transfer the background MP4 during the audit. Video loading and host
CPU activity affect these measurements. Raw JSON files are saved locally under
`/private/tmp/donggi-performance-*-20261006.json`.

## Changes

- Corrected the opened camera LCD image with a centered 180-degree UV rotation.
- Dedicated hero MP4s: desktop 23,501,609 -> 6,422,786 bytes; mobile 2,588,950 ->
  1,423,536 bytes. Both retain the complete 21.48-second timeline and audio.
  Film-dialog playback still uses the untouched 2560x1440 original.
- Start background playback after the priority poster decodes. Continue pausing
  outside the viewport, in hidden documents, and during film-dialog playback.
  Recheck Save-Data when the network preference changes.
- Use a compressed video poster while playback initializes.
- Generate only WebP srcset candidates at 480/960/1440/1920px, capped by source
  width. Preserve original photos separately, honor EXIF orientation, and avoid
  exposing huge originals to automatic high-DPR srcset selection.
- Use a compressed image fallback and an explicit default `sizes` value.

## Verification

- Production build and lint pass.
- `node scripts/check-image-variants.mjs`: 254 variants verified, including actual
  dimensions and a maximum candidate width of 1920px.
- `node scripts/check-camera-model.mjs`: 30,080 model triangles, 1,764,052 bytes.
  The model stays below the 2 MiB compression threshold.
- Desktop screenshot confirms sky above buildings on the opened LCD.
- 390px mobile viewport selects the 960x540 hero file without horizontal overflow.
- Film dialog retains the original MP4; gallery keyboard navigation, EXIF, hash
  synchronization and Escape close remain functional.

## Remaining Work

Mobile LCP remains above the 2.5-second target. Further work should measure the
public deployment across repeated runs, then target initial JavaScript and font
rendering, rather than reducing photograph quality or removing the authored film.

## Local Media Preparation

Run `node scripts/generate-hero-videos.mjs` with FFmpeg installed to reproduce the
hero encodes. This optional script is not part of the Cloudflare build. Change the
versioned output names and source references when replacing deployed media, since
`/media/` is cached immutably.
