import { DefaultTheme } from 'styled-components'

declare module "styled-components" {
    export interface DefaultTheme {
        primaryColor: string
        secondaryColor: string,
        titleColor: string,
        navigation: {
            height: string,
            primaryColor: string,
            secondaryColor: string,
        },
        button: {
            bgColor: string,
            bgHoverColor: string
        }
    }
}

export const lightTheme: DefaultTheme = {
    primaryColor: '#333',
    secondaryColor: '#666',
    titleColor: '#999',
    navigation: {
        height: '60px',
        primaryColor: '#555',
        secondaryColor: '#ccc'
    },
    button: {
        bgColor: '#fff',
        bgHoverColor: '#7f7f7f'
    }
}

export const darkTheme: DefaultTheme = {
    primaryColor: '#fff',
    secondaryColor: '#cacaca',
    titleColor: '#999',
    navigation: {
        height: '60px',
        primaryColor: '#000',
        secondaryColor: '#999'
    },
    button: {
        bgColor: '#5f5f5f',
        bgHoverColor: '#7f7f7f'
    }
}