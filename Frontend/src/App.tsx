import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './Components/Shared/Routing/PrivateRoute';
import SignoutViewer from './Views/SignoutViewer';
import UsersViewer from './Views/UsersViewer';
import MapViewer from './Views/MapViewer';
import LoginViewer from './Views/LoginViewer';
import HomeViewer from './Views/HomeViewer';
import NotFoundViewer from './Views/NotFoundViewer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginViewer />} />
        <Route path="/map" element={<PrivateRoute path="/map" renderComponent={MapViewer} />} />
        <Route path="/users" element={<PrivateRoute path="/users" renderComponent={UsersViewer} />} />
        <Route path="/home" element={<PrivateRoute path="/home" renderComponent={HomeViewer} />} />
        <Route path="/signout" element={<PrivateRoute path="/signout" renderComponent={SignoutViewer} />} />
        <Route path="*" element={<PrivateRoute path="*" renderComponent={NotFoundViewer} />} />
      </Routes>
    </Router>
  );

}

export default App;
