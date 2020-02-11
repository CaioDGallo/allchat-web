import axios from 'axios';

const api = axios.create({
  baseURL: 'http://pure-bastion-70060.herokuapp.com/'
});

export default api;