import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://pure-bastion-70060.herokuapp.com/'
// });

const api = axios.create({
  baseURL: 'http://localhost:3000/'
});

export default api;