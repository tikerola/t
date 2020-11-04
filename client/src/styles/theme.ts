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
        },
        tag: {
            cheap: string,
            moderate: string,
            expensive: string
        }
    }
}

export const lightTheme: DefaultTheme = {
    primaryColor: '#333',
    secondaryColor: '#666',
    titleColor: '#222',
    navigation: {
        height: '60px',
        primaryColor: 'rgba(0,0,0,0.7)',
        secondaryColor: '#ccc'
    },
    button: {
        bgColor: 'rgba(51, 51, 51, 0.8)',
        bgHoverColor: '#7f7f7f'
    },
    tag: {
        cheap: 'green',
        moderate: 'seagreen',
        expensive: 'lightseagreen'
    }
}

export const darkTheme: DefaultTheme = {
    primaryColor: '#fff',
    secondaryColor: '#cacaca',
    titleColor: '#222',
    navigation: {
        height: '60px',
        primaryColor: '#000',
        secondaryColor: '#999'
    },
    button: {
        bgColor: '#5f5f5f',
        bgHoverColor: '#7f7f7f'
    },
    tag: {
        cheap: 'green',
        moderate: 'orange',
        expensive: 'seagreen'
    }
}