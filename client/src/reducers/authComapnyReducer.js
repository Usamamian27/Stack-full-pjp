import {SET_CURRENT_COMPANY} from "../actions/types";
import isEmpty from '../validations/isEmpty';


const initialState ={
    isCompanyAuthenticated : false,
    company: {}
};

export default function(state = initialState , action){
    switch (action.type) {
        case SET_CURRENT_COMPANY:
            return {
                ...state,
                isCompanyAuthenticated: !isEmpty(action.payload),
                company:action.payload
            };
        default:
            return state;
    }
}
