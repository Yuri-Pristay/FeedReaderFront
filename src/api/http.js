import axios from './axios';

const unauthorizedStatus = 401;
const getToken = () => localStorage.getItem('access-token');

const signOut = (props) => {
  localStorage.removeItem('access-token');
  props.history.push('/auth');
};

const get = (url, params) => {
  const request = axios.get(url, {
    params,
    headers: {
      'access-token': getToken(),
    },
  });

  request.catch((error) => {
    if (error.response.status === unauthorizedStatus) {
      localStorage.removeItem('access-token');
    }
  });

  return request;
};

const post = (url, params) => {
  const request = axios.post(url, params, {
    headers: {
      'access-token': getToken(),
    }
  });

  request.catch((error) => {
    if (error.response.status === unauthorizedStatus) {
      localStorage.removeItem('access-token');
    }
  });

  return request;
};


const put = (url, params) => {
  const request = axios.put(url, params, {
    headers: {
      'access-token': getToken(),
    }
  });

  request.catch((error) => {
    if (error.response.status === unauthorizedStatus) {
      localStorage.removeItem('access-token');
    }
  });

  return request;
};

const del = (url, params) => {
  const request = axios.delete(url, {
    headers: {
      'access-token': getToken(),
    },
    data: params
  });

  request.catch((error) => {
    if (error.response.status === unauthorizedStatus) {
      localStorage.removeItem('access-token');
    }
  });

  return request;
};

export default {
  get,
  post,
  put,
  delete: del,
  getToken,
  signOut
};
