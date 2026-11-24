# The Reflecting Room

Website for Isioma Aniugbo, who writes and speaks as Isioma Anis. The public site is a home page, an about page, reflections, a book shelf, projects, and a contact page. The Reflecting Room nav item is marked as coming soon. An admin desk edits books, reflections, and comments. Published content is stored in Supabase.

Site name, domain (`isiomaanis.com`), and navigation live in `lib/site.ts`.

## Stack

Next.js (App Router), React, TypeScript, Tailwind CSS, and Supabase.

## Pages

| Path | What it is |
| --- | --- |
| `/` | Home |
| `/about` | About |
| `/reflections`, `/reflections/[slug]` | Essays |
| `/reflection-room` | The Reflecting Room |
| `/bookshelf`, `/bookshelf/[slug]` | Books, including Released and the In DEPENDENCE pre-order |
| `/projects` | Projects |
| `/contact` | Contact |
| `/admin` | Sign-in and the content desk |

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Supabase URL and keys are read from the environment (see `lib/supabase/env.ts`). Do not commit those values.

`npm run build` then `npm start` runs the production server. `npm run lint` checks the project.
