// const axios = require('axios').default;
import axios from "axios";

let api = axios.create({
  baseURL: 'http://localhost:4000', 
});

export default api;