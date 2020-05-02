import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  // // Fetch user informations
  // fetchUser: ['credentials'],
  // // The operation has started and is loading
  // fetchUserLoading: null,
  // // User informations were successfully fetched
  // fetchUserSuccess: ['user'],
  // // An error occurred
  // fetchUserFailure: ['errorMessage'],
  // login: ['action'],
  loginSuccess:['payload'],
  // loginFailure:['error'],
  // logout:null,
  logoutUser:null,
  userLoaded:['payload']
  // registerUser: ['data'],
  // fetchUserMyData: ['credentials'],
})

export const loadUser = () => (dispatch, getState) => {
  // User Loading
  // dispatch({ type: USER_LOADING });

  axios
    .get('/api/auth/user', tokenConfig(getState))
    .then((res) => {
      console.log(res)
      dispatch(Creators.userLoaded(res.data))
    })
    .catch((err) => {
      // dispatch(returnErrors(err.response.data, err.response.status));
      // dispatch({
      //   type: AUTH_ERROR,
      // });
    });
};

export const tokenConfig = (getState) => {
  // Get token from state
  // const token = getState().auth.token;

  const token = localStorage.getItem('react_django_token')
  console.log(token)
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // If token, add to headers config
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }

  return config;
}

export const AuthTypes = Types
export default Creators
