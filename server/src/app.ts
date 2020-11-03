import express, { Request, Response} from 'express'
import { fetchData } from './fetchData/fetchData'

const NUMBER_OF_PRODUCTS_TO_RETURN = 10

export interface ProductData {
    id: string
    name: string
    price: number
    manufacturer: string
    type: string
}

let jackets: ProductData[]
let shirts: ProductData[]
let accessories: ProductData[]

const app = express()

fetchData('jackets')
.then((data): void => { 
    jackets = data as ProductData[] 
})

fetchData('shirts')
.then((data): void => { 
    shirts = data as ProductData[] 
})

fetchData('accessories')
.then((data): void => { 
    accessories = data as ProductData[] 
})

const itemsToReturn = (page: number) => {
    const start = (page - 1) * NUMBER_OF_PRODUCTS_TO_RETURN
    const end = start + NUMBER_OF_PRODUCTS_TO_RETURN

    return {start, end}
}

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome')
})

app.get('/products/jackets/:page', (req: Request, res: Response) => {
    const { page } = req.params
    const pagination = itemsToReturn(parseInt(page))
    res.status(200).send({items: jackets.slice(pagination.start, pagination.end), numOfItems: jackets.length})
})
app.get('/products/shirts/:page', (req: Request, res: Response) => {
    const { page } = req.params
    const pagination = itemsToReturn(parseInt(page))
    res.status(200).send({items: shirts.slice(pagination.start, pagination.end), numOfItems: shirts.length})

})
app.get('/products/accessories/:page', (req: Request, res: Response) => {
    const { page } = req.params
    const pagination = itemsToReturn(parseInt(page))
    res.status(200).send({items: accessories.slice(pagination.start, pagination.end), numOfItems: accessories.length})
})


export { app }