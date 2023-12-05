import { AuthAction } from "../Actions";
import { ActionTypes } from "../Action-types";
import * as consts from '../consts'

interface LoginStatus {
  Token: string,
  IsSuccess: boolean,
  IsInvoked: boolean
}

// Retrieve state from localStorage as we need not to lost it so we save in Localstorage
var initState: LoginStatus = JSON.parse(localStorage.getItem(consts.USER_STATUS) || '{}') || {
  Token: '',
  IsSuccess: false,
  IsInvoked: false,
};

const AuthReducer = (state: LoginStatus = initState, action: AuthAction): LoginStatus => {
  let status = state;
  switch (action.type) { 
    case ActionTypes.LoginSuccess:
      let successStatus = {
        ...state,
        IsInvoked: true,
        IsSuccess: true,
        Token: action.payload + ""
      }
      // Save token To help in Authentications
      localStorage.setItem(consts.USER_STATUS, JSON.stringify(successStatus));
      return successStatus;
    case ActionTypes.LoginFailed:
      let failStatus = {
        ...state,
        IsInvoked: true,
        IsSuccess: false,
        Token: ""
      }
      delete localStorage[consts.USER_STATUS];
      return failStatus
    case ActionTypes.SIGN_OUT:
      delete localStorage[consts.USER_STATUS];
  }
  return status;
}

export default AuthReducer;
