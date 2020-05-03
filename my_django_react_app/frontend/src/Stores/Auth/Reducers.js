import {createReducer} from 'reduxsauce'
import {AuthTypes} from './Actions'

const INITIAL_STATE = {
  token: {},
  user: {},
  isLoading: false,
  userErrorMessage: null,
  isAuthenticated: false
}

export const loginSuccess = (state, {payload}) => {
  console.log('inside login success')
  console.log(payload)
  localStorage.setItem('react_django_token', payload.token);
  return {
    ...state,
    token: payload.token,
    user: payload.user,
    isLoading: false,
    userErrorMessage: '',
    isAuthenticated: true
  }
}

export const logoutUser = (state) => {
  return {
    ...state,
    token: {},
    user: {},
    isLoading: false,
    userErrorMessage: '',
    isAuthenticated: false
  }
}

export const userLoaded = (state,{payload}) =>{
  console.log('user loaded')
  return {
    ...state,
    isAuthenticated: true,
    isLoading: false,
    user: payload,
  }
}

export const logoutUserSuccess = (state,{payload}) =>{
  localStorage.removeItem('react_django_token');
  console.log('user logged out')
  return {
    ...state,
    isAuthenticated: false,
    isLoading: false,
    user: {},
    token: {}
  }
}


export const reducer = createReducer(INITIAL_STATE, {
  // [UserTypes.FETCH_USER_LOADING]: fetchUserLoading,
  // [UserTypes.FETCH_USER_SUCCESS]: fetchUserSuccess,
  // [UserTypes.FETCH_USER_FAILURE]: fetchUserFailure,
  [AuthTypes.LOGIN_SUCCESS]: loginSuccess,
  [AuthTypes.REGISTER_SUCCESS]: loginSuccess,
  // [UserTypes.LOGIN_FAILURE]: loginFailed,
  [AuthTypes.LOGOUT_USER_SUCCESS]: logoutUserSuccess,
  [AuthTypes.USER_LOADED]: userLoaded,
})

