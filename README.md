Upload these files to your GitHub repository. Cloudflare Pages will deploy automatically.

## Documentation Index

Core project documentation:

- `docs/architecture.md`: how the static storefront is structured
- `docs/data-model.md`: product, collection and release JSON schemas
- `docs/deployment.md`: GitHub and Cloudflare deployment process
- `docs/coding-standards.md`: HTML, CSS, JavaScript, accessibility and SEO standards
- `docs/contributing.md`: safe contribution workflow and commit guidance
- `docs/future-features.md`: future feature backlog and decision rules
- `SPAMMKING_TCG_OPERATING_MANUAL.md`: business operating manual for stock, sales, marketing and growth

## Product Data

Product listings are stored in `data/products.json` and rendered by `script.js`.

Each product should use this schema:

- `id`: unique URL-safe product identifier
- `name`: customer-facing product name
- `category`: product type, such as Booster Box, Singles, Graded Cards or Accessories
- `productType`: product type used by filters and collection pages
- `game`: trading card game, such as Pokemon or One Piece
- `set`: product set or range
- `collectionSlug`: game-level slug, such as `pokemon` or `one-piece`
- `setSlug`: set-level slug, such as `prismatic-evolutions`
- `productSlug`: product-level slug for future clean product URLs
- `status`: customer-facing product status, such as Available or Coming Soon
- `rarity`: sealed, single rarity, graded or accessory type
- `condition`: product condition, such as New / Sealed, Near Mint or Graded 10
- `price`: normal price as a number
- `salePrice`: sale price as a number, or `null`
- `stock`: current stock count as a number
- `images`: array of future product image paths
- `imageAlts`: optional array of accessible alt text matching the `images` array
- `imageVerified`: `true` when image paths are real approved product photographs rather than placeholder paths
- `description`: product description
- `releaseDate`: ISO date in `YYYY-MM-DD` format
- `tags`: searchable tags
- `featured`: `true` or `false`
- `comingSoon`: `true` or `false`
- `ebayUrl`: optional external eBay listing or store URL
- `purchaseUrl`: optional URL used by the primary purchase CTA
- `purchaseType`: controls the CTA state, such as `ebay`, `coming-soon`, `sold-out`, `register-interest` or `unavailable`
- `ctaLabel`: optional customer-facing CTA label
- `availabilityMessage`: customer-facing product availability note
- `preorderAvailable`: `true` or `false`
- `registerInterest`: `true` or `false`
- `externalCheckout`: `true` when the purchase is completed outside the website

Use clear preview image paths until real photography is available, for example:

`assets/images/products/pokemon/product-name-front.jpg`

For real stock photographs:

- Keep original photographs outside the public optimized assets folder
- Create optimized WebP copies under `assets/images/products/`
- Use descriptive product and angle filenames
- Add matching `imageAlts`
- Set `imageVerified` to `true`
- Use the `current-stock` tag only for products physically held by SpammKing TCG
- Leave price, quantity and purchase URLs blank until confirmed

### Purchase CTA Logic

The website does not currently run direct checkout. Product CTAs are generated from product data:

- `ebay`: shows `View on eBay` and opens the eBay URL
- `coming-soon`: shows a coming soon CTA and keeps the customer on the product journey
- `sold-out`: shows a disabled sold out state
- `register-interest`: links customers to contact SpammKing TCG
- `unavailable`: keeps the CTA as a product detail action

Do not add fake basket, cart or payment CTAs until real checkout is implemented.

## Collections and Sets

Set metadata is stored in `data/collections.json`.

Each set should include:

- `game`: trading card game, such as Pokemon or One Piece
- `setName`: customer-facing set name
- `slug`: URL-safe set slug
- `description`: short set description
- `releaseDate`: ISO date in `YYYY-MM-DD` format
- `productCount`: fallback product count
- `status`: set status, such as Available or Coming Soon
- `banner`: future banner or illustration preview path
- `relatedSets`: array of related set slugs

Game set pages currently use static-friendly folders such as:

- `pokemon/sets/`
- `pokemon/sets/journey-together/`
- `pokemon/sets/prismatic-evolutions/`
- `one-piece/sets/`
- `one-piece/sets/op-09-emperors-in-the-new-world/`
- `one-piece/sets/op-10-royal-blood/`

The page content is rendered from `collections.json` and `products.json`, so One Piece and future games can reuse the same structure.

## Release Data

Release hub data is stored in `data/releases.json` and rendered by `script.js`.

Each release should include:

- `title`: customer-facing release name
- `game`: trading card game
- `set`: set or release family
- `productType`: product type, such as Booster Box or Elite Trainer Box
- `releaseDate`: ISO date in `YYYY-MM-DD` format
- `preorderDate`: ISO date for preorder or register-interest timing
- `status`: release status, such as Coming Soon, Pre-order, Register Interest, Available Now, Sold Out or Recently Released
- `shortDescription`: short collector-facing description
- `image`: future release image preview path
- `relatedProducts`: array of related product IDs
- `slug`: URL-safe release slug
- `priority`: sorting importance
- `featured`: `true` or `false`
- `comingSoon`: `true` or `false`
- `availableNow`: `true` or `false`
- `releaseWindow`: display month, such as `August 2026`
- `displayOrder`: manual sort order
- `sourceName`: publisher, distributor, retailer or news/source name
- `sourceUrl`: source URL where appropriate
- `sourceType`: source category, such as `official`, `distributor`, `retailer`, `news`, `reference` or `release-watch`
- `confidence`: release confidence, such as `official`, `distributor`, `retailer` or `rumoured`
- `imageUrl`: official/publisher promotional image URL if safe to use
- `imageAlt`: accessible image description
- `imageSource`: image owner/source
- `imageSourceUrl`: image source URL where appropriate
- `imageUsageNote`: usage note, especially when using branded placeholders

