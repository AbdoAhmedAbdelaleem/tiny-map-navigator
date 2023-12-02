import { ActionTypes } from '../Action-types'
export interface GetUsers {
    type: ActionTypes.GET_USERS
    payload: User[]
}

export interface User {
    email: string,
    firstName?: string,
    lastName?: string
}
