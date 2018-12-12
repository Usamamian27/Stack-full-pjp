import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {GET_ERRORS,SET_CURRENT_USER,SET_CURRENT_COMPANY,SET_CURRENT_ADMIN} from "./types";
import setAuthToken from '../utils/setAuthToken';

// Register a Student
export const registerStudent =(userData,history)=> dispatch=>{
    axios.post('/api/student/students/register',userData)
        .then(res => history.push('/login'))
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
};


// Log User out
export const logOutUser = () => dispatch => {

    //Remove token from localstorage
    localStorage.removeItem('Student');

    // Remove auth header for future requests
    setAuthToken(false);
    // set current user to empty {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
};


/// Company's Actions
// Register a Company
export const registerCompany =(companyData,history)=> dispatch=>{
    axios.post('/api/company/companies/register',companyData)
        .then(res => history.push('/employer-login'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload:err.response.data
            })
        );
};

//login Company
export const loginCompany = (companyData) =>dispatch =>{
    axios.post('/api/company/companies/login',companyData)
        .then(res => {
            // save token to local storage
            const {token} = res.data;
            //Set token to local storage
            localStorage.setItem('Company',token);
            //Set token to auth header
            setAuthToken(token);
            //Decode Token to get user data
            const decoded = jwt_decode(token);
            //Set Current user
            dispatch(setCurrentCompany(decoded));

        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }) )
};

// Log Company out
export const logOutCompany = () => dispatch => {

    //Remove token from localstorage
    localStorage.removeItem('Company');

    // Remove auth header for future requests
    setAuthToken(false);
    // set current user to empty {} which will set isCompanyAuthenticated to false
    dispatch(setCurrentCompany({}));
};

// Set Logged in Company
export const setCurrentCompany = (decoded) =>{
    return {
        type:SET_CURRENT_COMPANY,
        payload:decoded
    }
};



/// Admin's Actions
// Register a Admin
export const registerAdmin =(AdminData,history)=> dispatch=>{
    axios.post('/api/admin/admin/register',AdminData)
        .then(res => history.push('/admin-login'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload:err.response.data
            })
        );
};

//login Admin
export const loginAdmin = (AdminData) =>dispatch =>{
    axios.post('/api/admin/admin/login',AdminData)
        .then(res => {
            // save token to local storage
            const {token} = res.data;
            //Set token to local storage
            localStorage.setItem('Admin',token);
            //Set token to auth header
            setAuthToken(token);
            //Decode Token to get user data
            const decoded = jwt_decode(token);
            //Set Current user
            dispatch(setCurrentAdmin(decoded));

        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }) )
};









// Log Company out
export const logOutAdmin = () => dispatch => {

    //Remove token from localstorage
    localStorage.removeItem('Admin');

    // Remove auth header for future requests
    setAuthToken(false);
    // set current user to empty {} which will set isCompanyAuthenticated to false
    dispatch(setCurrentAdmin({}));
};

// Set Logged in Company
export const setCurrentAdmin = (decoded) =>{
    return {
        type:SET_CURRENT_ADMIN,
        payload:decoded
    }
};


