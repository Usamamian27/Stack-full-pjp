import {
    CLEAR_CURRENT_PORTFOLIO,
    GET_PORTFOLIO,
    PORTFOLIO_LOADING,
    GET_PORTFOLIOS
} from "../actions/types";


const initialState = {
    portfolio : null,
    portfolios: null,
    loading : false

};

export default function (state = initialState , action) {

    switch (action.type) {
        case PORTFOLIO_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_PORTFOLIO:
            return {
                ...state,
                portfolio: action.payload,
                loading: false
            };
        case CLEAR_CURRENT_PORTFOLIO:
            return {
                ...state,
                portfolio: null
            };

        case GET_PORTFOLIOS:
            return {
                ...state,
                portfolios: action.payload,
                loading: false
            };
        default:
            return state;
    }

}
