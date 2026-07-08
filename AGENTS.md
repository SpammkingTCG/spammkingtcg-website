# AGENTS.md

# SpammKing TCG Development Guidelines

This repository represents a real business.

Every code change should improve the long-term quality of the project.

---

# Core Principles

Never rewrite working files without good reason.

Prefer incremental improvements over complete rewrites.

Preserve existing functionality.

Maintain backwards compatibility whenever practical.

---

# Code Quality

Write clean, readable code.

Use semantic HTML.

Avoid unnecessary JavaScript.

Prefer CSS solutions where possible.

Keep functions small and focused.

Comment major sections.

Use consistent formatting.

---

# HTML

Use semantic elements.

Maintain accessibility.

Proper heading hierarchy.

Meaningful alt text.

Buttons should use `<button>` where appropriate.

Navigation should remain accessible.

---

# CSS

Organise using clearly labelled sections.

Example:

==========================================================
RESET
DESIGN SYSTEM
LAYOUT
HEADER
NAVIGATION
HERO
BUTTONS
CARDS
FOOTER
MEDIA QUERIES
==========================================================

Use CSS variables wherever possible.

Avoid duplicated styles.

Animations should be smooth and subtle.

---

# JavaScript

Keep JavaScript lightweight.

Only introduce JavaScript when CSS cannot achieve the desired behaviour.

Avoid unnecessary dependencies.

---

# Responsive Design

Desktop first.

Then tablet.

Then mobile.

No horizontal scrolling.

Touch friendly controls.

Readable typography.

---

# Performance

Optimise images.

Avoid layout shift.

Minimise unnecessary animations.

Avoid blocking scripts.

---

# Accessibility

Keyboard navigation.

Good colour contrast.

Meaningful aria labels where appropriate.

Maintain WCAG best practices.

---

# SEO

Use semantic HTML.

Maintain logical heading structure.

Optimise metadata.

Use descriptive links.

Prepare pages for future structured data.

---

# Design Language

The website should feel:

Premium

Luxury

Modern

Minimal

Collector focused

Professional

NOT:

Childish

Overly colourful

Cluttered

Cheap

---

# Colour Palette

Background:
#0B0D10

Surface:
#171B22

Primary Accent:
#D4AF37

White text.

Soft grey secondary text.

---

# Animation Guidelines

Animations should be subtle.

Cards:

Small lift.

Soft shadow.

Buttons:

Gentle hover.

Smooth transitions.

Navigation:

Gold underline.

Glass effect.

Avoid excessive animation.

---

# Repository Structure

Prefer:

assets/

css/

js/

images/

icons/

fonts/

Keep components modular.

---

# Commit Messages

Use conventional commits.

Examples:

feat: add featured categories section

style: improve hero spacing

fix: correct responsive navigation

refactor: simplify button styles

docs: update roadmap

---

# Workflow

Inspect existing files before editing.

Understand the current implementation.

Improve rather than replace.

If multiple approaches are possible:

Choose the simplest maintainable solution.

---

# Long-Term Goal

The website should be capable of growing into a premium UK trading card retailer with:

Full e-commerce

Customer accounts

Inventory management

News

Product releases

Pre-orders

Blog

Events

Trade-ins

Loyalty system

Every decision should support this long-term vision.

---

# Do Not Change Without Approval

Do not significantly change the following without explicit approval:

- Brand colours
- Typography
- Logo layout
- Overall design language
- Homepage messaging
- Navigation structure
- Premium styling
- Dark theme

Small improvements are encouraged.

Major redesigns should always be proposed before implementation.

---

# Future Features

The long-term roadmap includes:

- Full e-commerce integration
- Shopping cart
- Customer accounts
- Wishlist
- Product search
- Advanced filtering
- Pre-order system
- Stock management
- Loyalty rewards
- News & Articles
- Card grading services
- Trade-in service
- Live product availability

Future implementations should keep these features in mind when designing the site's structure.