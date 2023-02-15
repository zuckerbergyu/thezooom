# 삼성 브랜드관 웬 프론트엔드

![Code style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)

React, Next.js, TypeScript, ReactQuery, MUI5

## 인덱스

- [참고할 링크 및 문서](#참고할-링크-및-문서)
- [설치](#설치)
- [개발 실행](#개발-실행)
- [개발(로컬IP) 실행](#개발(로컬IP)-실행)
- [배포 실행](#배포-실행)
- [환경 변수](#환경-변수)
- [파일 구조 원칙](#파일-구조-원칙)

### 참고할 링크 및 문서

- [React](https://ko.reactjs.org/docs/getting-started.html)
- [Next.JS](https://nextjs.org/docs)
- [MUIv5](https://mui.com/material-ui/react-autocomplete/)
- [thezoooom_api_연동_정의서]()

### 설치

1.  Node.js 설치 (* 2022.10 기준 npm 버전 16.18.0 사용 요망)

2.  글로벌 라이브러리 설치 (npm i -g pm2 cross-env)

3.  클론 및 라이브러리 설치

```sh
git clone https://gitlab.thezooom.kr/the_zooom/thezooom.git
cd thezooom-front
cd react
npm i
```


### 개발 실행

```sh
npm run dev
```

```sh
// 개발중 실험용으로 추가(사용x)
npm run dev:test
```


### 개발(로컬IP) 실행

1. /env/.env 파일 오픈

2. HOST의 값 중 'localhost'를 PC로컬 IP로 수정

3. 로컬IP 테스트가 끝나면 **원래 값으로 되돌리기.**

예시)

```sh
HOST=http://localhost:8080
```

를 아래와 같이 수정(예시)

```sh
HOST=http://172.0.1.31:8080
```

### 배포 실행


```sh
npm run build
npm start
```
[static html export](https://nextjs.org/docs/advanced-features/static-html-export)
```sh
npm run export:static
```


### 환경 변수

env 폴더 안에 환경 변수 설정 파일
- .env : 로컬
- .env.staging : 개발
- .env.production : 운영

### 파일 구조 원칙

#### 구조

```sh
/api - 전역 사용 api
/components - 전역 사용 컴포넌트
/constants - 전역으로 사용되는 상수
/contexts - React의 Context (전역으로 render에 영향을 줌 ex. Dialog)
/env - 환경 변수
/libs - 라이브러리
/mock - 개발 및 테스트용 목업 샘플 파일
/pages - 페이지 기본 설정, URL path를 설정하는 역할
/public - static 파일
/types -  타입 모음(추후 기능별 분리 가능)
/.eslintrc.json - eslint 설정
/.gitignore - 깃 설정
/.prettierrc - prettier 설정
/next.config.js - next.js 설정
/package.json - node.js 패키지 관리자
/tsconfig.json - VS CODE용 설정
/server.js - 서버 파일(개발중 테스트용 사용x)
```

#### 구조 설명

```sh
/components - 모든 곳에서 불러올 수 있는 컴포넌트
/api - 모든 곳에서 불러올 수 있는 api
/pages
  /mypage
    /index.page.tsx
    /_comps - my-page/* 에서만 불러올 수 있는 컴포넌트
      /AddressItem
        /index.tsx
      ...  
  /goods
...
```
- 다른 pages에 있는 것은 로드 불가
  - 예
    - /goods 안에서 /mypage 안에 있는 것들은 로드 불가
    - 항상 하위 뎁스에서만 로드 가능
- /components, /api에 있는 것은 모든 곳에서 로드 가능
- components는 pages 안에선 \_comps라는 명칭 사용 (역할은 같다. api도 마찬가지.)
- 언더바는 path 구조와 다른 성격임을 명시하기 위함 + 폴더 맨 위에 있게 하기 위함

#### 주의 사항

**components와 pages 안의 트리 구조**가 **유지보수 용이성의 핵심**
(쉽게 파악하고 쉽게 지우고 쉽게 추가)

전역으로 사용되는 소스엔 꼭 **"전역"** 으로 사용되는 것만 넣어야 한다.

전역적 사용이란 **2개 이상의 components, pages에서 사용**되는 것이다.

위의 **아닌 것**의 경우에선 다음과 같이 구조를 만든다.

- /pages/order/\_comps : components의 경우

라이브러리(libs)나 상수(constants)와 같은 경우, pages 또는 componenets 내부에서 따로 분리할 상황은 거의 없음

꼭 별도로 분리하는 것이 필요하다면 \_libs나 \_constants로 관리
(ex. goods/\_libs, member/\_constants)

- 전역적 사용에서 주로 주의할 폴더
  - /apis
  - /components
  - /libs
  - /constants

**두개 이상에서 사용되지 않을 경우 반드시 내부로 옮겨주면 좋다.**
(한번놓치면 나중에 다 확인해야하고 수정하기 어렵기 때문)

#### Router, Link 사용 방법
1. 기본  
   router.push('/ab');  
   router.push('/ab?name=abc');  
   router.push('/ab', { query: { name: 'abc' }})  
   router.push({ pathname: '/ab', query: { name: 'abc' }})

   <Link href="/ab">  
   <Link href="/ab?name=abc">  
   <Link href={{ pathname: "/ab", query: { name: "abc" } }}>

2. dynamic (path가 동적으로 생성)  
   router.push('/post/[pid]', '/post/abc')  
   router.push({ pathname: '/post/[pid]' }, '/post/abc')  
   router.push({ pathname: '/post/[pid]', query: { name: "ttt" } }, '/post/abc?name="ttt"')

   <Link href="/post/[pid]" as="/post/abc">  
   <Link href={{ pathname: "/post/[pid]", query: { name: "ttt" } }} as="/post/abc">
