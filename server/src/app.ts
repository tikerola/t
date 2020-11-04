import express, { Request, Response } from 'express'
import { accessories, jackets, shirts } from '..'

const NUMBER_OF_PRODUCTS_TO_RETURN = 10


const app = express()


const itemsToReturn = (page: number) : { start: number, end: number } => {
    const start = (page - 1) * NUMBER_OF_PRODUCTS_TO_RETURN
    const end = start + NUMBER_OF_PRODUCTS_TO_RETURN

    return {start, end}
}

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome')
})

app.get('/products/jackets/:page', (req: Request, res: Response) => {
    const { page } = req.params
    const filter = req.query.filter as string

    const filteredJackets = jackets.filter((jacket) => jacket.name.toLowerCase().startsWith(filter.toLowerCase()))
    const pagination = itemsToReturn(parseInt(page))
    res.status(200).send({items: filteredJackets.slice(pagination.start, pagination.end), numOfItems: filteredJackets.length})
})

app.get('/products/shirts/:page', (req: Request, res: Response) => {
    const { page } = req.params
    const filter = req.query.filter as string

    const filteredShirts = shirts.filter((shirt) => shirt.name.toLowerCase().startsWith(filter.toLowerCase()))
    const pagination = itemsToReturn(parseInt(page))
    res.status(200).send({items: filteredShirts.slice(pagination.start, pagination.end), numOfItems: filteredShirts.length})

})
app.get('/products/accessories/:page', (req: Request, res: Response) => {
    const { page } = req.params
    const filter = req.query.filter as string

    const filteredAccessories = accessories.filter((accessory) => accessory.name.toLowerCase().startsWith(filter.toLowerCase()))
    const pagination = itemsToReturn(parseInt(page))
    res.status(200).send({items: filteredAccessories.slice(pagination.start, pagination.end), numOfItems: filteredAccessories.length})
})


export { app }
