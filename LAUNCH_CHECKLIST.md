# SpammKing TCG v1.0.4 Launch Readiness Audit

This audit is a working checklist for moving the website from beta to launch-ready.

Scope:

- No new features were added during this audit.
- This report covers public pages, hidden/internal pages, product data, release data, SEO, business information and launch trust signals.
- The site is technically strong. Most remaining work is real business content: product photography, confirmed stock, real eBay URLs, real contact details, real trust numbers and reviewed policy wording.

## Must Complete Before Launch

These items are the most likely to make the site feel unfinished or create customer confusion.

| Priority | Task | Pages / Files | Estimated Time | Dependencies |
| --- | --- | --- | --- | --- |
| Critical | Replace generic eBay store URLs with real product/listing URLs for products marked as available through eBay. | `data/products.json`, `product.html`, category grids | 2-4 hours for first batch | Live eBay listings |
| Critical | Replace preview product data with real product data for any products shown as available or purchasable. | `data/products.json`, `pokemon.html`, `one-piece.html`, `product.html` | 3-6 hours for 20-30 products | Confirmed stock, pricing, conditions |
| Critical | Add real product photography for products shown in product cards and product detail pages. | `data/products.json`, `assets/images/products/` | 4-8 hours for first batch | Product stock, photo setup |
| Critical | Review all products with `stock > 0` and confirm the quantity is real before public launch. | `data/products.json` | 30-60 minutes | Current inventory count |
| Critical | Confirm all product prices are real current sale prices before public launch. | `data/products.json` | 1-2 hours | Pricing rules, eBay pricing, fees |
| Critical | Confirm the business contact email is correct and active. | All footers, `contact.html`, `trade.html`, policy pages | 15-30 minutes | Professional email setup |
| Critical | Review draft policy wording before sharing publicly as final customer policy. | `shipping.html`, `returns.html`, `privacy-policy.html`, `cookie-policy.html`, `terms.html` | 2-4 hours | Owner review, legal/accounting advice if needed |
| Critical | Confirm the contact form remains honest because it does not submit data yet. | `contact.html`, newsletter sections | 15 minutes | None |
| Critical | Submit and verify the site in Google Search Console. | Live site, `sitemap.xml`, `robots.txt` | 30-60 minutes | Google account, live deployment |
| Critical | Check the live Cloudflare deployment after pushing latest beta changes. | Live website | 30-60 minutes | GitHub push, Cloudflare deployment |

### Page-Level Must Complete Notes

#### Homepage `index.html`

- Replace generic SVG/card visuals with real product photography or stronger brand imagery when stock is available.
- Replace broad trust statements with real numbers where possible, such as feedback percentage, cards shipped, orders packed or active selling history.
- Confirm the Latest Releases section is understood as release watch content, not guaranteed stock.
- Confirm all category cards route to finished or honest category pages.

#### Product Detail `product.html`

- Product imagery is still rendered as initials/gallery placeholders through product data.
- Product descriptions rely heavily on preview wording from JSON.
- Product schema is intentionally conservative; review again once real offers, images and availability are added.
- Real eBay URLs are needed before any product should feel buyable.

#### Pokemon `pokemon.html`

- Replace preview product catalogue with real Pokemon products.
- Add real Pokemon product images.
- Confirm Pokemon release dates and status labels.
- Remove or rewrite any product descriptions that imply future inventory once real stock is known.

#### One Piece `one-piece.html`

- Replace preview One Piece products with real listings.
- Add real One Piece product images.
- Confirm all One Piece set names and release dates.
- Replace generic eBay store CTAs with product-specific eBay links where available.

#### Lorcana `lorcana.html`

- Page is honest but intentionally lightweight.
- Add real Lorcana product data before positioning this as a full shop category.
- Keep release-watch language until real stock or supplier access exists.

#### Yu-Gi-Oh `yugioh.html`

- Page is honest but intentionally lightweight.
- Current release entry is a broad release-watch entry, not a real product.
- Add real Yu-Gi-Oh products and release data before marketing this category strongly.

#### Magic `magic.html`

- Page is honest but intentionally lightweight.
- Current release entry is release-watch content only.
- Add real Magic products and product imagery before treating the page as a stocked category.

#### Latest Releases `latest-releases.html`

