import { Dispatch } from "redux";
import { ActionTypes } from "../Action-types";
import Api from "../../Services/ApiService";

const apiPath = "polygon";

export const getPolygonNamesRequest = () => ({
  type: ActionTypes.GET_POLYGON_NAMES_REQUEST,
});

export const getPolygonNamesSuccess = (data: string[]) => ({
  type: ActionTypes.GET_POLYGON_NAMES_SUCCESS,
  payload: data,
});

export const getPolygonNamesFailure = (error: string) => ({
  type: ActionTypes.GET_POLYGON_NAMES_FAILURE,
  payload: error,
});

export const getPolygonDetailsRequest = () => ({
  type: ActionTypes.GET_POLYGON_DETAILS_REQUEST,
});

export const getPolygonDetailsSuccess = (data: any) => ({
  type: ActionTypes.GET_POLYGON_DETAILS_SUCCESS,
  payload: data,
});

export const getPolygonDetailsFailure = (error: string) => ({
  type: ActionTypes.GET_POLYGON_DETAILS_FAILURE,
  payload: error,
});

export const searchPolygonsRequest = () => ({
  type: ActionTypes.SEARCH_POLYGON_REQUEST,
});

export const searchPolygonSuccess = (data: any) => ({
  type: ActionTypes.SEARCH_POLYGON_SUCCESS,
  payload: data,
});

export const searchPolygonFailure = (error: string) => ({
  type: ActionTypes.SEARCH_POLYGON_FAILURE,
  payload: error,
});

export const GetPolygonNamesHandler = () => async (dispatch: Dispatch) => {
  dispatch(getPolygonNamesRequest());
  try {
    const response = await Api.get(`${apiPath}/list`);
    dispatch(getPolygonNamesSuccess(response.data));
  } catch (error: any) {
    dispatch(getPolygonNamesFailure(error.message));
  }
};

export const GetPolygonDetailsHandler = (polygonName: string) => async (dispatch: Dispatch) => {
  dispatch(getPolygonDetailsRequest());
  try {
    const response = await Api.get(`${apiPath}/${polygonName}`);
    dispatch(getPolygonDetailsSuccess(response.data));
  } catch (error: any) {
    dispatch(getPolygonDetailsFailure(error.message));
  }
};

export const SearchPolygonsHandler = (coords: [[number, number]]) => async (dispatch: Dispatch) => {
  dispatch(searchPolygonsRequest());
  try {
    const response = await Api.post(`${apiPath}/find`, coords);
    dispatch(searchPolygonSuccess(response.data));
  } catch (error: any) {
    dispatch(searchPolygonFailure(error.message));
  }
};
