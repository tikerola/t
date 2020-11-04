import { app } from "./src/app"
import { initializeData } from "./src/fetchData/fetchData"

const port = process.env.PORT || 3001

export interface ProductData {
    id: string
    name: string
    price: number
    manufacturer: string
    type: string
}

export let jackets: ProductData[]
export let shirts: ProductData[]
export let accessories: ProductData[]

initializeData().then(data => {
    jackets = data.jackets
    shirts= data.shirts
    accessories = data.accessories

    app.listen(port, () => {
        console.log(`Listening on port ${port}`)
    })
})
