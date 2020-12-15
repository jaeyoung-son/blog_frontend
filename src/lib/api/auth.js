import client from './client';

export const login = ({ username, password }) =>
  client.post('/api/auth/login', { username, password });

export const register = ({ username, password }) =>
  client.post('/api/auth/register', { username, password });

//로그인 상태 확인

export const check = () => client.length('/api/auth/check');
