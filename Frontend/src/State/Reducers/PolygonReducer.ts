import { ActionTypes } from "../Action-types";
import { PolygonAction } from "../Actions";


interface PolygonsState {
  selectedPolygon: any;
  polygonTitles: string[] | null;
  loadingNames: boolean;
  successNames: boolean;
  errorNames: string | null;
  loadingDetails: boolean;
  successDetails: boolean;
  errorDetails: string | null;

  loadingSearch: boolean;
  successSearch: boolean,
  errorSearch: string | null;
  searchPolygonsResult: any
}

const initialState: PolygonsState = {
  polygonTitles: [],
  loadingDetails: false,
  loadingNames: false,
  successNames: false,
  successDetails: false,
  errorNames: '',
  errorDetails: '',
  selectedPolygon: null,
  searchPolygonsResult: null,
  errorSearch: '',
  successSearch: false,
  loadingSearch: false
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
        // Null Search as current action is select polygon so we need to display data fro selection
        searchPolygonsResult: null,   
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
    case ActionTypes.SEARCH_POLYGON_REQUEST:
      return {
        ...state,
        loadingSearch: true,
        successSearch: false,
        errorSearch: null,
      };
    case ActionTypes.SEARCH_POLYGON_SUCCESS:
      return {
        ...state,
        // Null SelectedPolygon as current action is Search polygon so we need to display data from selection
        selectedPolygon: null,
        loadingSearch: false,
        successSearch: true,
        errorSearch: null,
        searchPolygonsResult: action.payload,
      };
    case ActionTypes.SEARCH_POLYGON_FAILURE:
      return {
        ...state,
        loadingSearch: false,
        successSearch: false,
        errorSearch: action.payload as string,
      };
    default:
      return state;
  }
};

export default PolygonsReducer;
