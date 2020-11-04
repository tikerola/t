import axios from 'axios'
import { ProductData } from '../../index'


const fetchData = (category: string) => {

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

export const initializeData = async (): Promise<{jackets: ProductData[], shirts: ProductData[], accessories: ProductData[]}> => {
    
    let jackets: ProductData[] = []
    let shirts: ProductData[] = []
    let accessories: ProductData[] = []

    try {
        let data = await fetchData('jackets') as ProductData[]
        jackets = data

        data = await fetchData('shirts') as ProductData[]
        shirts = data

        data = await fetchData('accessories') as ProductData[]
        accessories = data

        
    }catch (error) {
        console.log(error)
    }
    return { jackets, shirts, accessories }
}