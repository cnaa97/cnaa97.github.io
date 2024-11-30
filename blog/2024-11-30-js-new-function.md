---
title: Javascript Function
slug: js-function
tags: 
  - javascript
  - frontend
---

요즘 내가 회사에서 서비스 하고있는 프론트엔드의 화두는 쪼개기이다. 
3년 동안 서비스를 조금씩 개발하다보니, 개발, 관리 비용을 증가했는데, 이를 줄이기 위해 백엔드, 프론트엔드 할 것 없이 여러가지 테스트를 해보고 있었다. 

마이크로 프론트엔드 (Micro Frontend)의 패턴 중 Javascript 런타임 통합을 테스트해보던 중, 함수를 생성자로 써보면서 되면서 함수에 대해 여러가지 학습한 내용을 정리했다.

<!-- truncate -->

## 자바스크립트가 유연해야 하는 이유
자바스크립트는 애초에 브라우저에서 돌아가는 언어로 시작되었다. 브라우저는 말 그대로 메모장과 같은 문서 뷰어인데, 
메모장 내부의 어떤 문제 때문에 내용 표시를 못한다면 문제가 되지 않겠는가? 그래서 타입도 엄격하지 않고 유연하다. 
브라우저 또한 다양한 벤더사에서 제작되었기 때문에, 언어 자체가 유연하게 설계되어야만 했다. 

## 자바스크립트에서의 함수
함수에는 선언식과 표현식이 있다. 선언식은 `function sum(a, b) { return a + b; }`이고, 표현식은 `const sum = (a, b) => a + b;` 처럼 변수에 함수 타입을 넣는 것이다. 

## 자바스크립트에서의 함수는 객체
자바스크립트에서의 함수(Function)는 객체인데, 함수를 정의한 변수(함수 이름)는 사실 함수가 위치한 메모리를 참조하는 포인터일 뿐이다. 코드로 이해해보자.

```js
const obj1 = { a: 1 };
const obj2 = obj1;
obj2.a = 2;
obj2.a === obj1.a; // true
```
위 코드에서 오브젝트 타입 `obj1`를 `obj2`에 할당헀는데, 참조된 주소가 할당되기 떄문에, obj2에서 값을 새로 정의했는데도 원본 또한 바뀌기 때문에 `true`가 된다.

함수 또한 객체이기 때문에 가능한 시나리오이다. 아래 코드를 보자
```js
var func = function() {return 'hi'};
func(); // 'hi'
var func2 = func;
func2.temp = () => 'hello';
func2.temp(); // 'hello'
func.temp();
```
위 객체의 예시와 동일하게 작동한다. 

## 객체지향의 의미
객체 지향은 왜 나왔을까? 정말 심플하게 보자면, 똑같은 코드를 반복해서 만들지 말자는 효율성에서 시작하지 않았을까. 
함수가 포인터를 동일하게 가져가는 것도, 같은 내용(함수)이면 함수가 가리키는(포인터) 원본 위치(메모리 주소)만 공유를 하고,
굳이 메모리를 많이 쓰지 말자는 것으로 봐도 될 것이다.

기능 단위로 쪼개고, 은닉하고, 상속받고, 이런 것들도 비용을 낭비 하지말자는 컨셉으로 봐야한다.
한정된 컴퓨팅 자원을 아끼고, 프로그래머의 시간을 아끼자는 것이다.

## new Function
실제 코드 문자열로 함수를 방법이 있다. `eval`이라는 문법인데, 보안에 상당히 위험하다. 
전역 함수인데 `eval('2 + 2')`처럼 문자열로 코드를 넣으면 실제 작동하는 코드가 된다. 
누군가가 eval 코드가 들어간 실행 콘텍스트를 낚아채서 다른 코드로 변환한다면, 사고이다. 

그래서 이것 보다는 보안에 그나마 나은 `new Function` 문법이 있는데, 생성자로 객체를 생성할 수 있다.

```js
const sum = new Function('a', 'b', 'return a + b');
```

## new Function 응용 - 동적 로딩
마이크로 프론트엔드 패턴 중 런타임에 코드를 통합해 실행하는 디자인이 있는데, 이를 간단히 개념 검증을 위해 함수를 생성자로 써보았다. 
아래 코드는 http 통신으로 js 파일을 문자열로 읽어와서 리액트 함수를 랜더링했던 코드이다. 

```js
// Header.js
var e = {};
Object.defineProperty(e, "__esModule", { value: true });
e.default = function () {
  return /*#__PURE__*/ React.createElement("div", null, "Header Component!");
};
```

```js
import * as React from "react";
...
fetch('/connectors/Header.js')
  .then((response) => {
    if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);
    return response.text();
  })
  .then((scriptText) => {
    const module = { exports: {} };
    const componentExport = new Function("module", "exports", "React", `${scriptText};e.default;`)(
      module,
      module.exports,
      React
    );
    // componentExport를 동적 컴포넌트로 정의 후 랜더링
  });
```

## 마무리
최근 실무를 하면서 프론트엔드 기술에 깊숙히 생각해볼 기회가 적었다. 
MSA 환경에서 Nodejs 서비스를 만드는 백엔드 일도 하고 Rust를 이용해 키오스크를 개발하기도 하고, 인프라까지 넘보면서 프론트엔드에는 조금 등한시했었다.

2025년에는 그동안 비대해진 클라이언트를 쪼개서 관리 비용을 줄이기 위해 마이크로프론트엔드 아키텍처를 도입할 예정인데, 프론트엔드에 좀 더 투자할 수 있지 않을까 한다.