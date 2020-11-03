import axios from 'axios'
import { ProductData } from '../app'


export const fetchData = (category: string) => {

    const baseUrl = 'https://bad-api-assignment.reaktor.com/products/'

    return new Promise(async (resolve, reject) => {

        try {
            const { data } = await axios.get<ProductData[]>(`${baseUrl}${category}`)
            resolve(data)
        } catch (error) {
            console.log(error)
            reject(error)
        }
    })
}