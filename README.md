Upload these files to your GitHub repository. Cloudflare Pages will deploy automatically.

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

Use clear placeholder image paths until real photography is available, for example:

`assets/images/products/pokemon/product-name-front.jpg`

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
- `banner`: future banner or illustration placeholder path
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
- `image`: future release image placeholder path
- `relatedProducts`: array of related product IDs
- `slug`: URL-safe release slug
- `priority`: sorting importance
- `featured`: `true` or `false`
- `comingSoon`: `true` or `false`
- `availableNow`: `true` or `false`
- `releaseWindow`: display month, such as `August 2026`
- `displayOrder`: manual sort order

The Latest Releases page, homepage release section, Pokemon release watch and One Piece release sections all use this shared release data.

## SEO and Routing

Core SEO files live at the site root:

- `sitemap.xml`: lists the main public pages plus Pokemon and One Piece set routes
- `robots.txt`: allows indexing and points to the sitemap
- `404.html`: branded fallback page for missing routes

Important page expectations:

- Public pages should have a unique title, meta description and canonical URL
- Key public pages should include Open Graph and Twitter card metadata
- Internal-only pages such as `styleguide.html` should remain `noindex`
- Static-friendly collection routes use folder `index.html` files, for example `pokemon/sets/prismatic-evolutions/index.html`

Structured data is added through `script.js` where useful:

- Organization schema on the homepage
- WebSite schema on the homepage
- BreadcrumbList schema on product and set pages
- Product schema on product detail pages without making misleading stock claims

## Customer Support Pages

Draft customer confidence pages live at the site root:

- `shipping.html`: UK shipping, dispatch, packaging and pre-order delivery notes
- `returns.html`: draft returns and refunds guidance for owner review
- `authenticity.html`: genuine product, condition and packaging standards
- `faq.html`: common customer questions
- `how-to-buy.html`: explains the current eBay-first buying journey
- `contact.html`: email, business details and enquiry type guidance
- `privacy-policy.html`: draft privacy wording for owner review
- `cookie-policy.html`: draft cookie and localStorage wording
- `terms.html`: draft terms of use

These pages should stay honest and avoid legal or checkout claims until the full ecommerce setup is confirmed.

Newsletter forms are currently placeholders. They should not submit visitor details until a real newsletter provider and privacy process are connected.
