import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {GET_ERRORS,SET_CURRENT_USER} from "./types";
import setAuthToken from '../utils/setAuthToken';

// Register a Student
export const registerStudent =(userData,history)=> dispatch=>{
    axios.post('/api/student/students/register',userData)
        .then(res => history.push('/'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload:err.response.data
            })
        );
};

//login Student
export const loginStudent = (userData) =>dispatch =>{
    axios.post('/api/student/students/login',userData)
        .then(res => {
            // save token to local storage
            const {token} = res.data;
            //Set token to local storage
            localStorage.setItem('Student',token);
            //Set token to auth header
            setAuthToken(token);
            //Decode Token to get user data
            const decoded = jwt_decode(token);
            //Set Current user
            dispatch(setCurrentUser(decoded));

        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }) )
};

// Set Logged in Student
export const setCurrentUser = (decoded) =>{
    return {
        type:SET_CURRENT_USER,
        payload:decoded
    }
}
