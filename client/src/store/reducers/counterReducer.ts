
const initialState = {
    counter: 0
}

interface actionTypes {
    type: string
    counter: number
}

export const counterReducer = (state = initialState, action: actionTypes) => {
    switch(action.type) {

        default:
            return initialState
    }
}