- The page now works best as a release calendar, but JSON still includes several preview descriptions.
- Replace preview release text with accurate release information.
- Add source-reviewed release dates before relying on the calendar for customer traffic.
- Make sure any `Available Now` status means either generally released or specifically available through SpammKing TCG, depending on wording.

#### Set Pages

Applies to:

- `pokemon/sets/`
- `pokemon/sets/*/`
- `one-piece/sets/`
- `one-piece/sets/*/`

Must complete:

- Confirm set descriptions are real and not generic future-ready copy.
- Confirm product counts reflect real product data.
- Add real products to each set before promoting set pages heavily.
- Replace generic social image with set-specific imagery later if possible.

#### Support and Policy Pages

Applies to:

- `shipping.html`
- `returns.html`
- `authenticity.html`
- `faq.html`
- `how-to-buy.html`
- `contact.html`
- `privacy-policy.html`
- `cookie-policy.html`
- `terms.html`

Must complete:

- Confirm shipping timeframes before making stronger dispatch promises.
- Confirm returns wording against actual eBay/current sales process.
- Confirm privacy/cookie wording before connecting forms or analytics.
- Add real business details if needed before distributor/customer sharing.

#### Trade Page `trade.html`

- Add real distributor application status when appropriate.
- Add real eBay feedback number and live store metrics.
- Add business registration/trading status if you want suppliers to see it.
- Keep private supplier contact details out of the public repository.

## Recommended Before Launch

These items would noticeably improve trust, SEO and customer confidence, but the site can be shared carefully without every one complete.

| Priority | Task | Pages / Files | Estimated Time | Dependencies |
| --- | --- | --- | --- | --- |
| High | Add real trust numbers: eBay feedback percentage, number of orders, products shipped or cards packed safely. | `index.html`, `about.html`, `trade.html`, trust blocks | 1-2 hours | Verified eBay/business metrics |
| High | Replace the generic social preview image with a stronger final branded preview. | `assets/images/social-preview.jpg`, page metadata | 1-2 hours | Final brand asset |
| High | Add real business story details without overclaiming. | `about.html`, `HISTORY.md`, `trade.html` | 1-2 hours | Owner-approved business copy |
| High | Replace release JSON descriptions that still say `listing preview` or sound like placeholder data. | `data/releases.json` | 1-2 hours | Confirmed release info |
| High | Replace collection JSON descriptions that still sound future-ready or generic. | `data/collections.json` | 1-2 hours | Confirmed set/category positioning |
| High | Add product-specific alt/metadata strategy once real images exist. | Product rendering, image data | 1-2 hours | Real product images |
| High | Check mobile layout on the live deployed site with real content and product images. | All public pages | 1-2 hours | Real images and content deployed |
| High | Set up Cloudflare Analytics or another lightweight analytics tool. | Cloudflare, privacy/cookie wording | 30-60 minutes | Analytics decision |
| High | Confirm all public pages have useful page titles and meta descriptions after final copy. | All public `.html` pages | 1-2 hours | Final page copy |
| Medium | Add Search Console sitemap submission notes to the operating manual after setup. | `SPAMMKING_TCG_OPERATING_MANUAL.md` | 15-30 minutes | Search Console setup |
| Medium | Create a simple process for monthly release data updates. | `data/releases.json`, docs | 30-60 minutes | Release source process |
| Medium | Add real product image naming rules to docs after first photo batch. | `docs/data-model.md`, `README.md` | 30 minutes | First real image batch |
| Medium | Replace generic support response-time wording with a real target once sustainable. | `contact.html`, `faq.html` | 15-30 minutes | Owner availability |
| Medium | Confirm all external eBay links use real destination labels once product links are added. | Product data, rendered CTAs | 30-60 minutes | eBay listing URLs |

### Recommended Page Notes

#### `404.html`

- Current page is polished, but the `out of stock` joke should be reviewed once the site is shared with suppliers. It is friendly, but a more neutral tone may feel more professional for trade audiences.

#### `styleguide.html`

- Internal page is correctly hidden from normal navigation, but it should remain `noindex`.
- Update it when core components change so it stays useful.

#### `trade.html`

- Add verified metrics only when true:
  - eBay feedback count
  - Feedback percentage
  - Trading start date
  - Product categories stocked
  - Distributor accounts approved
- Do not list supplier logos until approval is real and allowed.

#### `README.md` and `/docs`

- Documentation is strong.
- Update docs after any real process changes, especially direct checkout, analytics, newsletter provider or supplier workflow.

