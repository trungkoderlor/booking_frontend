import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
