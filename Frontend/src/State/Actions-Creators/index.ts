import { LoginHandler, SignoutHandler } from "../Actions-Creators/AuthActionCreators"
import { GetUsersHandler } from "./UsersActionCreators"
import { GetPolygonDetailsHandler, GetPolygonNamesHandler, SearchPolygonsHandler } from "./PolygonActionCreators"

export const Login = LoginHandler
export const Signout = SignoutHandler
export const GetUsers = GetUsersHandler
export const GetPolygonDetails = GetPolygonDetailsHandler
export const GetPolygonNames = GetPolygonNamesHandler
export const  SearchPolygons = SearchPolygonsHandler