
import axios from 'axios';


const API_URL = 'http://localhost:5000/api/auth/';


const register = async (userData) => {

  const response = await axios.post(API_URL + 'register', userData);

  
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};


const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};


const logout = () => {
  localStorage.removeItem('user');
};

const forgotPassword = async (email) => {

  const response = await axios.post(API_URL + 'forgot-password', { email });
  return response.data;
};

const resetPassword = async (token, password) => {
 
  const response = await axios.put(API_URL + 'reset-password/' + token, { password });
  return response.data;
};

const authService = {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword
};

export default authService;