

import axios from "axios";

const instance = axios.create();
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 60000;

instance.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.getItem("authToken");
    if (accessToken) {
      config.headers.Authorization =accessToken;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const config = error?.config;

    if (error?.response?.status === 419 && !config?.sent) {
      config.sent = true;
      try {
        const response = localStorage.getItem("refreshToken")
        let accessToken
        
         fetch('http://localhost:4000/auth/refresh',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refreshToken: response }),
         }).then(res => res.json())
          .then(data => {
            return data.accessToken
          });
        if (accessToken) {
          config.headers['Authorization'] = accessToken;
          localStorage.setItem("authToken", accessToken);
          return instance(config);
        } else {
          localStorage.removeItem("authToken");
        }
      } catch (tokenError) {
        localStorage.removeItem("authToken");
      }
    } else {
    

      return Promise.reject(error);
    }
  }
);

export { instance };
