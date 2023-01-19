import { Axios } from 'axios';

const InterceptorRequest = (axiosInstance: Axios) =>
{
  axiosInstance.interceptors.request.use(
    (config) =>
    {
      const token = localStorage.getItem('token') || '';
      if (!config.headers)
      {
        config.headers = {};
      }
      config.headers['x-token'] = token;
      return config;
    },

    (error) =>
    {
      return Promise.reject(error);
    }
  );
};

const InterceptorResponse = (axiosInstance: Axios) =>
{
  axiosInstance.interceptors.response.use(
    (response) =>
    {
      const token = response.headers['x-token'];
      if (token)
      {
        localStorage.setItem('token', token);
      }
      else
      {
        localStorage.setItem('token', '');
      }
      return response;
    },
    (error) =>
    {
      return Promise.reject(error);
    }
  );
};

export const setInterceptor = (axiosInstance: Axios) =>
{
  InterceptorResponse(axiosInstance);
  InterceptorRequest(axiosInstance);
};
