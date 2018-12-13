import axios from 'axios';

import {
    GET_PORTFOLIO,
    PORTFOLIO_LOADING,
    CLEAR_CURRENT_PORTFOLIO,
    GET_ERRORS,
    GET_PORTFOLIOS
} from './types';

// Get current profile
export const getCurrentPortfolio = () => dispatch => {
    dispatch(setPortfolioLoading());
    axios
        .get('/api/company/portfolio')
        .then(res =>
            dispatch({
                type: GET_PORTFOLIO,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_PORTFOLIO,
                payload: {}
            })
        );
};


// Get  profile by handle
export const getPortfolioByHandle = (handle) => dispatch => {
    dispatch(setPortfolioLoading());
    axios
        .get(`/api/company/portfolio/handle/${handle}`)
        .then(res =>
            dispatch({
                type: GET_PORTFOLIO,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_PORTFOLIO,
                payload: {}
            })
        );
};


// Create Portfolio
export const createPortfolio = (portfolioData, history) => dispatch => {
    axios
        .post('/api/company/portfolio', portfolioData)
        .then(res => history.push('/employer-dashboard'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }),
        );
};

// Get All Profiles
export const getPortfolios =() => dispatch => {

    dispatch(setPortfolioLoading());
    axios
        .get('/api/company/portfolio/all')
        .then(res =>
            dispatch({
                type: GET_PORTFOLIOS,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_PORTFOLIOS,
                payload: null
            })
        );
};

// Portfolio loading
export const setPortfolioLoading = () => {
    return {
        type: PORTFOLIO_LOADING
    };
};

// Clear Portfolio
export const clearCurrentPortfolio = () => {
    return {
        type: CLEAR_CURRENT_PORTFOLIO
    };
};
