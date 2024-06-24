import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { RootState } from '../../store/store';

interface PrivateRouteProps {
    component: React.ComponentType;
  }
  
  const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component }) => {
    const dispatch = useDispatch();
    const token = useSelector((state: RootState) => state.user.token);
    const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  
    useEffect(() => {
      if (token) {
        dispatch(validateToken(token));
      }
    }, [token, dispatch]);
  
    return isAuthenticated ? <Component /> : <Navigate to="/login" />;
  };
  
export default PrivateRoute;