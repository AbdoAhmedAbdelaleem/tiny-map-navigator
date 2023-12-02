import { ActionTypes } from "../Action-types";
import * as consts from '../consts'
import { AuthAction, UsersAction } from "../Actions";
import { User } from "../Actions/UserActions";


interface UsersState {
	data: User[]
}

const UsersReducer = (state: UsersState = {data:[]}, action: UsersAction): UsersState => {
	switch (action.type) {
		case ActionTypes.GET_USERS:
			return {
				...state,
				data: action.payload
			}
    default:
      return state;
	}
}

export default UsersReducer;
