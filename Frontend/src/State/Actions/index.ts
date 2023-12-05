import { ActionTypes } from "../Action-types"
import { GetUsers } from "./UserActions"

interface LoginAction {
    type: ActionTypes.Login,
    payload: string
}

interface Signout{
    type: ActionTypes.SIGN_OUT,
    payload: string
}

interface LoginActionSuccessful {
    type: ActionTypes.LoginSuccess,
    payload: object
}

interface LoginActionFailed {
    type: ActionTypes.LoginFailed
    payload: string
}

export type AuthAction = LoginAction | LoginActionSuccessful| LoginActionFailed | Signout;
export type PolygonAction =
  | { type: ActionTypes.GET_POLYGON_NAMES_REQUEST }
  | { type: ActionTypes.GET_POLYGON_NAMES_SUCCESS; payload: string[] }
  | { type: ActionTypes.GET_POLYGON_NAMES_FAILURE; payload: string }
  | { type: ActionTypes.GET_POLYGON_DETAILS_REQUEST }
  | { type: ActionTypes.GET_POLYGON_DETAILS_SUCCESS; payload: any }
  | { type: ActionTypes.GET_POLYGON_DETAILS_FAILURE; payload: string }
  | { type: ActionTypes.SEARCH_POLYGON_REQUEST; payload: string }
  | { type: ActionTypes.SEARCH_POLYGON_SUCCESS; payload: string }
  | { type: ActionTypes.SEARCH_POLYGON_FAILURE; payload: string };

export type UsersAction = GetUsers;