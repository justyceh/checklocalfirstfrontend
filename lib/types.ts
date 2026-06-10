export type Business = {
  id: string
  name: string
  address?: string | null
  phone?: string | null
  website?: string | null
  [key: string]: unknown
}

export type ServiceResult = {
  id: string
  name: string
  description?: string | null
  category_id: string
  businesses: Business
  [key: string]: unknown
}
