import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks';

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
