import axios from 'axios';

const apiService = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// Add an interceptor to set headers before each request
apiService.interceptors.request.use((config) => {
  let token = ''
  if (localStorage.USER_STATUS)
    token = parseJsonString(localStorage.USER_STATUS)?.Token;
  config.headers['Authorization'] = `${token}`;
  return config;
});

// Just If token is changed or not Json now return '' other wise return the object itself
function parseJsonString(str: string) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return '';
  }
}

export default apiService;
