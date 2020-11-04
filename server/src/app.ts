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
