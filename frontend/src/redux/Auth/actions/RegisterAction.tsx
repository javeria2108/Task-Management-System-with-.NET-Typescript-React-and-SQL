export const REGISTER_USER_REQUEST='REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS='REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE='REGISTER_USER_FAILURE';

export const registerUser=()=>{
    return {
        type: REGISTER_USER_REQUEST
    }
}