import axios from 'axios';

const baseURL = __DEV__
  ? 'http://192.168.0.15:1337'
  : 'http://192.168.0.15:1337';

const client = axios.create({baseURL});
export default client;

export function applyToken(jwt: string) {
  client.defaults.headers.Authorization = `Bearer ${jwt}`;
}
export function clearToken() {
  client.defaults.headers.Authorization = undefined;
}
