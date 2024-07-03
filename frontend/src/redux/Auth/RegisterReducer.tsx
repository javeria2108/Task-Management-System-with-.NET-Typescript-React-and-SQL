import { REGISTER_USER_REQUEST } from "./actions/RegisterAction"

const initialState={
    loading: false,
    user:[],
    error:""
}

const RegisterReducer=(state=initialState,action: {type: string})=>{
    switch(action.type){
        case REGISTER_USER_REQUEST:
            return{
                ...state,
                loading:true,
            }
    }
}
export default RegisterReducer;