import { ActionTypes } from "../Action-types";
import { PolygonAction } from "../Actions";
import { User } from "../Actions/UserActions";


interface PolygonsState {
  selectedPolygon: any;
  polygonTitles: string[] | null;
  loadingNames: boolean;
  successNames: boolean;
  errorNames: string | null;
  loadingDetails: boolean;
  successDetails: boolean;
  errorDetails: string | null;
}

const initialState: PolygonsState = {
  polygonTitles: [],
  loadingDetails: false,
  loadingNames: false,
  successNames: false,
  successDetails: false,
  errorNames: '',
  errorDetails: '',
  selectedPolygon: null
};


const PolygonsReducer = (state = initialState, action: PolygonAction): PolygonsState => {
  switch (action.type) {
    case ActionTypes.GET_POLYGON_NAMES_REQUEST:
      return {
        ...state,
        loadingNames: true,
        successNames: false,
        errorNames: null,
      };
    case ActionTypes.GET_POLYGON_NAMES_SUCCESS:
      return {
        ...state,
        loadingNames: false,
        successNames: true,
        errorNames: null,
        polygonTitles: action.payload as string[],
      };
    case ActionTypes.GET_POLYGON_NAMES_FAILURE:
      return {
        ...state,
        loadingNames: false,
        successNames: false,
        errorNames: action.payload as string,
      };
    case ActionTypes.GET_POLYGON_DETAILS_REQUEST:
      return {
        ...state,
        loadingDetails: true,
        successDetails: false,
        errorDetails: null,
      };
    case ActionTypes.GET_POLYGON_DETAILS_SUCCESS:
      return {
        ...state,
        loadingDetails: false,
        successDetails: true,
        errorDetails: null,
        selectedPolygon: action.payload,
      };
    case ActionTypes.GET_POLYGON_DETAILS_FAILURE:
      return {
        ...state,
        loadingDetails: false,
        successDetails: false,
        errorDetails: action.payload as string,
      };
    default:
      return state;
  }
};

export default PolygonsReducer;
