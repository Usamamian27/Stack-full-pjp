//import {SET_CURRENT_USER} from "../actions/types";
//import isEmpty from '../validations/is-empty';
import {GET_ERRORS} from "../actions/types";

const initialState ={
};

export default function(state = initialState , action){
    switch (action.type) {

        case GET_ERRORS:
            console.log(action.payload)
            return action.payload;
        default:
            return state;
    }
}
