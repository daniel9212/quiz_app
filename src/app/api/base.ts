import axios from 'axios';

const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '';

export async function request(url: string, {
  method = 'GET',
  ...config
}) {
  return axios({
    url: `${BASE_URL}${url}`,
    method,
    ...config
  });
}