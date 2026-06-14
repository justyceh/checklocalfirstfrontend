# SEO Audit & Update

Review every page in the `src/app` directory and ensure the following are implemented.
Do not rebuild pages from scratch — only add or fix what is missing.

## Checklist

- [ ] Every page has a `generateMetadata()` or static `metadata` export with unique 
      `title`, `description`, and `openGraph` block
- [ ] Every page uses semantic HTML (`<main>`, `<header>`, `<section>`, etc.)
- [ ] Every page has exactly one `<h1>` that contains a natural Reno-focused keyword
- [ ] `<h1>` → `<h2>` → `<h3>` heading order is respected throughout
- [ ] `/business/[slug]` uses `generateStaticParams()` for static generation
- [ ] `/business/[slug]` has a `generateMetadata()` that pulls business name and 
      description from the API dynamically
- [ ] `/business/[slug]` has a JSON-LD structured data block using schema.org/LocalBusiness
- [ ] All images use Next.js `<Image>` with descriptive `alt` text
- [ ] Every page metadata includes a canonical URL

## How to approach this

1. Read each page file in `src/app`
2. Check it against the checklist above
3. Make only the necessary additions — do not rewrite working logic
4. Report what was missing and what was fixed per page