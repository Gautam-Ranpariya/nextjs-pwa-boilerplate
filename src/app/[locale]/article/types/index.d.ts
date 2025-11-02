declare namespace Article {
  interface IRating {
    rate: number
    count: number
  }

  interface IProduct {
    id: number
    title: string
    price: number
    description: string
    category: string
    image: string // URL to the product image
    rating: Article.IRating
  }
}
