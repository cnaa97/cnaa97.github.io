---
title: 마이크로 프론트엔드
slug: microfrontend
tags: 
  - frontend
---

프론트엔드를 작게 만드는 마이크로프론트엔드에 대한 생각과 가야 할 방향

<!-- truncate -->

## 마이크로서비스? 마이크로프론트엔드? 
마이크로프론트엔드 컨셉은 몇 년 전부터 알고 있던 컨셉이다. 

프론트엔드의 기술은 대부분 백엔드에서 무언가가 나오면 
살짝 비슷한 개념이 프론트엔드 쪽으로 넘어오는데, 웹소켓과 같은 기술이 그렇다. 

마이크로프론트엔드라는 네이밍 역시 마이크로서비스에서 가져온 것으로 추측된다. 
백엔드에 인증, 권한, 알림, 비즈니스 등이 여러 요소가 하나의 형상으로 통합된, 
모놀리스 구조로 되어있다면, 이는 **부분이 전체에 영향을 주는 위험한 구조**가 된다. 

작은 비즈니스 로직 하나 때문에 전체가 영향을 받는다면 안정성에 위험이 되니,
아무리 로드밸런싱을 해두어도 문제가 생길 수 있다.
그래서 서비스 별로 분리하고, DB도 기능별로 쪼갠다. 

백엔드에서는 TCP/IP 기반 통신으로 각 서비스를 디커플링 할 수가 있다.
장애 발생 시 독립적으로 루즈 커플링되어있기 때문에, 
메시지 통신을 하던, HTTP를 쓰던, 부분에만 장애가 생기고,
오케스트레이션을 이용하면 그것 조차도 발생했는지도 모르고 지나갈 수 있다.

그래서 2010년대 초반에 넷플릭스에서 본격적으로 사용하고, 
우버 등 빅테크를 출두로 세계로 퍼져나갔다.


## 그래서 마이크로프론트엔드가 뭔데?
프론트엔드 서비스가 비대해지면 항상 반복되는 패턴으로 흘러가는데,
서비스가 망하거나, 유지보수를 안하거나, 서비스를 새 프레임워크로 갈아엎거나...
아니면 큰 조직 또는 서비스중인 코드를 관리하기 위해 뭔가 더 하거나.

리액트 코드가 서비스가 많아졌다고 치자. 
일단 빌드부터 느려진다. 트랜스파일링 시간도 오래 걸리고, 
폴리필 같은것들이 한 두개 추가된다면 더 오래걸린다.
여러 팀이나 구성원이 한 번에 같은 소스를 작업한다고 치자. 
의존성이나 충돌 등 모놀리식으로 구성된 것은 점점 위험해 노출된다.
코드 일부가 잘못되면 전체에 영향을 줄 수도 있다. 
(물론 에러 캐치같은 수단이 있긴 하지만... 개발/관리 비용을 줄여주진 않는다.)

마이크로프론트엔드의 목표도 백엔드의 마이크로서비스와 비슷하다.
화면을 구성하는 코드나 서비스를 **어떤 방법을 써서 분리하고, 격리시키고,** 
**위험 요소와 개발 비용을 줄이고, 랜더링된 결과물을 이용해 사용자에게 가치를 주는 것**이다.

그렇다면 쪼개서 유지관리, 운영하는건 쉬울까?
마이크로서비스만 하더라도, 첫 시작이 너무 복잡하다. 
프론트도 마찬가지로 보인다. 처음부터 마이크로아키텍처로 가기엔 초기 비용이 크게 든다. 


## 3년 전 생각하던 마이크로프론트엔드
커머스 회사에서 프론트엔드 개발자로 일하던 시절, 
내가 속했던 팀은 제품 단위가 아니라, 기능 단위로 조직이 나누어져 있었다.

내가 발의했던 아이디어는 아래와 같았다.
프론트엔드 제품이 많아지는 상황에서 유틸도 각자 프로젝트에 있고
Vue, React 프레임워크에 관련없이 동일하게 서비스하고 싶다. 

그래서 그때의 방향은 모노레포였다. 
서비스 별 레파지토리의 분할, 그리고 중복되는 부분은 통합하는 방향이었다.

## 마이크로프론트엔드 종류
마이크로프론트엔드의 구현에는 여러가지 수단이 있다.
하나 하나씩 간단히 살펴 보자.

