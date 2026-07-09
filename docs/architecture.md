# SpammKing TCG Architecture

## Purpose

This website is a static-first storefront for SpammKing TCG. It is designed to look and behave like a premium trading card retailer while remaining simple to host, maintain and expand.

The current site is Phase 1 Beta. It does not run direct checkout. Purchases currently route customers to eBay where appropriate.

## High-Level Structure

- `index.html`: homepage and shop window
- `pokemon.html`: Pokemon category landing page
- `one-piece.html`: One Piece category landing page
- `latest-releases.html`: release hub and release calendar
- `product.html`: reusable product detail template
- `wishlist.html`: local wishlist page
- `pokemon/sets/`: static-friendly Pokemon set routes
- `one-piece/sets/`: static-friendly One Piece set routes
- `data/`: JSON data for products, collections and releases
- `script.js`: shared rendering and interaction logic
- `styles.css`: global design system and page styling
- `styleguide.html`: internal noindex design reference
- `trade.html`: hidden noindex supplier/distributor information page

## Rendering Model

The site uses static HTML files plus shared JavaScript rendering.

Static pages provide:

- Metadata
- Navigation
- Layout containers
- Data attributes used by `script.js`

`script.js` then:

- Loads only the JSON data needed by the current page
- Renders product grids
- Renders product detail content
- Renders set libraries and set detail content
- Renders release cards and release calendar content
- Handles wishlist and recently viewed products
- Adds structured data where useful

## Data-Driven Areas

The following areas are data-driven:

- Product cards
- Product detail pages
- Product search, filters, sorting and pagination
- Wishlist
- Recently viewed products
- Set cards
- Set detail pages
- Related sets
- Latest Releases sections
- Release calendar

## Static-Friendly Dynamic Routes

The site currently uses static folders for clean set routes:

- `pokemon/sets/journey-together/index.html`
- `one-piece/sets/op-09-emperors-in-the-new-world/index.html`

Each page is lightweight. The real content comes from `data/collections.json` and `data/products.json`.

This keeps hosting simple while still allowing the project to scale.

## External Systems

- GitHub stores the repository.
- Cloudflare Pages deploys the public site.
- eBay currently handles customer checkout where products are available externally.

## Current Limitations

- No direct checkout
- No server-side inventory management
- No customer accounts
- No synced wishlist
- No real email newsletter integration
- Placeholder product image paths are used until real imagery is added

These limitations are intentional for Phase 1 Beta.

