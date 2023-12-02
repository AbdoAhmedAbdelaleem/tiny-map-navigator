import { useDispatch, useSelector } from 'react-redux'
import './App.css';
import { actionCreators } from './State';
import { bindActionCreators } from 'redux'
import { State } from './State';
import { Login } from './Components/Auth/Login';
import 'bootstrap/dist/css/bootstrap.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import { BrowserRouter as Router, Route , Routes} from 'react-router-dom';
import { NotFound } from './Components/Shared/NotFound';
import Users from './Components/Users/Users';
import Map from './Components/Polygons/Map';
import PrivateRoute from './Components/Shared/Routing/PrivateRoute';
import Home from './Components/Home/Home';
import SignOut from './Components/Auth/Logout';
// import NotFound from './components/NotFound';

function App() {
  //const dispatch = useDispatch();
  // const { DepositMoney, WithdrawMoney, Bankrupt } = bindActionCreators(actionCreators, dispatch);
  // const state = useSelector((state: State) => state.users)
  // return (
  //   // <div>
  //   //   <h1>{state}</h1>
  //   //   <button onClick={() => DepositMoney(1000)} className='btn btn-primary'>Deposit</button>
  //   //   <button onClick={() => WithdrawMoney(1000)}>Withdraw</button>
  //   //   <button onClick={() => Bankrupt()}>Bankrupt</button>
  //   // </div>
  //   <Login/>
  // );

    return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/map" element={<PrivateRoute path="/map" renderComponent={Map} />}/>
          <Route path="/users" element={<PrivateRoute path="/users" renderComponent={Users} />}/>
          <Route path="/home" element={<PrivateRoute path="/home" renderComponent={Home} />}/>
          <Route path="/signout" element={<PrivateRoute path="/signout" renderComponent={SignOut} />}/>
          <Route path="*" element={<PrivateRoute path="*" renderComponent={NotFound} />}/>
        </Routes>
      </Router>
    );
  
}

export default App;
