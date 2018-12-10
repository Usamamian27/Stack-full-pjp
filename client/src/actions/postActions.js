import axios from 'axios';

import {
    ADD_POST,
    GET_ERRORS,
    CLEAR_ERRORS,
    GET_POSTS,
    GET_POST,
    POST_LOADING,
    DELETE_POST
} from './types';

// Add Post
export const addpost = (postData) => dispatch => {
    dispatch(clearErrors());
    axios
        .post('/api/company/posts', postData)
        .then(res =>
            dispatch({
                type: ADD_POST,
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

// Get Posts (ALL)
export const getposts = () => dispatch => {
    dispatch(setPostLoading());
    axios
        .get('/api/company/posts')
        .then(res =>
            dispatch({
                type: GET_POSTS,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_POSTS,
                payload: null
            })
        );
};


// Get Single Post
export const getpost = (id) => dispatch => {
    dispatch(setPostLoading());
    axios
        .get(`/api/company/posts/${id}`)
        .then(res =>
            dispatch({
                type: GET_POST,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_POST,
                payload: null
            })
        );
};


// Delete post
export const deletePost = (id) => dispatch => {

    axios
        .delete(`/api/company/posts/${id}`)
        .then(res =>
            dispatch({
                type: DELETE_POST,
                payload: id
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};


//Add likes
export const addLike = (id) => dispatch => {

    axios
        .post(`/api/company/posts/apply/${id}`)
        .then(res =>
            dispatch(getposts())
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};



//Add Comments
export const addComment = (postId,commentData) => dispatch => {
    dispatch(clearErrors());
    axios
        .post(`/api/company/posts/comment/${postId}`, commentData)
        .then(res =>
            dispatch({
                type: GET_POST,
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


// Delete Comments
export const deleteComment = (postId,commentId) => dispatch => {

    axios
        .delete(`/api/company/posts/comment/${postId}/${commentId}`)
        .then(res =>
            dispatch({
                type: GET_POST,
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


// Short List Candidates

export const addShortlist = (id,postId) => dispatch => {

    axios
        .post(`/api/company/posts/shortlist/${id}/${postId}`)
        .then(res =>
            dispatch(getposts())
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Send email to candidate

export const emailCandidate = (data,history) =>dispatch =>{

    axios.post('/api/company/posts/send-email',data)
        .then(res => history.push('/employer-dashboard'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );

};





// Set Loading state
export const setPostLoading = () =>{

    return {
        type: POST_LOADING

    }
};

// Clear Errors
export const clearErrors  = () =>{

    return {
        type: CLEAR_ERRORS

    }
};
