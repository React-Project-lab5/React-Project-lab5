# <img src="/public/assets/logo.svg" alt="로고"/> 밥조

## 📌 프로젝트명 : 슬기로운 N밥생활

## 📌 배포 링크

https://calkolab5.web.app

## 📌 팀원 소개

|김서현 ( 조장 ) |김대웅|변혜빈|빈운기|원다함|
|------|---|---|---|---|
|<a href="https://github.com/seoohyeon"><img src="https://avatars.githubusercontent.com/u/38703262?v=4" width="150"/></a>|<a href="https://github.com/CALKO9611"><img src="https://avatars.githubusercontent.com/u/89835647?v=4" width="150"/></a>|<a href="https://github.com/HYBEN09"><img src="https://avatars.githubusercontent.com/u/104710243?v=4" width="150"/></a>|<a href="https://github.com/binwoonki"><img src="https://avatars.githubusercontent.com/u/119389337?v=4" width="150"/></a>|<a href="https://github.com/DahamWeon"><img src="https://avatars.githubusercontent.com/u/78182200?v=4" width="150"/></a>
|-모임카드 생성,삭제|-개인정보 수정,삭제|-로그인,회원가입|-지도 API 연동|-소셜로그인 연동|
|-제목 검색 기능  |-이미지 업로드 |-채팅 일부 구현|-UI 및 반응형 구현|-UI 및 반응형 구현|

## 📌 프로젝트 기간

2023.03.09 ~ 2023.03.28

## 📌 서비스 주제

하나의 음식점에서 같이 음식을 시킬 사람들을 모집하여,  
각자 원하는 음식만큼만 시켜먹을 수 있는 “장”을 만들어주는 앱 개발

## 📌 서비스 목적 및 필요한 이유

음식물 낭비를 막고, 과소비를 지양하는 현대인들의 니즈를 담음.


## 📌 기능
** 로그인 되어야 서비스를 이용할 수 있는 형태의 앱 **
  
  
### [로그인 페이지]  
- 로그인 후 Firebase Authentication, fireStore에 계정이 등록됨  
1.구글 로그인  
2.카카오 로그인  
3.이메일 회원가입 및 로그인  
4.게스트 로그인(Read only)  


### [메인 페이지]   
- 검색 기능 : 지역 선택 후 제목 검색 OR 제목만 검색 가능.  
- 모임 만들기(Create) : Firebase fireStore에 title, address, detail-address, mapData, date 정보 저장됨. 
                       로그인 한 사용자 정보 출력됨.
- 모임 카드 읽기(Read) : Firebase fireStore에서 정보를 읽어온 뒤 랜더링.  
- 모임 카드 삭제(Delete) : Firebase fireStore에 저장된 정보 삭제 및 UI 사라짐.  
- 채팅하기 버튼 : 채팅페이지로 navigate됨.  


### [추천 페이지]  
- Open API를 이용한 음식점 추천 정보 카드형식으로 랜더링  
- 페이지네이션 기능  
- top 버튼  


### [채팅 페이지]  
- 텍스트 입력 및 이미지 업로드 가능 -> Firebase fireStore에 대화내용 저장됨.
- 로그인 사용자의 정보가 뜸.
- 대화하는 사용자(가입된 사용자) 검색 가능.  


### [마이페이지]  
- 프로필 이미지 변경하기 및 정보 저장
- '회원정보수정' 버튼 클릭 후 정보 수정(Update) -> Firebase fireStore에 저장.
- 로그아웃 기능 -> Firebase에서 제공해주는 signOut() 호출하여 계정 로그아웃.  
- 회원탈퇴 기능 -> Firebase Authentication, fireStore에 저장되었던 계정이 삭제됨.  

## 📌 기술 스택

<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white">

<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">

<img src="https://img.shields.io/badge/Recoil-764ABC?style=for-the-badge&logo=recoil&logoColor=white%22%3E">
<br/>

<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">

<img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white">

<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white">
<br/>

<img src="https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white">

<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">

<img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white">

- 기술 선정 이유 : TypeSrcipt를 통해 타입을 명시해주어 타입오류를 최소화함.  
                  SASS를 통해 간편한 문법을 사용.  
                  recoil을 통해 전체적인 상태를 쉽게 관리함.

