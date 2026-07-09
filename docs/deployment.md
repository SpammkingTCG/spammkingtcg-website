# SpammKing TCG Deployment

## Hosting Model

The site is hosted as a static website through Cloudflare Pages.

The usual flow is:

1. Edit files locally.
2. Commit changes in GitHub Desktop.
3. Push to GitHub.
4. Cloudflare Pages deploys automatically from GitHub.
5. Check the live site after deployment.

## GitHub Desktop Flow

Use clear conventional commit messages, for example:

- `docs: add project documentation`
- `feat: add hidden trade information page`
- `fix: improve mobile product cards`
- `refactor: simplify product rendering`

Before pushing:

- Check the changed files list.
- Make sure no unrelated files are included.
- Use a clear summary.
- Push only when the change is ready for Cloudflare to deploy.

## Cloudflare Pages

Cloudflare Pages should deploy automatically after a GitHub push.

After a deploy:

- Open the live domain.
- Check the homepage.
- Check one product page.
- Check one set page.
- Check the latest releases page.
- Check the 404 page if routing changed.

## SEO Files

Root SEO files:

- `sitemap.xml`
- `robots.txt`
- `404.html`

Keep `sitemap.xml` updated when adding public pages.

Do not add hidden/internal pages such as `styleguide.html` or `trade.html` to the sitemap.

## Current Live Domain

Production domain:

`https://spammkingtcg.co.uk/`

Use this domain for canonical URLs and social metadata.

