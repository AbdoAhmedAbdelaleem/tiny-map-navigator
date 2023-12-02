import { Dispatch } from "redux"
import { ActionTypes } from "../Action-types"
import { UsersAction } from "../Actions";
import Api from '../../Services/ApiService'

const controllerPath = 'users'
export const GetUsersHandler = () => (dispatch: Dispatch<UsersAction>) => {
  // Make API call to fetch Users using Axios
  Api
    .get(controllerPath)
    .then((response) => {
      dispatch({
        type: ActionTypes.GET_USERS,
        payload: response.data,
      })
    })
    .catch((error) => {
      console.error(error);
    });
};