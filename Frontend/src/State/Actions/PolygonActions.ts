import { ActionTypes } from '../Action-types'
export interface GetPolygonNames {
    type: ActionTypes.GET_POLYGON_NAMES
    payload: {title:string}[]
}

export interface GetPolygonDetails {
    type: ActionTypes.GET_POLYGON_DETAILS
    payload: Object| null
}

export interface Polgon {
    Title: string,
    area: Point[],
    LastName?: string
}

export interface Point {
    x: number,
    y: number
}

export type PolygonAction =
  | { type: ActionTypes.GET_POLYGON_NAMES_REQUEST }
  | { type: ActionTypes.GET_POLYGON_NAMES_SUCCESS; payload: string[] }
  | { type: ActionTypes.GET_POLYGON_NAMES_FAILURE; payload: string }
  | { type: ActionTypes.GET_POLYGON_DETAILS_REQUEST }
  | { type: ActionTypes.GET_POLYGON_DETAILS_SUCCESS; payload: any }
  | { type: ActionTypes.GET_POLYGON_DETAILS_FAILURE; payload: string };