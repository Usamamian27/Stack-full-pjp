// Root Reducer
// WE bring all our reducers here

import {combineReducers} from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import postReducer from './postReducer';

import authCompanyReducer from './authComapnyReducer';
import portfolioReducer from './portfolioReducer';



export default combineReducers({

    auth: authReducer,
    errors:errorReducer,
    profile:profileReducer,
    authCompany:authCompanyReducer,
    portfolio:portfolioReducer,
    post:postReducer
});
