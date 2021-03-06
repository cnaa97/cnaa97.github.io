---
layout: post
title: "크리에이티브 코딩 익히기"
desc: 코딩을 이용한 디지털 아트 학습 과정
date:   2018-04-05
category: Project
img: /public/img/180405_02.png
comments: true
---


### 프로세싱 (processing) 과 p5

처음에는 [프로세싱 (Processing)](https://www.processing.org/){:target="_blank"}으로 시작했다. 프로세싱은 자바 기반이며, 누구나, 어느 환경에서든 쉽게 실행시킬 수 있도록 OS 별 IDE (에디터)도 제공하고 있다.

프로세싱에는 `setup`과 `draw` 라는 전역 함수가 있는데, 두 함수를 기본으로 그래픽이 그려진다. `setup`에서 기본적으로 화면에 필요한 기능을 초기화하고, 프레임에 따라 `draw` 함수가 끊임없이 실행된다.

프로세싱으로 기본 도형부터 시작해서 기하학적인 형태의 이미지를 만들어보았지만, 프로세싱 IDE는 불편했고 버그도 많았다. 다른 에디터에서 쓰던 단축키 등 다양한 기능에 제한이 있었다. 그러다가 프로세싱의 웹 버전인 p5를 알게 되었고, 사용하기 시작했다.

[p5](https://p5js.org){:target="_blank"} 웹에서 작동되는 방식이기 때문에 접근성이 높고, 진입장벽이 낮으며, 비교적 간단하다. 웹 브라우저만 있으면 실행시킬 수 있다는 말이다. 특히 다니엘 쉬프만과 같이 [좋은 유투브 강의](https://www.youtube.com/watch?v=8j0UDiN7my4){:target="_blank"}가 많았고, 사운드, 씨리얼 통신 등 필요한 라이브러리는 모두 갖추고 있었다. HTML 돔(DOM)을 함께 이용할 수 있는 것도 큰 장점이다. HTML 캔버스를 직접 사용하거나, iframe 을 사용해서 웹페이지에 그대로 넣을 수도 있다.

p5를 다루면서, 프로세싱에서 자바로 구현했던 코드를 p5로 바꾸었다. 자료형이나 약간 다른 함수명만 잘 파악해주면 쉽게 바꿀 수 있었다.


<iframe height="500" src="https://commoners.gitlab.io/feed/2018/03/29/segmented-circle.html"></iframe>


### 지킬(jekyll) 템플릿을 활용한 p5 개발 환경

p5의 새로운 프로젝트를 시작하기 위해서는 동일한 `index.html`에 라이브러리 스크립트를 불러오고, 스타일을 추가해야하고, 늘 같은 코드를 반복해서 카피해야만 했다. CLI로 p5 프로젝트를 생성할 수 있는 툴도 찾아봤지만, 결국 똑같은 코드를 카피하는 것일 뿐이었기에 마음에 들지 않았다.
나는 작업을 원활하게 하기 위해 정적 블로그 생성기 [jekyll](https://jekyllrb.com/){:target="_blank"} 을 이용해서 간단한 [페이지](https://commoners.gitlab.io){:target="_blank"}를 만들었고, p5로 작업한 결과물을 블로그 포스트를 하듯이 업로드 하게 되었다. (지속적으로 업데이트 중이다)

지킬은 특정 디렉토리에서 템플릿을 만들어 사용할 수 있는데, 의존성있는 라이브러리와 스타일을 정의해둔 템플릿을 만들어두고, 마크다운 대신에 html 파일을 기반으로 포스트를 작성할 수 있다. html 형식의 포스트에서는 p5 코드가 `<script></script>` 블럭에 포함되고, `jekyll build` 를 통해 생성된다.


### 다른 라이브러리와 함께 사용하기

웹 기반인 p5의 장점은 여러 웹용 라이브러리를 손쉽게 추가하고 사용할 수 있다는 것이다.

가장 유용한 툴은 [dat.GUI](https://github.com/dataarts/dat.gui){:target="_blank"}인데, 파라메트릭 디자인에서 형태를 만드는데 가장 중요한 파라미터 데이터를 쉽게 바꿔주는 툴이다. 참조형 타입인 자바스크립트의 오브젝트를 watch하면서 그려준다. [예제](https://commoners.gitlab.io/library/2018/03/29/dat-gui.html){:target="_blank"}는 여기서 확인할 수 있다.

![](/public/img/180322_face_tracking.gif)

다음은 [clmtrackr](https://github.com/auduno/clmtrackr){:target="_blank"} 얼굴을 인식하여, 모델 객체를 받을 수 있는 자바스크립트 라이브러리이다. p5의 카메라와 이미지를 함께 사용해서 재미있는 [인터렉션 작업](https://commoners.gitlab.io/feed/2018/03/12/face-tracking.html){:target="_blank"}을 할 수 있었다. [이 곳에서 직접 확인](https://commoners.gitlab.io/feed/2018/03/12/face-tracking.html){:target="_blank"}할 수 있다. (웹캠 필요)

하지만 위의 작업과 같이 카메라를 사용하거나 복잡한 형태를 그리게 되면 퍼포먼스에 문제가 드러난다. 브라우저의 성능이 끊임없이 발전되고 있지만, 확실히 아직까지는 무거운 작업에 적합하지 않다는 결론이다.


### 컴퓨테이셔널 디자인을 위해 필요한 지식

p5로 기하학 형태 그리면서 알게된 원리는 함수명만 다를 뿐, 구현 방식은 비슷하다는 것을 알게 되었다. 프로세싱, 오픈프레임웍스, 라이노, 그래스호퍼, 포토샵, 일러스트 모두 같은 원리로 기하 형태를 그린다. 어떻게 구현하는지가 문제가 아니라, 어떤 형태를 만드는지가 더 중요하다는 것이다. 더 매력적인 이미지를 만들기 위해서는 수학이 필수적이었다. 기하학적인 형태를 만들기 위해서는 수학적 지식을 기반으로 응용해야했다.

전에 [디자인과 수학](http://junojunho.com/design/design-and-math)이라는 글을 쓴 적도 있지만, 우리가 인지하지 못하는 곳에서 이미 수학적 지식이 사용되고 있다. 나는 다시 수학을 공부해야만 했다. 디지털 아트에 정말 필요한 수학 지식은 선형대수와 같이 벡터, 삼각 함수 정도가 있다.

물론 수학은 아티스트와 디자이너에게 꽤 큰 장벽이 될 수 밖에 없다는 생각이 든다. 하지만 기초가 되는 원리를 알지 못한다면, 알고리즘을 이용한 디지털 아트 작업, 파라메트릭 디자인, 제너레이티브 아트 모두 우연에 의해 생성되었다는 편견을 가질 수도 있다. 우연적인 방법으로 만들어진 형태로 보이는 자하 하디드의 DDP는 오히려 더 수학적으로 계산된 것이다.


### 오픈프레임웍스 (OpenFrameworks)

퍼포먼스 문제도 있지만, 이미지를 분석해서 사람의 동작이나 영상을 다룰 수 있는 OpenCV 와 같은 툴도 함께 다루어 보고 싶어서 [openFrameworks (오픈프레임웍스)](http://openframeworks.cc/){:target="_blank"}를 더 익히기로 했다. C++은 스크립트 언어인 자바스크립트보다 저수준의 언어이기 때문에 퍼포먼스가 좋기 때문에 게임 쪽에서 많이 이용된다. 언젠가 iOS 도 다루어보고 싶은데, 애플에서 나온 언어인 스위프트도 함께 사용 가능할 것 같다.


### 오픈프레임웍스, 본격적으로 익혀보기

일단 어떤 과정으로 어떤 것을 익혀야 하는지에 대한 방향을 설정했다.

1. 개발환경 구성
2. C++
	* 기본 문법
	* 자료구조
5. 공식 홈페이지
	* 문서 간단히 읽고 프로젝트 구조 파악
	* API 문서 보는 방법 익히기
4. E-Book
	* 따라해보기
	* 필요한 코드 메모

오픈프레임웍스는 어제부터 익히기 시작해서, 오늘 날짜로 이틀 되었다. 아직까지 C++ 문법이 쉽게 익숙해지지 않지만, 앞서 이야기했듯이, 기하학을 기반으로 형태를 그리는 것은 원리가 유사하다. 문법과 API가 익숙하지 않지만, 무언가를 만들 수는 있다. 여러 애드온도 붙여서 사용해봐야 하고, OpenCV, 아두이노 등과 연동해보려면 아직 해야할 것들이 꽤 남았다.

![](/public/img/180405_01.png)

p5로 구현했으면 꽤 버벅였을 이미지를 오픈프레임웍스로 작업해보았다. 각 포인트에 대한 컬러 값을 랜덤으로 생성하는데, 오픈프레임웍스에서는 확실히 퍼포먼스가 좋다. 물론 컴파일에 시간이 걸리고, xcode가 낯설지만, 안정적이다.


### 목표

크리에이티브 코딩을 제대로 시작한지 이제 막 한 달정도 되었고, 매일 조금씩 진행 중이다. 언제까지 해볼지는 잘 모르겠지만, 원하는 수준은 있다. 판매가 가능한 높은 수준의 결과물, 낯선 경험을 주는 결과물을 생산하고 싶다.

디지털 아트는 문제 해결을 위한 코딩이 아니기 때문에 어떤 면에서 굉장히 막연하다. 어느 시점에서 작업을 멈추어야 하는지도 헷갈린다. 매일 아무 생각없이 이것 저것 따라해보면, 항상 어떤 결과물이 만들어지는 것을 경험한다. 하지만 디자이너가 아닌, 개발자로 보낸 시간이 있기 때문에, 이상하게 더 기술적 지식이나 구현 방법에 매달리고 툴을 만들어보려는 아이디어에서 벗어나기 어렵기도 하다. 지금의 나는 형태의 구현보다, 무형의 가치와 판단되기 어려운 아름다움에 더 집중할 필요가 있다는 생각이 든다.

물론 이 작업을 하면서도 성장에 도움이 되는 방향으로 연결시켜야 한다. 그렇기 때문에 이런 글도 써보고 정리도 해본다. 수학을 아주 오래전에 접었던 내가 다시 공부를 해보면서, 크리에이티브 코딩을 할 때 필요한 수학적 지식을 정리해보고 있다. 언젠가 정리가 되면 공개할 생각이다.
