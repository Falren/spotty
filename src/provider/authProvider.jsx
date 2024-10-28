import axios from "axios";
import { 
  useMemo,
  useEffect,
  useState,
} from "react";
import AuthContext from "../contexts/auth_context";

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('currentUser'))
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
      localStorage.setItem('currentUser', currentUser);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
    }
  }, [token, currentUser]);
  
  const contextValue = useMemo(() => ({
    currentUser,
    setCurrentUser,
    token,
    setToken
  }), [token, currentUser]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}
export default AuthProvider;
