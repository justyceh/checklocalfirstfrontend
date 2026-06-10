export const CATEGORIES = [
  { name: 'Clothing & Apparel',     slug: 'clothing-and-apparel' },
  { name: 'Home Decor & Furniture', slug: 'home-decor-and-furniture' },
  { name: 'Gifts & Specialty',      slug: 'gifts-and-specialty' },
  { name: 'Art & Design',           slug: 'art-and-design' },
  { name: 'Jewelry & Accessories',  slug: 'jewelry-and-accessories' },
  { name: 'Plants & Garden',        slug: 'plants-and-garden' },
  { name: 'Sustainable Living',     slug: 'sustainable-living' },
  { name: 'Beauty & Wellness',      slug: 'beauty-and-wellness' },
] as const;

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';
