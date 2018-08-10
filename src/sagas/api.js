import axios from 'axios';
import { BASE_URL } from '../actions/constants';

export const api = axios.create({
  timeout: 5000,
  baseURL: BASE_URL,
  headers: { 'content-type': 'application/json' },
});

export const apiMultiPart = axios.create({
  timeout: 5000,
  baseURL: BASE_URL,
  headers: { 'content-type': 'multipart/form-data' },
});
