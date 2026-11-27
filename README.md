# Blackframe Labs website

Vite + React + Tailwind. Deployed on Vercel (preset: Vite, build `npm run build`, output `dist`).

## Changing content (no design work needed)

| What | Where |
| --- | --- |
| Email, WhatsApp, calendar link, social links, prices, FAQ, team, testimonials | `src/lib/site.ts` |
| Portfolio items, home-page reel, client names | `src/data/work.ts` |
| Portfolio videos and posters | `public/work/<id>.mp4` and `public/work/<id>.jpg` |
| Team photos | `public/team/<name>.jpg`, then add `photo: "/team/<name>.jpg"` to that person in `src/lib/site.ts` |

Optional: set `VITE_WEB3FORMS_KEY` (free at web3forms.com) in Vercel → Settings → Environment Variables so the contact form delivers straight to the inbox instead of opening the visitor's email app.

## Develop

```
npm install
npm run dev
```
