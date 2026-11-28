# How to add a video

Every video on the site comes from one file: `content/portfolio.ts`. Components never need to change.

## 1. Put the files in `public/work`

| File | What it is | Size guide |
| --- | --- | --- |
| `public/work/my-video.mp4` | The full video (web-compressed, H.264, "fast start") | 720p–1080p, ideally under 15 MB |
| `public/work/my-video.jpg` | Poster image (first thing people see) | Optional: the script below makes it |
| `public/work/previews/my-video.mp4` | 4-second silent hover loop | Made by the script below, ~200–300 KB |

Use lowercase and dashes in the name: `my-video`, not `My Video FINAL v2.mp4`.

Then, in PowerShell, from the project folder:

```powershell
powershell -ExecutionPolicy Bypass -File scripts\make-previews.ps1
```

It creates any missing previews and posters. (Needs ffmpeg once: `winget install Gyan.FFmpeg`.)

## 2. Add an entry to `content/portfolio.ts`

Copy any existing line and change it:

```ts
{ slug: "my-video", title: "Launch film", client: "Acme", services: ["saas-videos"], tags: ["long-form"], format: "landscape",
  poster: "/work/my-video.jpg", previewSrc: "/work/previews/my-video.mp4", fullSrc: "/work/my-video.mp4", duration: "01:42" },
```

- `services` decides which service pages show it. Options: `video-editing`, `ai-video-editing`, `meta-ads-ugc`, `saas-videos`, `podcast-editing`, `talking-head`, `more`.
- `tags` adds the Work-page filters `long-form`, `short-form`, `motion-graphics`.
- `format`: `landscape` (16:9), `vertical` (9:16) or `square`.
- `featured: true` puts it in "Selected work" on the home page (8 max; the layout places wide and tall videos automatically).
- `results`: only real numbers, e.g. `results: [{ label: "Views", value: "2.1M" }]`.
- `client: ""` if the client can't be named.

The order in the file is the order on the Work page.

## 3. Hosting on Mux / Cloudflare Stream / Bunny (later)

Upload the video there and paste its `.m3u8` link into `fullSrc`. Keep `previewSrc` as the small MP4 loop. Nothing else changes.

## 4. Full podcast episodes on YouTube

Add to `episodes` at the bottom of `content/portfolio.ts`: the id is the part after `watch?v=`.

```ts
{ youtubeId: "UFQYuy2KIXE", show: "Superintelligence", title: "Episode title", duration: "51:02" },
```

## 5. Publish

Commit and push. Vercel builds a preview for the branch; merge to `main` to go live.
