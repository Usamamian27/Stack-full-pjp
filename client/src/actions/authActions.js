import axios from 'axios';
import {GET_ERRORS} from "./types";


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
