import axios from 'axios';

export default axios.create({
  timeout: 5000,
  baseURL: 'http://demo0532724.mockable.io',
  headers: { 'content-type': 'application/json' },
});
