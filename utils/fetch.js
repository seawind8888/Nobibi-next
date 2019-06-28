import axios from 'axios';
import { message } from 'antd';
const instance = axios.create({
  baseURL: 'http://localhost:3001',
  withCredentials: true
  // timeout: 1000
});

export default function fetch (options) {
  return instance(options)
    .then(response => {
      const { data } = response;
      const { status } = data;
      const success = status === 200 ? true : false;
      if (!success && typeof window !== 'undefined')  {
        message.error(data.message);
      }
      return Promise.resolve({
        success: success,
        ...data,
      });
    })
    .catch(error => {
      console.log(error);
      if (typeof window !== 'undefined')  {
        message.info(error || 'Network Error');
      }
      return Promise.reject();
    });
}