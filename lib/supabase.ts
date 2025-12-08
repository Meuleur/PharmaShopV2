import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Product = {
  id: string
  name: string
  slug: string
  description: string
  short_description: string | null
  brand_id: string | null
  category_id: string | null
  price: number
  original_price: number | null
  stock_quantity: number
  sku: string
  image_url: string
  images: string[]
  rating: number
  review_count: number
  is_prescription_required: boolean
  is_featured: boolean
  is_new: boolean
  tags: string[]
  metadata: Record<string, any>
  created_at: string
  updated_at: string
  brand?: Brand
  category?: Category
}

export type Brand = {
  id: string
  name: string
  slug: string
  logo_url: string | null
  description: string | null
  website_url: string | null
  created_at: string
  updated_at: string
}

export type Category = {
  id: string
  name: string
  slug: string
  description: string | null
  image_url: string | null
  parent_id: string | null
  display_order: number
  created_at: string
  updated_at: string
}

export type Review = {
  id: string
  product_id: string
  user_id: string | null
  rating: number
  title: string | null
  comment: string
  verified_purchase: boolean
  helpful_count: number
  created_at: string
  updated_at: string
}

export type Favorite = {
  id: string
  user_id: string
  product_id: string
  created_at: string
  product?: Product
}
