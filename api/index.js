import fetch from '../utils/fetch';

export const userLogin = (params) => {
  return fetch({
    method: 'post',
    url: '/api/user/login',
    data: params
  });
};
export const userLogOut = () => {
  return fetch({
    method: 'get',
    url: '/api/user/logout'
  });
};

export const userRegister = (params) => {
  return fetch({
    method: 'post',
    url: '/api/user/createUser',
    data: params
  });
};

export const getUserInfo = (params) => {
  return fetch({
    method: 'get',
    url: '/api/user/getUserInfo',
    params: params
  });
};

export const getTopicList = (params) => {
  return fetch({
    method: 'get',
    url: '/api/topic/getTopicList',
    params: params
  });
};

export const getChannelList = (params) => {
  return fetch({
    method: 'get',
    url: '/api/category/getCategoryList',
    params: params
  });
};