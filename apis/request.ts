import axios from 'axios';
import Router from 'next/router';
import { StoreKey } from 'types/index';

// 원래는 아래와 같이 사용 가능했지만,
// const { NEXT_PUBLIC_BACKEND_API, HOST } = process.env;
// next 파일이 아닌곳에서 사용할경우 아래와 같이 명시해주어야함.
// const NEXT_PUBLIC_BACKEND_API = process.env.NEXT_PUBLIC_BACKEND_API;
// const HOST = process.env.HOST;

const request = axios.create({
  baseURL: '/',
  headers: {
    ajax: true,
    dataType: 'json',
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json; charset=UTF-8;',
  },
  // TODO: 추후 확인
  // withCredentials: true,
  // paramsSerializer: (params) => qs.stringify(params),
});

// 요청 인터셉터
request.interceptors.request.use(
  (config: any) => {
    console.log('-------------INTERCEPTOR-REQUEST 시작-------------');
    console.log('- CONFIG : ', config);
    console.log('- CONFIG URL : ', config.url);
    console.log('- CONFIG DATA : ', config.data);

    // ssr에서 세션 스토리지를 사용할수 없기때문에 추가
    if (typeof window !== 'undefined') {
      const user = sessionStorage.getItem(StoreKey.USER);
      const userObject = user && JSON.parse(user);
      const token = userObject?.token;
      const custmrId = userObject?.custmrId;

      // 최초 세팅시에는 header를 넣지 않는다.
      if (config.url === '/api/member/sign') {
        console.log('최초 세팅 config.url === /api/member/sign');
        return config;
      }

      // 최초 세팅이 아닌데, token이 없을경우 인증안됨 페이지로 이동시킨다.
      if (token === null || token === undefined || token === '') {
        console.log('비정상 페이지 이동');
        console.log('token === 공백 || token === undefined');
        Router.push('/not-authorized');
        return;
      }
      console.log('INTERCEPTOR REQUEST : 최초세팅아니고 토큰 있을경우');
      // 최초 세팅이 아니고, token이 있을경우 헤더에 token을 넣는다.
      config.headers['token'] = token;
      config.headers['custmrId'] = custmrId;
      console.log('-------------INTERCEPTOR-REQUEST 끝-------------');
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
    console.log('-------------INTERCEPTOR-RESPONSE 시작-------------');
    console.log('- RESPONSE : ', response);

    if (response.config.url === '/api/member/sign') {
      console.log('최초 세팅 config.url === /api/member/sign');
      return response;
    }

    if (
      typeof response.data.result === 'string' &&
      response.data.result === 'expiredError'
    ) {
      console.log('interceptors response 비정상 페이지 이동');
      Router.push('/not-authorized');
      return;
    }

    const user = sessionStorage.getItem(StoreKey.USER);
    const userObject = user && JSON.parse(user);
    const setUserString = JSON.stringify({
      ...userObject,
      token: response.data.token,
    });

    console.log('sessionStorage user 갱신');
    sessionStorage.setItem(StoreKey.USER, setUserString);

    console.log('-------------INTERCEPTOR-RESPONSE 끝-------------');
    return response;
  },
  (error) => {
    // 로그인 오류시에는
    if (error.config.url === '/api/member/sign') return { data: null };
    return Promise.reject(error);
  }
);

export default request;
