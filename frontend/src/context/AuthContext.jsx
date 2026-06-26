import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  // Configure axios default header
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  }, [token]);

  // Check if user is logged in on load
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // MOCK: Simulate backend fetch User
        // const res = await axios.get('http://localhost:5000/api/auth/me');
        // setUser(res.data.user);
        setUser({ id: '1', name: 'Test User', email: 'test@example.com' });
      } catch (error) {
        console.error('Error fetching user:', error);
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  const login = async (email, password) => {
    // MOCK: Simulate backend login
    // const res = await axios.post('http://localhost:5000/api/auth/login', {
    //   email,
    //   password,
    // });
    // setToken(res.data.token);
    // setUser(res.data.user);
    
    setToken('mock-jwt-token-12345');
    setUser({ id: '1', name: 'Test User', email });
  };

  const signup = async (name, email, password) => {
    // MOCK: Simulate backend signup
    // const res = await axios.post('http://localhost:5000/api/auth/signup', {
    //   name,
    //   email,
    //   password,
    // });
    // setToken(res.data.token);
    // setUser(res.data.user);
    
    setToken('mock-jwt-token-12345');
    setUser({ id: '1', name, email });
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
