# SpammKing TCG Coding Standards

## Principles

- Preserve the existing design language.
- Make targeted improvements.
- Avoid broad rewrites unless there is a strong reason.
- Keep the site honest about what exists today.
- Prioritise maintainability over cleverness.

## HTML

- Use semantic HTML.
- Keep heading order logical.
- Use accessible labels where needed.
- Use links for navigation.
- Use buttons for in-page actions.
- Keep hidden/internal pages marked `noindex` where appropriate.

## CSS

- Use `styles.css` and existing CSS variables.
- Preserve the dark premium black/gold brand.
- Keep sections clearly labelled.
- Prefer reusable classes over one-off styling.
- Avoid layout changes that alter the public design without approval.
- Keep mobile layouts free from horizontal overflow.

## JavaScript

- Keep JavaScript lightweight.
- Use shared functions for repeated rendering logic.
- Avoid adding dependencies unless genuinely necessary.
- Keep data loading page-aware so unnecessary JSON files are not fetched.
- Use `escapeHtml` for rendered customer-facing data.
- Keep localStorage use defensive.

## JSON

- Keep JSON valid.
- Use consistent schema fields.
- Use real data where available.
- Do not make false stock, preorder, shipping or checkout claims.

## Accessibility

- Preserve visible focus states.
- Keep controls keyboard accessible.
- Use meaningful link text.
- Avoid disabled-looking links unless the state is genuinely unavailable.

## SEO

- Public pages should have title, description and canonical URL.
- Important public pages should have Open Graph and Twitter metadata.
- Public pages should use the shared social preview image where relevant.
- Hidden/internal pages should not be indexed.

