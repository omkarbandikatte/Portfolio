# Zero-Maintenance Portfolio

> A self-updating portfolio site that pulls live data from GitHub, LinkedIn, and Overleaf.

## Quick Start

```bash
npm install
cp .env.local.example .env.local
# Fill in your tokens (see below)
npm run dev
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GITHUB_TOKEN` | Yes | GitHub Personal Access Token |
| `GITHUB_USERNAME` | Yes | Your GitHub username |
| `NEXT_PUBLIC_LINKEDIN_JSON_URL` | No | JSON endpoint for LinkedIn experience data |
| `NEXT_PUBLIC_SITE_URL` | No | Your deployed site URL (for SEO) |

### Setting up the GitHub PAT

1. Go to [github.com/settings/tokens](https://github.com/settings/tokens)
2. Click **"Generate new token (classic)"**
3. Select scopes:
   - `read:user`
   - `public_repo` (or `repo` for private repos)
4. Copy the token and paste it into `.env.local` as `GITHUB_TOKEN`

### Vercel Deployment

1. Push this repo to GitHub
2. Import in [vercel.com/new](https://vercel.com/new)
3. Add the environment variables above in the Vercel project settings
4. Deploy — ISR will revalidate pages every hour automatically

## Resume Auto-Sync

The "Download Resume" button points to `/public/resume.pdf`. Set up a GitHub Action in your resume repo to:

1. Compile your Overleaf LaTeX file to PDF
2. Copy the output to this project's `/public/resume.pdf`
3. Commit & push (triggers a Vercel redeploy)

Example workflow snippet:

```yaml
# .github/workflows/compile-resume.yml
name: Compile Resume
on:
  push:
    paths: ['*.tex']
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: xu-cheng/latex-action@v3
        with:
          root_file: resume.tex
      - name: Deploy PDF
        run: |
          cp resume.pdf ../portfolio/public/resume.pdf
          # commit and push to portfolio repo
```

## Folder Structure

```
src/
├── app/
│   ├── globals.css       # Tailwind + custom styles
│   ├── layout.tsx        # Root layout with fonts & providers
│   └── page.tsx          # Main page (server component, ISR)
├── components/
│   ├── Chatbot.tsx       # AI assistant UI (frontend only)
│   ├── ExperienceSection.tsx
│   ├── Hero.tsx
│   ├── ProjectCard.tsx
│   ├── ProjectsGrid.tsx
│   ├── ResumeButton.tsx
│   └── SkillCloud.tsx
├── lib/
│   ├── providers.tsx     # TanStack Query provider
│   └── utils.ts          # Utility helpers
└── services/
    ├── github.ts         # GitHub GraphQL API service
    ├── linkedin.ts       # LinkedIn data fetcher
    └── microlink.ts      # Screenshot URL builder
```
