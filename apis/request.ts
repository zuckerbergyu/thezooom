import axios from 'axios';
import Router from 'next/router';
import { StoreKey } from 'types/index';

const request = axios.create({
  baseURL: '/',
  headers: {
    ajax: true,
    dataType: 'json',
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json; charset=UTF-8;',
  },
});

// 요청 인터셉터
request.interceptors.request.use(
  (config: any) => {
    // ssr에서 세션 스토리지를 사용할수 없기때문에 추가
    if (typeof window !== 'undefined') {
      const user = sessionStorage.getItem(StoreKey.USER);
      const userObject = user && JSON.parse(user);
      const token = userObject?.token;
      const custmrId = userObject?.custmrId;

      // 최초 세팅시에는 header를 넣지 않는다.
      if (config.url === '/api/member/sign') return config;

      // 최초 세팅이 아닌데, token이 없을경우 인증안됨 페이지로 이동시킨다.
      if (token === null || token === undefined || token === '') {
        Router.push('/not-authorized');
        return;
      }

      // 최초 세팅이 아니고, token이 있을경우 헤더에 token을 넣는다.
      config.headers['token'] = token;
      config.headers['custmrId'] = custmrId;
      return config;
    }
    Router.push('/not-authorized');
    return;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
request.interceptors.response.use(
  (response: any) => {
    if (response.config.url === '/api/member/sign') return response;

    // 실패시 token값이 null로 와서 추가
    if (
      response.config.url === '/api/login/joinCheck' ||
      response.config.url === '/api/login/changePwd'
    )
      return response;

    if (
      typeof response.data.result === 'string' &&
      response.data.result === 'expiredError'
    ) {
      Router.push('/not-authorized');
      return;
    }

    const user = sessionStorage.getItem(StoreKey.USER);
    const userObject = user && JSON.parse(user);
    const setUserString = JSON.stringify({
      ...userObject,
      token: response.data.token,
    });

    sessionStorage.setItem(StoreKey.USER, setUserString);
    return response;
  },
  (error) => {
    if (error.config.url === '/api/member/sign') return { data: null };
    return Promise.reject(error);
  }
);

export default request;
