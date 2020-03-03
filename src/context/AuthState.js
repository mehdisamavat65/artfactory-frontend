import React,{useReducer} from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import {LOGIN_ADMIN_USER,LOGOUT_ADMIN_USER,FAIL_LOGIN_USER,FAIL_LOGOUT_USER} from './types';
import jwtDecode  from 'jwt-decode';


const AuthState = (props) =>{
    const initialState = {
        user:null
    }


    const [state,dispatch] = useReducer(AuthReducer,initialState);

    if(localStorage.getItem('adminpanel-art')){
            const userToken = jwtDecode(localStorage.getItem('adminpanel-art'));
            if(userToken){
                if(userToken.exp * 1000 < Date.now()){
                    localStorage.removeItem('adminpanel-art');
                }else{
                    initialState.user = userToken
                }
            }

    }else{

    }


    const login = (userData) =>{
       localStorage.setItem('adminpanel-art',userData.token);
        dispatch({
            type:LOGIN_ADMIN_USER,
            payload:userData
        })
    }

    const logout = () => {
        localStorage.removeItem('adminpanel-art');
        dispatch({
            type:LOGOUT_ADMIN_USER
        })

    }


    return(<AuthContext.Provider value={{
        user:state.user,
        login,
        logout
    }}>
        {props.children}
    </AuthContext.Provider>)

}

export default AuthState;