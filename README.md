# Readit

<center><img width="1032" alt="main-pic" src="https://user-images.githubusercontent.com/39963468/55375370-d28c6a00-5546-11e9-9c3c-40cc99125760.png"></center>

## Contents
- Introduction
- Feature
- Installation
- Usage
- Skills
- Things to do
- Deployment
- Sincere Thanks

### Introduction
- 카테고리 별 등록된 컨텐츠 리스트를 볼 수 있는 웹 애플리케이션. 로그인 시 등록을 원하는 컨텐츠 링크를 입력하면 해당 글의 리스트를 생성할 수 있음. 또한, 카테고리 별 글들의 태그 클라우드 정보를 확인할 수 있음.

### Features
- 카테고리 별 콘텐츠 리스트 조회.
- Google Oauth, Passport.js 이용한 로그인 기능.
- 블로그 글, 뉴스 기사, 유튜브 등 링크를 입력하면 해당 카테고리에 콘텐츠 리스트 생성.
- 유저가 좋아하는 콘텐츠 리스트에 '좋아요' 기능.
- 자신이 등록한 글 목록 확인.
- 카테고리에 속한 전체 포스팅의 태그 확인.
- 검색어 입력 시 관련 리스트 조회.

### Installation
<blockquote>
- git clone https://github.com/ChanwheKim/readdit.git<br/>
- cd readdit<br/>
- npm install<br/>
- npm start<br/>
</blockquote>

### Skills
- Javascript
- React
- Redux
- Node.js
- Express.js
- Passport.js
- Sass
- D3

### Challenge
- 유저가 새로운 리스트 등록을 위해 링크를 입력 시, HTML의 Header를 분석 및 데이터를 가져와 리스트를 생성했습니다. 각 사이트 별 Header에 포함된 내용이 상이해 폭 넓은 콘텐츠 글을 대응하는 것이 어려웠습니다.

### Things to do
- 링크 외에도, 애플리케이션 내에서 유저가 마크다운 에디터를 이용해 직접 글을 작성할 수 있는 기능.
- 인기도, 날짜 등으로 리스트 정렬해서 보기 기능.
- 각 콘텐츠 별 코멘트 기능.

### Deployment
- AWS Elastic Beanstalk & Circle CI

### Sincere Thanks
Ken Huh / Vanilla Coding
