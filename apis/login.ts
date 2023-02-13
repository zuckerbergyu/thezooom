import { useQuery } from 'react-query';
import request from 'apis/request';

export interface LoginParams {
  memId: string; // TODO: 삭제예정
  custmrId: string | undefined;
}

export interface LoginCheckParams extends LoginParams {
  memHp: string;
}
// 브랜드 2차인증 api - 가입 여부 체크
export const useGetBrandLoginCheck = (params: LoginCheckParams) =>
  useQuery(
    ['useGetBrandLoginCheck', params.memId, params.custmrId, params.memHp],
    async () => {
      const { data } = await request.post('/api/login/joinCheck', params);
      return data;
    },
    {
      enabled: false,
    }
  );

export interface LoginNewPwParams extends LoginParams {
  memHp: string;
  memNewPwd: string;
}

// 브랜드 2차인증 api  - 신규 비밀번호 설정
export const useGetNewPwSubmit = (params: LoginNewPwParams) =>
  useQuery(
    [
      'useGetNewPwSubmit',
      params.memId,
      params.custmrId,
      params.memHp,
      params.memNewPwd,
    ],
    async () => {
      const { data } = await request.post('/api/login/changePwd', params);
      return data;
    },
    {
      enabled: false,
    }
  );

export interface GoLoginParams extends LoginParams {
  memPw: string;
}
// 브랜드 2차인증 api  - 기존 회원 로그인
export const useGetBrandLogin = (params: GoLoginParams) =>
  useQuery(
    ['useGetBrandLogin', params.memId, params.custmrId, params.memPw],
    async () => {
      const { data } = await request.post('/api/login/goLogin', params);
      return data;
    },
    {
      enabled: false,
    }
  );
