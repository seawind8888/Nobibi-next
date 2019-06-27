import fetch from '../utils/fetch';


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