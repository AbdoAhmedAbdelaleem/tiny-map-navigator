import {combineReducers} from 'redux'
import AuthReducer from './AuthReducer'
import UsersReducer from './UserReducer'
import PolygonsReducer from './PolygonReducer';

const reducers = combineReducers({
    Auth: AuthReducer,
    Users: UsersReducer,
    Polygons: PolygonsReducer
})

export default reducers;

export type State = ReturnType<typeof reducers>;