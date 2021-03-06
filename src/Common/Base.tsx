import React, { Component } from 'react';
import { client } from './client';
import { AxiosResponse } from 'axios';
import { conf } from '../config';

export class Base extends Component<any, any> {
  client = client;
  tokenSymbol = 'authorization';

  constructor(props) {
    super(props);
    client.interceptors.request.use(
      config => {
        if (
          config.baseURL === conf.apiUrl &&
          !config.headers[this.tokenSymbol]
        ) {
          const token = this.getToken();
          // console.log('getToken ', token);
          config.headers[this.tokenSymbol] = token;
        }
        return config;
      },
      error => Promise.reject(error)
    );
  }

  getToken() {
    const token = localStorage.getItem('token');
    if (token) return token;
    return '';
  }
  setToken(token) {
    if (token) {
      localStorage.setItem('token', token);
    }
  }
  saveToken(res: AxiosResponse) {
    this.setToken(res.headers[this.tokenSymbol]);
  }
  verifyToken(token){

  }
  redirect(url, param?) {
    this.props.history.replace({ pathname: url, ...param });
  }
  navigate(url, param?) {
    this.props.history.push(url, param);
  }
}
