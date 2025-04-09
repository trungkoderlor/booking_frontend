import { createContext, useState, useEffect } from 'react';
import axios from '../utils/httpRequest';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`/api/auth/me`)
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);
  const login = () => {
    setShowLogin(false);
    setLoading(false);
  };

  const logout = () => {
    axios
      .get('/api/auth/logout')
      .then(() => {
        setUser(null);
      })
      .catch((err) => {
        console.error('Logout error:', err);
      });
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, setLoading, login, logout, showLogin, setShowLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
