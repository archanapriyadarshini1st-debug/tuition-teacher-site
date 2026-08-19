# Tuition Teacher — Learning Brief

A responsive React and Vite landing page for a private tuition practice serving Classes 1–10. The visual system combines a high-energy learning brief with an animated launch prelude, responsive motion, and an accessible enquiry path.

## Local development

```bash
pnpm install
pnpm dev
```

## Quality checks

```bash
pnpm check
pnpm build
```

## GitHub Pages

The repository includes `.github/workflows/deploy-pages.yml`. Once GitHub Pages is enabled with **GitHub Actions** as the source, each push to `main` builds the static Vite site and deploys the artifact automatically.

The Pages-specific build bundles local copies of the three visual assets required by the public site and omits Manus-only development plugins.
