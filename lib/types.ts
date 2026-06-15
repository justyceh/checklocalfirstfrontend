export type Category = {
  id: string
  name: string
  slug: string
}

export type Business = {
  id: string
  owner_user_id?: string
  name: string
  slug: string
  description?: string | null
  address?: string | null
  city?: string | null
  state?: string | null
  zip?: string | null
  phone?: string | null
  email?: string | null
  website?: string | null
  [key: string]: unknown
}

export type BusinessService = {
  id: string
  business_id: string
  name: string
  description?: string | null
  price: number | null
  category_id: string
}

export type ServiceResult = {
  id: string
  name: string
  description?: string | null
  category_id: string
  businesses: Business
  [key: string]: unknown
}
