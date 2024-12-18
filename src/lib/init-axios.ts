/* eslint-disable */
import axios from "axios";
import auth from "./auth";

const initAxios = async (router:any) => {
  const token = auth.getToken(); // Không cần await, vì đây là synchronous

  // Thiết lập Authorization header nếu có token
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  // Cấu hình interceptor request
  axios.interceptors.request.use(
    async function (config) {
      document.body.classList.add('loading-indicator');

      // Cập nhật lại token ở đây, nếu cần
      const updatedToken = auth.getToken();
      if (updatedToken) {
        config.headers['Authorization'] = `Bearer ${updatedToken}`;
      }

      if (!config.params) {
        config.params = {};
      }

      return config;
    },
    function (error) {
      document.body.classList.remove('loading-indicator');
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    function (response) {
      document.body.classList.remove('loading-indicator');
      return response;
    },
    function (error) {
      document.body.classList.remove('loading-indicator');

      if (error.response) {
        switch (error.response.status) {
          case 401:
            console.error('Unauthorized or Forbidden access');
            auth.logout();
            if (typeof window !== 'undefined') {
              router.push('/login'); // Điều hướng đến trang login
            }
            break;
          case 403:
            console.error('Forbidden access');
            if (typeof window !== 'undefined') {
              router.push('/forbidden'); // Điều hướng đến trang 403
            }
            break;
          default:
            console.error('An error occurred:', error.message);
            break;
        }
      }

      return Promise.reject(error);
    }
  );

  return token;
};

export default initAxios;