import React, { useState, useEffect } from "react";
import { useNavigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { State } from "../../../State";

interface IProps {
    exact?: boolean;
    path: string;
    renderComponent: React.FC<any>
}

const PrivateRoute: React.FC<IProps> = ({ path, renderComponent:RenderComponent  }) => {
  const dispatch = useDispatch();
  const { IsSuccess, IsInvoked } = useSelector((state: State) => state.Auth);

    const isAuthenticated = IsSuccess && IsInvoked; 
    const navigate = useNavigate();
  
    useEffect(() => {
      if (isAuthenticated) {
        if (path !== '*') {
          navigate(path);
        } else {
          navigate('/notfound');
        }
      } else {
        navigate('/login');
      }
    }, [isAuthenticated, navigate, path]);
  
    return isAuthenticated ? <RenderComponent /> : <Outlet />;
  };
    
  export default PrivateRoute;