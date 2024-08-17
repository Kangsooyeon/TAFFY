<div align="center">
  <img src="https://i11e104.p.ssafy.io/assets/logo-lffS2w9j.png?raw=true"/>
  <br />
  <br />

  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> 
  <img src="https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=white"> 
  <img src="https://img.shields.io/badge/webrtc-333333?style=for-the-badge&logo=webrtc&logoColor=white">
<br />
  <img src="https://img.shields.io/badge/tensorflow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white">
  <img src="https://img.shields.io/badge/keras-D00000?style=for-the-badge&logo=keras&logoColor=white">
  <img src="https://img.shields.io/badge/opencv-5C3EE8?style=for-the-badge&logo=opencv&logoColor=white">
  <br />
  <img src="https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white"> 
  <img src="https://img.shields.io/badge/springsecurity-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white"> 
  <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white"> 
  <img src="https://img.shields.io/badge/redis-FF4438?style=for-the-badge&logo=redis&logoColor=white"> 
<br>
  <img src="https://img.shields.io/badge/nginx-009639?style=for-the-badge&logo=nginx&logoColor=white"> 
  <img src="https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white"> 
  <img src="https://img.shields.io/badge/jenkins-D24939?style=for-the-badge&logo=jenkins&logoColor=black"> 
  <img src="https://img.shields.io/badge/grafana-F46800?style=for-the-badge&logo=grafana&logoColor=black"> 
  <img src="https://img.shields.io/badge/prometheus-E6522C?style=for-the-badge&logo=prometheus&logoColor=black"> 
</div>
<br/ >

## 🥋 TAFFY
> **T**aekwondo **A**cademy **F**or **F**oreigner **Y**ou <br>
외국인들은 위한 태권도 교육 플랫폼
<div align="center">
  <img src="https://taffy104.s3.ap-northeast-2.amazonaws.com/readme/11%EA%B8%B0_%EA%B3%B5%ED%86%B5PJT_UCC_E104.gif?raw=true" width="100%"/>
</div>
<br />

