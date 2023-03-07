
export interface Item {
    id: string,
    title: string,
    price: number, // Price without taxes
    description: string,
    category: string,
    image: string,
    rating: ItemRating
}

interface ItemRating {
    rate: number,
    count: number
}