import { createContext, useState } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(Cookies.get('token') || null);
  const [showLogin, setShowLogin] = useState(false);

  const login = (newToken) => {
    Cookies.set('token', newToken, { expires: 7, secure: true });
    setToken(newToken);
    setShowLogin(false); // Ẩn modal sau khi đăng nhập
  };

  const logout = () => {
    Cookies.remove('token');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, showLogin, setShowLogin }}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
