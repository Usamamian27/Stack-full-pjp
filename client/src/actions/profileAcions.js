import axios from 'axios';

import {
    GET_PROFILE,
    PROFILE_LOADING,
    CLEAR_CURRENT_PROFILE,
    GET_ERRORS,
    SET_CURRENT_USER,
    GET_PROFILES
} from './types';

// Get current profile
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios
        .get('/api/student/cv')
        .then(res =>
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_PROFILE,
                payload: {}
            })
        );
};


// Get  profile by handle
export const getProfileByHandle = (handle) => dispatch => {
    dispatch(setProfileLoading());
    axios
        .get(`/api/student/cv/handle/${handle}`)
        .then(res =>
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_PROFILE,
                payload: {}
            })
        );
};

// Get  profile by handle
export const showProfile = (id) => dispatch => {
    dispatch(setProfileLoading());
    axios
        .get(`/api/student/cv/user/${id}`)
        .then(res =>
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_PROFILE,
                payload: {}
            })
        );
};

// Create Profile
export const createProfile = (profileData, history) => dispatch => {
    axios
        .post('/api/student/cv', profileData)
        .then(res => history.push('/dashboard'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};


// Add Experience
export const addExperience = (expData , history) => dispatch =>{

    axios.post('/api/student/cv/experience',expData)
        .then(res => history.push('/dashboard'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload:err.response.data
            })

        )
};


// Add education
export const addEducation = (eduData, history) => dispatch => {
    axios
        .post('/api/student/cv/education', eduData)
        .then(res => history.push('/dashboard'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Add education
export const addProject = (projData, history) => dispatch => {
    axios
        .post('/api/student/cv/project', projData)
        .then(res => history.push('/dashboard'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};


// Delete Experience
export const deleteExperience = (id) => dispatch => {
    axios
        .delete(`/api/student/cv/experience/${id}`)
        .then(res =>
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};


// Delete Education
export const deleteEducation = (id) => dispatch => {
    axios
        .delete(`/api/student/cv/education/${id}`)
        .then(res =>
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Delete Education
export const deleteProject = (id) => dispatch => {
    axios
        .delete(`/api/student/cv/project/${id}`)
        .then(res =>
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};


// Get All Profiles
export const getProfiles =() => dispatch => {

    dispatch(setProfileLoading());
    axios
        .get('/api/student/cv/all')
        .then(res =>
            dispatch({
                type: GET_PROFILES,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_PROFILES,
                payload: null
            })
        );
};


// Delete Account & Profile

export const deleteAccount = () => dispatch =>{
    if(window.confirm('Are you Sure ? This cant be undone')){
        axios.
        delete('/api/profile')
            .then(res =>
                dispatch({
                    type:SET_CURRENT_USER,
                    payload:{}
                })
            )
            .catch(err =>
                dispatch({
                    type: GET_ERRORS,
                    payload:err.response.data
                })
            )
    }
};


// Profile loading
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    };
};

// Clear profile
export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    };
};