## 🚩 목차
[1. 프로젝트 배경](#프로젝트-배경)

[2. 프로젝트 개요](#프로젝트-개요)

  - [프로젝트 기간](#프로젝트-기간)

  - [구성원](#구성원)

  - [기술 아키텍쳐](#기술-아키텍쳐)

  - [ERD 다이어그램](#erd-다이어그램)

  - [MOCK UP](#mock-up)

  - [포팅메뉴얼](#포팅메뉴얼)

  - [기능의 특장점](#기능의-특장점)

  - [기술의 차별점](#기술의-차별점)

[3. 주요 기능](#주요-기능)

  - [품새 교육](#품새-교육)

  - [품새 심사](#품새-심사)

  - [겨루기](#겨루기)

[4. 사용법](#사용법)

---
<a name="프로젝트-배경"></a>
## 🖼️ 프로젝트 배경
> 태권도는 특별한 장비 없이 접근할 수 있는 스포츠로, 덕분에 다양한 국가에서 올림픽 태권도 메달을 획득하여 태권도에 대한 관심이 높아지고 있습니다.

> 이러한 관심의 증가를 기회로 삼아, 태권도를 배우고 싶어하는 외국인들을 위해 언제 어디서나 태권도를 접할 수 있는 환경을 제공하고자 합니다.

<a name="프로젝트-개요"></a>
## 🐕 프로젝트 개요

<a name="프로젝트-기간"></a>
### 🗓️ 프로젝트 기간
> 2024.07.02(화) - 2024.08.15(목) <br>
기획 및 설계 : 2024.07.02. ~ 2024.07.12. (2주) <br>
개발 : 2024.07.15. ~ 2024.08.15. (5주)

<a name="구성원"></a>
### 👨‍👩‍👧‍👦 구성원
![teammember](https://taffy104.s3.ap-northeast-2.amazonaws.com/readme/team_member.png)

<a name="기술-아키텍쳐"></a>
### 🛠️ 기술 아키텍쳐
![architecture](https://taffy104.s3.ap-northeast-2.amazonaws.com/readme/architecture2.png)

<a name="erd-다이어그램"></a>
### 💾 ERD 다이어그램
![ERD](https://taffy104.s3.ap-northeast-2.amazonaws.com/readme/TAFFY_ERD.png)

<a name="mock-up"></a>
### 🧸 MOCK UP
> [TAFFY Figma](https://www.figma.com/proto/31a4ZFi5xrGGXsZLu8jLBb/TAFFY?page-id=212%3A353&node-id=334-1339&viewport=3344%2C1469%2C0.19&t=tPpbuzotJ6dNcJek-1&scaling=contain&content-scaling=fixed&starting-point-node-id=334%3A1339)

<a name="포팅메뉴얼"></a>
### 🛳️ 포팅메뉴얼
> [포팅 메뉴얼](https://www.notion.so/2ebec9e366d245b6ae146bde79212011)

<a name="기능의-특장점"></a>
### 기능의 특장점
1. 한/영 변환
- 글로벌 유저 타깃으로 한영 변환해 서비스 이용 가능

2. 품새 교육 및 심사
- media pipe를 통한 신체 관절 키포인트를 확인해 동작 정확도 판별
- 스테이지 별 품새 전체 및 개별 동작 교육 
- 사용자 동작을 인식해 스테이지 별 품새 심사 기능 

3. 겨루기
- OpenVidu와 AI 모션 인식을 통한 겨루기 게임
- 공격/수비 턴을 바꿔가며 태권도 동작을 활용해 게임 진행
- WebSocket을 이용한 상대방 초대 및 퀵 스타트 버튼으로 상대 유저와 겨루기 진행

4. 마이페이지
- 사용자가 성공한 품새 심사 스테이지 확인
- 닉네임 / 캐릭터 / 국적 변경
- 겨루기 승률 확인

<a name="기술의-차별점"></a>
### 기술의 차별점
1. OpenCV, mediapipe를 활용하여 Keras 모델을 통해 
직접 모션인식 AI 모델 제작

2. 웹 환경에서 AI 모델을 사용하기 위해 
tensorflow.js로 변환하여 모델 탑재

3. Openvidu와 AI 모델을 함께 사용하기 위해
CDN으로 제작하여 모델 사용

4. WebRTC를 활용하여 실시간 겨루기 대결 가능

---
<a name="주요-기능"></a>
## 🎈 주요 기능

<a name="품새-교육"></a>
###  🌏 다국어 지원
> 전세계인의 태권도 접근성을 위해 한국어, 영어 등 다국어 기능 지원, 더 많은 언어 추가예정
![다국어](https://taffy104.s3.ap-northeast-2.amazonaws.com/readme/%ED%95%9C%EC%98%81%EB%B3%80%ED%99%98.gif)

<a name="품새-교육"></a>
### 👨‍🎓 품새 교육
> 학습된 AI모델 품새의 개별 동작과 전체 동작을 학습할 수 있습니다. <br><br>
**개별 동작 교육**
![동작교육](https://taffy104.s3.ap-northeast-2.amazonaws.com/readme/%EB%8F%99%EC%9E%91%EA%B5%90%EC%9C%A1.gif)
<br><br>**전체 동작 교육**
![전체동작](https://taffy104.s3.ap-northeast-2.amazonaws.com/readme/%EC%A0%84%EC%B2%B4%EA%B5%90%EC%9C%A1.gif)

<a name="품새-심사"></a>
### 💯 품새 심사
> 품새 교육에서 임의의 품새의 전체 교육을 성공하면 해당 품새를 심사 받을 수 있습니다. 심사를 통과하면 해당 품새에 해당하는 띠를 얻을 수 있습니다.
![품새심사](https://taffy104.s3.ap-northeast-2.amazonaws.com/readme/%ED%92%88%EC%83%88%EC%8B%9C%ED%97%98.gif)

<a name="겨루기"></a>
### 🏆 겨루기
> 다른 유저와의 화상통신을 통해, 주어진 동작을 먼저 정확하게 수행하여 겨룹니다.

>**퀵 스타트**
![퀵스타트](https://taffy104.s3.ap-northeast-2.amazonaws.com/readme/%ED%80%B5%EC%8A%A4%ED%83%80%ED%8A%B8.gif)<br>

>**초대 기능**
![초대기능](https://taffy104.s3.ap-northeast-2.amazonaws.com/readme/%EC%B4%88%EB%8C%80%EA%B8%B0%EB%8A%A5.gif)

>****겨루기 진행 및 결과****
![겨루기](https://taffy104.s3.ap-northeast-2.amazonaws.com/readme/%EA%B2%A8%EB%A3%A8%EA%B8%B0+%EC%A7%84%ED%96%89+%EB%B0%8F+%EA%B2%B0%EA%B3%BC.gif)

<a name="사용법"></a>
### **마이페이지**
![마이페이지](https://taffy104.s3.ap-northeast-2.amazonaws.com/readme/%EB%A7%88%EC%9D%B4%ED%8E%98%EC%9D%B4%EC%A7%80.gif)

---

## ❓ 사용법
> 준비물 <br>
웹캠이 탑재된 노트북 또는 웹캠이 연결된 데스크탑

### **TAFFY 사이트로 [이동](https://i11e104.p.ssafy.io/)**
