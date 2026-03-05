export type Make = {
    id: number
    name: string
  }
  
  export type Model = {
    id: number
    make_id: number
    name: string
  }
  
  export type Year = {
    id: number
    year: number
  }
  
  export type Category = {
    id: number
    name: string
    slug: string
    description: string
    image_url: string | null
  }
  
  export type Product = {
    id: number
    name: string
    slug: string
    description: string | null
    brand: string | null
    category_id: number
    price: number
    stock: number
    images: string[]
    viscosity: string | null
    volume_liters: number | null
    oem_approvals: string[]
    is_featured: boolean
    is_active: boolean
  }