### 모노레포 (빌드 타임 통합)	
모던 프론트엔드는 항상 빌드(트랜스파일링)을 한다. 그래서 말 그대로 여러 레파지토리를 빌드하는 타이밍에 합치는 것이다. 그런데 조금 번거로워 보인다. 마이크로서비스 아키텍처로 보면, 인증서비스 하나 바꿨는데 비즈니스로직 등등 모든 것을 다시 배포해야한다는 뜻이다. 커플드되어있기 때문에 적합하지 않다. 

### Module Federation
Module Federation은 말그대로 모듈을 연방처럼 통합한다는 것인데, 최근 웹팩이나 다른 플러그인을 봐도 어쩔 수 없이 빌드타임 문제가 있다. 빌드하는 시점에 통합한다. 

### 런타임 통합
주로 웹컴포넌트같은 도구로 접근하는 방법이다. 각 뷰의 요소를 쪼개고, 화면에서 레이지로드처럼 통합한다. 나름 일리가 있다. 웹표준이기도 하니깐. 그런데 업무에서는 항상 간단한 Todo같은 앱을 만들지는 않으니깐 복잡해지면 외부 모듈 사용이 조금 어렵다. 

### 서버사이드
서버단에서 템플릿을 이용해서 랜더링할 수도 있다. 결국 MPA이 되는건데, 좀 더 나가면 리액트19나 nextjs같이 서버랜더링으로 연결된다. 그런데 서버사이드랜더링에는 조금 회의적이다. 하이드레이션을 해주어야 하는 과정이 달갑지 않다. nextjs도 빌드를 항상 해야하니깐 차라리 템플릿이 더 낫다는 생각도 든다.

### iframe
아름답지는 않지만 html iframe을 이용해서 나누는것도 방법이다. 차라리 이게 더 깔끔해보인다. 완벽하게 분리할수도 있으니깐. 그런데 코드 레벨로 자세히 보자면 한계는 보인다. 컴포넌트 간 통신이나 상태 공유가 문제가 될 것 같다. 

## 내 목표는?
지난 2주 동안 마이크로프론트엔드에 대해서 살펴보았지만, 마음에 드는 디자인의 아키텍처는 없었다. 

프론트엔드의 목적으로 다시 돌아가보자.
프론트엔드의 목적은 웹에이전트를 통해 시각적인 요소를 보여주는데 있고,
인터렉티브 요소, 통신을 결합해 더 풍부한 콘텐츠를 사용자에게 전달한다.

그걸 서비스하는 개발자는 적은 비용으로 더 많이 생산해야 한다.
마이크로프론트엔드가 위 두 목적에 잘 맞을까?

프로토타이핑을 여러번 해보면서 이게 도입되었을 미래 모습을 상상 했을 떄,
뭔가 다 번거롭고 불편하다. 

내가 현 시점에서 생각하는 아름다운 디자인은 이렇다.

누구나 리액트 샘플코드 한번쯤은 실행해봤을거다.
새로고침없이 fase-refresh도 잘 되고, 로컬 서버도 띄워주고 좋은 개발자 경험을 준다. 
이렇게 쉽게 접근할 수 있는 도구였으면 좋겠다. 

그런데 앱이 복잡해 지더라도, 동일한 개발경험을 했으면 좋겠다.

서버사이드의 페이지 별 endpoint 단위로 형상이 분리되어야 하고, 개별 배포가 가능해야 한다.  
예를들어 나는 메인페이지를 개발하고, 다른 팀의 누구는 공지사항 페이지를 개발하되, 서로 영향을 주지 않으면서 배포를 할 수 있어야 한다.  

그리고 브라우저의 런타임통합도 되어야 한다. 
코드스플릿처럼 작동해야하는데, 어느 페이지에 들어갔는데, 어느 페이지에 어떤 컴포넌터를 랜더링할건지 설정을 불러와서 각 설정에 맞게 컴포넌트 모듈을 다운받는다. 
header.js, main.js, footer.js를 동적으로 다운받은 후 화면에 그려준다. 모듈 하나가 깨지더라도, 페이지 전체 장애가 나지 않아야 한다. 

여러가지 방향을 고민해보고 있고, 2025년에는 조금씩 도입해 아키텍처를 그려 나가려고 한다. 


