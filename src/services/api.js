import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/'
});

// const api = axios.create({
//   baseURL: 'https://pure-bastion-70060.herokuapp.com/'
// });

export default api;