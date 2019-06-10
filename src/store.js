import {createStore} from 'redux'

const initialState = {
    currentValue: 0,
    futureValues:[],
    pastValues:[]
}

export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'
export const UNDO = 'UNDO'
export const REDO = 'REDO'

function reducer(state = initialState, action){
    switch(action.type) {
        case INCREMENT:
            return { 
                ...state, 
                currentValue: state.currentValue+action.payload,
                futureValues: [],
                pastValues: [state.currentValue, ...state.pastValues]}
        case DECREMENT:
            return {...state, 
                currentValue: state.currentValue-action.payload,
                futureValues: [],
                pastValues: [state.currentValue, ...state.pastValues]}
        case UNDO:
        let [first, ...rest] = state.pastValues
            return {currentValue: first,
                    futureValues: [state.currentValue, ...state.futureValues],
                    pastValues: rest}
        case REDO:
        let [start, ...end] = state.futureValues
            return {currentValue: start,
                    futureValues: end,
                    pastValues:[state.currentValue, ...state.pastValues]}
        default:
            return state
    }
}

export default createStore(reducer)