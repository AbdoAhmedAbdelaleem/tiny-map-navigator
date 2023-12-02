import { Dispatch } from "redux"
import { ActionTypes } from "../Action-types"
import { AuthAction } from "../Actions"
import axios from 'axios';
import Api from '../../Services/ApiService'

const apiPath = 'Auth'
export const LoginHandler = (userData: { email: string; password: string }) => (dispatch: Dispatch<AuthAction>) => {
  // Make API call to Login using Axios
  Api
    .post(`${apiPath}/login`, userData)
    .then((response) => {
      dispatch({
        type: ActionTypes.LoginSuccess,
        payload: response.data.authentication.sessionToken,
      })
    })
    .catch((error) => {
      dispatch({
        type: ActionTypes.LoginFailed,
        payload: error
      })
    });
};

export const SignoutHandler = () => (dispatch: Dispatch<AuthAction>) => {
  dispatch({
    type: ActionTypes.SIGN_OUT,
    payload: ''
  })
};