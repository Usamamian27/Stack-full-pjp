import axios from 'axios';

import {
    GET_PORTFOLIO,
    PORTFOLIO_LOADING,
    CLEAR_CURRENT_PORTFOLIO,
    GET_ERRORS,
    SET_CURRENT_COMPANY,
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


// // Add Experience
// export const addExperience = (expData , history) => dispatch =>{
//
//     axios.post('/api/student/cv/experience',expData)
//         .then(res => history.push('/dashboard'))
//         .catch(err =>
//             dispatch({
//                 type: GET_ERRORS,
//                 payload:err.response.data
//             })
//
//         )
// };


// // Add education
// export const addEducation = (eduData, history) => dispatch => {
//     axios
//         .post('/api/student/cv/education', eduData)
//         .then(res => history.push('/dashboard'))
//         .catch(err =>
//             dispatch({
//                 type: GET_ERRORS,
//                 payload: err.response.data
//             })
//         );
// };

// // Add education
// export const addProject = (projData, history) => dispatch => {
//     axios
//         .post('/api/student/cv/project', projData)
//         .then(res => history.push('/dashboard'))
//         .catch(err =>
//             dispatch({
//                 type: GET_ERRORS,
//                 payload: err.response.data
//             })
//         );
// };


// // Delete Experience
// export const deleteExperience = (id) => dispatch => {
//     axios
//         .delete(`/api/student/cv/experience/${id}`)
//         .then(res =>
//             dispatch({
//                 type: GET_PROFILE,
//                 payload: res.data
//             })
//         )
//         .catch(err =>
//             dispatch({
//                 type: GET_ERRORS,
//                 payload: err.response.data
//             })
//         );
// };


// // Delete Education
// export const deleteEducation = (id) => dispatch => {
//     axios
//         .delete(`/api/student/cv/education/${id}`)
//         .then(res =>
//             dispatch({
//                 type: GET_PROFILE,
//                 payload: res.data
//             })
//         )
//         .catch(err =>
//             dispatch({
//                 type: GET_ERRORS,
//                 payload: err.response.data
//             })
//         );
// };

// // Delete Education
// export const deleteProject = (id) => dispatch => {
//     axios
//         .delete(`/api/student/cv/project/${id}`)
//         .then(res =>
//             dispatch({
//                 type: GET_PROFILE,
//                 payload: res.data
//             })
//         )
//         .catch(err =>
//             dispatch({
//                 type: GET_ERRORS,
//                 payload: err.response.data
//             })
//         );
// };
//
//
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
//
//
// // Delete Account & Profile
//
// export const deleteAccount = () => dispatch =>{
//     if(window.confirm('Are you Sure ? This cant be undone')){
//         axios.
//         delete('/api/profile')
//             .then(res =>
//                 dispatch({
//                     type:SET_CURRENT_USER,
//                     payload:{}
//                 })
//             )
//             .catch(err =>
//                 dispatch({
//                     type: GET_ERRORS,
//                     payload:err.response.data
//                 })
//             )
//     }
// };


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
