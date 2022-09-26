import { GET_ICONS } from "./actions";
import { GET_POSTERS } from "./action-poster";
import { GET_LOCATION } from "./action-location"
 
const initialState = {
    stream: [],
    rent: [],
    buy: []
}

function iconReducer(state = initialState, action){
    switch(action.type){
        case GET_ICONS:
            return {
                ...state,
                stream: action.payload.stream,
                rent: action.payload.rent,
                buy: action.payload.buy
            }
        default:
            return state;
    }   

}

function posterReducer(state = "", action){
    switch(action.type){
        case GET_POSTERS:
            return {
                ...state,
                posterURL: action.payload
            }
        default:
            return state;
    }
}

function locationReducer(state="", action){
    switch(action.type){
        case GET_LOCATION:
            return{
                ...state,
                location: action.payload
            }
            default:
                return state;
    }
}

export {iconReducer,posterReducer, locationReducer};