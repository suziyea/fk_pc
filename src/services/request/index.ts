import axios from 'axios';
import MyHttp from '@/types/MyHttp';
import { requestInterceptors, responseInterceptors, responseErrorHandler } from './interceptors';

console.log(REACT_APP_ENV);
const request = axios.create({
  baseURL: API_SERVER,
  loading: false,
  silence: false,
} as MyHttp.RequestConfig);

request.interceptors.request.use(requestInterceptors);

request.interceptors.response.use(responseInterceptors, responseErrorHandler);

export default request as MyHttp.RequestInstance;
