import Axios from 'axios';

const instance = Axios.create({
  baseURL: 'http://localhost:4000',
  timeout: 3000,
  // headers: {},
});

export default instance;