## 📌 프로젝트 구조도
### Wireframe
![스크린샷 2023-03-09 오후 4 50 1](https://user-images.githubusercontent.com/38703262/228298987-b22c2831-096e-4f8a-a9fc-30ae4d94609e.svg)
### User-flow
![wire-frame](https://user-images.githubusercontent.com/38703262/228298919-ab738c9f-075a-42b4-8995-4fd31711e729.png)


## 📌 피그마 시안
https://www.figma.com/file/78ArGQnn3tfp7cCzDlBA1j/%EB%B0%A5%EC%A1%B0?node-id=2%3A11993&t=dyXzkIauGbbrnTfe-1]
![홈](https://user-images.githubusercontent.com/38703262/228294447-5dc39fc2-22c3-401c-af61-a9fed24fb229.png)
![Group 39507](https://user-images.githubusercontent.com/38703262/228295423-d1c8161b-d522-42e7-ae22-ac283b29a661.png)
![Group 39506](https://user-images.githubusercontent.com/38703262/228294956-daed9f95-c6bd-47fc-8300-9a1ffc14cef6.png)
![채팅](https://user-images.githubusercontent.com/38703262/228294598-83c4d108-4fcb-40a9-a7e2-c1e2cc3d6c71.png)
![마이페이지](https://user-images.githubusercontent.com/38703262/228294661-e51afdbd-5eab-45b5-acc3-17b5d61ea502.png)
![Group 39505](https://user-images.githubusercontent.com/38703262/228294692-4f4b5f0a-96d5-434d-8c67-8ff2e678ef35.png)
![Group 39508](https://user-images.githubusercontent.com/38703262/228295495-e3d75716-d453-4721-bdf2-8641ff849eb1.png)


## 📌 페이지별 화면

### [로그인 페이지]  
### 1.구글 로그인  
![로그인페이지-구글-로그인-시연-영상](https://user-images.githubusercontent.com/38703262/228307803-1f5e83f1-c1be-4076-9372-19508a6769a6.gif)
### 2.카카오 로그인  
![로그인페이지-카카오-로그인-시연-영상_1](https://user-images.githubusercontent.com/38703262/228307849-3961d240-99bc-4349-ae9a-95cc66a6d612.gif)
### 3.이메일 회원가입 및 로그인  
![로그인페이지-이메일-회원가입시연-영상_1](https://user-images.githubusercontent.com/38703262/228307907-adb011df-4588-4881-828e-e97efebcc9c6.gif)
![로그인페이지-이메일 로그인](https://user-images.githubusercontent.com/38703262/228308073-a04a4784-8fac-4e2b-9cf7-dd6dd4ec1c59.gif)
### 4.게스트 로그인(Read only)  
![로그인페이지-게스트 로그인](https://user-images.githubusercontent.com/38703262/228308164-4c45e696-7a28-40dc-90b8-c9cb9de5f6e7.gif)


### [메인 페이지]   
### 검색 기능
![메인페이지검색1](https://user-images.githubusercontent.com/38703262/228313316-a83023d2-73ec-4c28-a25a-3956122caef7.gif)
![메인페이지검색2](https://user-images.githubusercontent.com/38703262/228313346-629d4ea7-f09e-4f1f-a1bb-593c23e9e577.gif)

### 모임 만들기
![메인페이지-모임만들기](https://user-images.githubusercontent.com/38703262/228310868-9a763538-0e68-4235-9b9e-a1791ccfc95f.gif)
### 지역 선택 (지도 api)
![메인페이지-지역선택](https://user-images.githubusercontent.com/38703262/228311074-4f9597c1-dcdc-47e7-9d09-6b3b758cca14.gif)
### 모임 참여하기
![메인페이지-모임 참여하기](https://user-images.githubusercontent.com/38703262/228311353-15db76a3-2687-4973-944c-20b9b8aece29.gif)
### 모임 삭제하기
![메인페이지-모임 삭제하기](https://user-images.githubusercontent.com/38703262/228311381-83a18f3b-919e-4e74-8317-67893b959e0a.gif)


### [추천 페이지]  


### [채팅 페이지]  
![채팅1](https://user-images.githubusercontent.com/38703262/228312408-54ba8995-b984-4d7c-9674-c87ec5b26283.gif)
![채팅2](https://user-images.githubusercontent.com/38703262/228312395-5d04d8e7-b7ce-405d-aba2-a4a4a54907a0.gif)


### [마이페이지]  
### 프로필 이미지 변경
![마이페이지-프로필사진 변경](https://user-images.githubusercontent.com/38703262/228312555-2de544ea-177f-4414-b600-2fb36b158888.gif)
### 회원정보 수정
![마이페이지-회원정보수정](https://user-images.githubusercontent.com/38703262/228312561-7b6cec60-f4c4-4176-a9f3-7de78f301568.gif)
### 회원탈퇴 및 로그인 실패
![마이페이지-회원탈퇴-로그인-실패](https://user-images.githubusercontent.com/38703262/228312565-fea1f348-8714-4337-aef2-0f04ec962c2e.gif)