The Latest Releases page, homepage release section, Pokemon release watch and One Piece release sections all use this shared release data.

Release data maintenance rules:

- Treat `latest-releases.html` as a collector release calendar, not a stock promise
- Use official publisher sources first
- Use distributor or reputable retailer sources second
- Mark rumours and unconfirmed releases clearly with `confidence: "rumoured"`
- Do not use random Google Images
- Use official/publisher promotional images only where safe
- Leave `imageUrl` empty and use branded placeholder artwork when no safe official image is available
- Do not claim SpammKing TCG availability unless a product has a real purchase URL or confirmed stock

## Business Content Data

Business and collector content is stored in `data/content.json` and rendered by `script.js`.

The content file currently supports:

- `featuredProduct`: homepage product highlight
- `latestEbayListing`: current eBay-first buying highlight
- `latestArrival`: latest stock or arrival note
- `cardOfTheWeek`: collector feature content
- `businessUpdates`: website, stock, supplier and business updates
- `milestones`: business timeline items

The homepage uses this content for the `Inside SpammKing TCG` section. `news-updates.html` uses the same data for business updates, Card of the Week and milestone timeline content.

Keep this content honest and current. Do not present a product as available from SpammKing TCG unless it has a real purchase route or confirmed availability.

Content maintenance guide:

- To update the featured product, edit `featuredProduct` with the real product name, verified product URL or eBay URL, and an honest summary.
- To update the latest arrival, edit `latestArrival` only when a real stock arrival, purchase or grading submission is ready to share publicly.
- To update Card of the Week, edit `cardOfTheWeek` with a real card Sean owns and avoid unsupported market or population claims.
- To add business updates, add new items to the top of `businessUpdates` with a real date, type and short summary.
- To add milestones, add only verified achievements to `milestones`; do not add supplier approvals, sales figures or feedback numbers until they are true.

## SEO and Routing

Core SEO files live at the site root:

- `sitemap.xml`: lists the main public pages plus Pokemon and One Piece set routes
- `robots.txt`: allows indexing and points to the sitemap
- `404.html`: branded fallback page for missing routes

Important page expectations:

- Public pages should have a unique title, meta description and canonical URL
- Key public pages should include Open Graph and Twitter card metadata
- Public pages should use `assets/images/social-preview.jpg` for share previews where metadata is present
- Internal-only pages such as `styleguide.html` should remain `noindex`
- Static-friendly collection routes use folder `index.html` files, for example `pokemon/sets/prismatic-evolutions/index.html`

Structured data is added through `script.js` where useful:

- Organization schema on the homepage
- WebSite schema on the homepage
- BreadcrumbList schema on product and set pages
- Product schema on product detail pages without making misleading stock claims

## Customer Support Pages

Customer confidence pages live at the site root:

- `shipping.html`: UK shipping, dispatch, packaging and pre-order delivery notes
- `returns.html`: returns and refunds guidance
- `authenticity.html`: genuine product, condition and packaging standards
- `faq.html`: common customer questions
- `how-to-buy.html`: explains the current eBay-first buying journey
- `contact.html`: email, business details and enquiry type guidance
- `privacy-policy.html`: privacy information
- `cookie-policy.html`: cookie and localStorage information
- `terms.html`: terms of use

These pages should stay honest and avoid legal or checkout claims until the full ecommerce setup is confirmed.

Newsletter forms currently act as passive interest forms. They should not submit visitor details until a real newsletter provider and privacy process are connected.

Business email routing:

- General enquiries: `hello@spammkingtcg.co.uk`
- Customer support and product questions: `support@spammkingtcg.co.uk`
- Order and returns enquiries: `orders@spammkingtcg.co.uk`
- Trade, supplier and distributor enquiries: `trade@spammkingtcg.co.uk`

Public email addresses should use `mailto:` links and avoid personal email accounts.

## Trade Information Page

`trade.html` is a hidden supplier/distributor information page. It is intentionally not linked from the main navigation and is marked `noindex` so it can be shared directly during trade applications without becoming a customer-facing shop page.

## Launch QA Notes

The v0.9.5 pass focuses on keeping the current site mobile-ready and safe to share before v1.0. New features, new games and checkout should wait until the soft launch checklist is complete.

## v1.0 Beta Maintenance Notes

Phase 1 is now treated as feature complete. Future work should prioritise real product content, real images, real eBay links and customer/distributor feedback before adding major new functionality.

Senior-developer expectations from this point:

- Preserve the current public design unless a change is intentionally approved
- Keep product, set and release pages data-driven
- Avoid fake cart, basket or checkout flows until direct ecommerce is implemented
- Prefer small maintainability improvements over broad rewrites
- Update this README, `CHANGELOG.md` and `ROADMAP.md` when the site structure changes
