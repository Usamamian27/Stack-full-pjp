import {SET_CURRENT_ADMIN,GET_ALL_APPROVALS} from "../actions/types";
import isEmpty from '../validations/isEmpty';


const initialState ={
    isAdminAuthenticated : false,
    admin: {},
    approvals:{},
    loading:false
};

export default function(state = initialState , action){
    switch (action.type) {
        case SET_CURRENT_ADMIN:
            return {
                ...state,
                isAdminAuthenticated: !isEmpty(action.payload),
                admin:action.payload
            };
        case GET_ALL_APPROVALS:
            return {
                ...state,
                approvals: action.payload,
                loading: false
            };
        default:
            return state;
    }
}
