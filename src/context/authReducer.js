import {LOGIN_ADMIN_USER,LOGOUT_ADMIN_USER,FAIL_LOGIN_USER,FAIL_LOGOUT_USER} from './types';


export default (state,action) => {
    switch(action.type){
        case LOGIN_ADMIN_USER:
            return{
                ...state,
                user:action.payload
            }

        case LOGOUT_ADMIN_USER:
            return{
                ...state,
                user:null
            }    
    }
}