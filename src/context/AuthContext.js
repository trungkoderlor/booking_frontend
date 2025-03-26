import { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(Cookies.get('token') || null);
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (token) {
      axios
        .get('http://localhost:3003/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUser(res.data);
          setLoading(false);
        })
        .catch(() => {
          setUser(null);
          Cookies.removeItem('token');
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [token]);
  const login = (newToken) => {
    Cookies.set('token', newToken, { expires: 7, secure: true });
    setToken(newToken);
    setShowLogin(false);
    setLoading(true);
  };

  const logout = () => {
    Cookies.remove('token');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, setUser, loading, setLoading, login, logout, showLogin, setShowLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
