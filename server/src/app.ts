import express, { Request, Response} from 'express'
import { fetchData } from './fetchData/fetchData'

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

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome')
})

app.get('/products/jackets', (req: Request, res: Response) => {
    res.status(200).send(jackets.slice(0, 10))
})
app.get('/products/shirts', (req: Request, res: Response) => {
    res.status(200).send(shirts.slice(0, 10))
})
app.get('/products/accessories', (req: Request, res: Response) => {
    res.status(200).send(accessories.slice(0, 10))
})


export { app }