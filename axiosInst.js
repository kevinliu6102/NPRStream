import axios from 'axios';

export const tokenAxios = axios.create();
tokenAxios.defaults.headers.common = {};

export const recommendAxios = axios.create();
