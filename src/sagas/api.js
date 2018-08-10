import axios from 'axios';

export default axios.create({
  timeout: 5000,
  baseURL: 'http://demo0532724.mockable.io',
  // baseURL: 'http://54.200.158.0/MyanmarClubAPI',
  headers: { 'content-type': 'application/json' },
});