## Nice To Have After Launch

These are useful, but they should not delay launch or real inventory work.

| Priority | Task | Pages / Files | Estimated Time | Dependencies |
| --- | --- | --- | --- | --- |
| Medium | Add `Card of the Week` as collector-led content. | Homepage or future content page | 2-4 hours | Content plan, card research |
| Medium | Add a hidden business dashboard concept for owner use. | Future `dashboard.html` | 4-8 hours | Clear local JSON structure |
| Medium | Add real set banners or category hero images. | Set pages, category pages | 4-8 hours | Image assets |
| Medium | Add a downloadable supplier PDF or media kit. | `trade.html`, `/docs` or assets | 2-4 hours | Final business details |
| Medium | Build a monthly release update workflow. | `data/releases.json`, operating manual | 1-2 hours | Reliable release sources |
| Low | Add richer structured data for real products with offers. | `script.js`, product data | 2-4 hours | Real stock, prices, URLs |
| Low | Add a collection tracker using local browser storage. | Future feature | 6-12 hours | Real card/set database |
| Low | Add customer accounts or wishlist sync. | Future feature | Significant | Backend/auth decision |
| Low | Add direct checkout. | Future ecommerce system | Significant | Stock, payment provider, policies, fulfilment readiness |
| Low | Add blog/news hub. | Future content system | 4-12 hours | Content schedule |

## Data Audit

### `data/products.json`

Key launch gaps:

- Many products use preview descriptions.
- Many products use future image paths rather than confirmed uploaded photography.
- Some products point to the generic eBay store rather than a specific listing.
- Stock values must be verified before launch.
- Prices must be checked against current market and intended selling price.

Recommended workflow:

1. Start with 20-30 real products.
2. Photograph each product.
3. Create or confirm eBay listing.
4. Add real price, stock, image paths and eBay URL.
5. Check product page and category grid.

### `data/collections.json`

Key launch gaps:

- Several descriptions still sound like future-ready category scaffolding.
- Set pages need real product density before they feel complete.
- Related sets are structurally useful but should be reviewed once real product ranges are known.

### `data/releases.json`

Key launch gaps:

- Several release descriptions still use preview/listing language.
- Release dates should be checked against reliable sources before the calendar is promoted.
- Cross-game entries should remain release-watch wording unless stock is confirmed.

## SEO Audit

Current strengths:

- Sitemap exists.
- Robots file exists.
- Canonical URLs are in place.
- Most public pages have meta descriptions.
- Open Graph and Twitter image tags are present.
- Product and breadcrumb structured data exists where useful.

Launch gaps:

- Generic social image is used across nearly all pages.
- Product pages need real product images and offers before richer product SEO is valuable.
- Category pages for Lorcana, Yu-Gi-Oh! and Magic are intentionally lightweight and should not be oversold.
- Search Console submission still needs to be completed.

## Legal and Compliance Audit

Current strengths:

- Privacy Policy exists.
- Cookie Policy exists.
- Terms of Use exists.
- Shipping and returns pages exist.
- Forms are honest about not submitting data.

Launch gaps:

- Policy wording should be owner-reviewed before treating it as final.
- Newsletter/privacy wording must be revisited before connecting a real email provider.
- Analytics/cookie wording must be revisited before adding non-essential tracking.
- Direct checkout must not be added until policies, returns, payment handling and fulfilment are ready.

## Business Trust Audit

Current strengths:

- About page exists.
- Contact page exists.
- FAQ exists.
- Authenticity page exists.
- How to Buy page is honest about eBay checkout.
- Trade page exists for supplier conversations.

Launch gaps:

- Add real eBay feedback number and percentage.
- Add real business contact details.
- Add real stock and real product photos.
- Add verified supplier/distributor information only when approved.
- Add genuine packaging photos or process content when available.

## Suggested First 10 Launch Tasks

1. Confirm professional email address is live.
2. Choose 20 real products for first public catalogue.
3. Photograph those products.
4. Create or confirm eBay listings.
5. Update `data/products.json` with real prices, stock, images and eBay URLs.
6. Replace preview release descriptions in `data/releases.json`.
7. Add real eBay feedback number and percentage to trust sections.
8. Review policy pages as owner.
9. Submit sitemap to Google Search Console.
10. Check live site on mobile after Cloudflare deploy.

