# SpammKing TCG Data Model

## Overview

The site is powered by three JSON data files:

- `data/products.json`
- `data/collections.json`
- `data/releases.json`

These files should remain valid JSON. Avoid comments inside JSON files.

## Products

Products live in `data/products.json`.

Required fields:

- `id`: unique product identifier
- `name`: customer-facing product name
- `category`: broad product type
- `productType`: filterable product type
- `game`: trading card game
- `set`: set or release family
- `collectionSlug`: game slug, such as `pokemon`
- `setSlug`: set slug, such as `surging-sparks`
- `productSlug`: future clean URL slug
- `status`: customer-facing status
- `rarity`: sealed, single rarity, graded or accessory type
- `condition`: product condition
- `price`: standard price as a number
- `salePrice`: sale price as a number or `null`
- `stock`: stock count as a number
- `images`: array of image paths
- `description`: customer-facing product description
- `releaseDate`: ISO date in `YYYY-MM-DD` format
- `tags`: searchable tags
- `featured`: boolean
- `comingSoon`: boolean
- `purchaseType`: CTA state
- `availabilityMessage`: customer-facing availability note

Optional purchase fields:

- `ebayUrl`
- `purchaseUrl`
- `ctaLabel`
- `preorderAvailable`
- `registerInterest`
- `externalCheckout`

## Purchase Types

Supported `purchaseType` values:

- `ebay`: routes customer to eBay
- `coming-soon`: product is not available yet
- `sold-out`: product is unavailable
- `register-interest`: routes customer to contact
- `unavailable`: detail-only state

Do not add fake basket, cart or checkout states until real ecommerce exists.

## Collections and Sets

Sets live in `data/collections.json`.

Each set should include:

- `game`
- `setName`
- `slug`
- `description`
- `releaseDate`
- `productCount`
- `status`
- `banner`
- `relatedSets`

The set `slug` must match product `setSlug` values for products in that set.

## Releases

Releases live in `data/releases.json`.

Each release should include:

- `title`
- `game`
- `set`
- `productType`
- `releaseDate`
- `preorderDate`
- `status`
- `shortDescription`
- `image`
- `relatedProducts`
- `slug`
- `priority`
- `featured`
- `comingSoon`
- `availableNow`
- `releaseWindow`
- `displayOrder`
- `sourceName`
- `sourceUrl`
- `sourceType`
- `confidence`
- `imageUrl`
- `imageAlt`
- `imageSource`
- `imageSourceUrl`
- `imageUsageNote`

`relatedProducts` should contain product IDs from `data/products.json`.

Release calendar rules:

- Use the release data as a collector release watch, not a confirmed SpammKing TCG stock list.
- Use official publisher sources first.
- Use distributor or reputable retailer sources second.
- Mark unconfirmed entries with `confidence: "rumoured"`.
- Do not use random Google Images.
- Use official/publisher promotional imagery only where safe.
- Leave `imageUrl` empty and rely on branded placeholder artwork if no safe official image is available.

## Data Quality Rules

- Keep IDs unique.
- Keep slugs lowercase and URL-safe.
- Use consistent game names.
- Use ISO dates for sorting.
- Avoid claims about stock, dispatch or preorder status unless true.
- Use real eBay URLs when available.
- Use placeholder image paths only until real photography is ready.
