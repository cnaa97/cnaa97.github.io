---
layout: post
title:  "Create-react-app Mobx, Router 환경 구성"
desc: "+ Webpack config eject 없이 환경 설정"
date:   2019-01-07
category: Front-end
comments: true
---

> 본 포스트는 리액트에 대한 약간의 지식을 요구한다.

## 목표

- `create-react-app`을 이용해 간단한 개발 환경 구성
  - 웹앱의 상태 관리를 위한 라이브러리 **react-mobx**
  - 라우팅를 위한 **react-router**
- 기본적인 React 웹앱의 구조 파악


## 기본 리액트 환경 구성

- npx를 사용해서 리액트 프로젝트를 생성해본다.
- 과거에는 주로 react-create-app을 글로벌로 설치해서 사용했으나, npx를 이용하면 글로벌 패키지로 설치하지 않고 일회성 명령을 실행할 수 있다.
- `create-react-app`을 이용해 web-app이라는 프로젝트를 생성한다.
- (nodejs가 설치되어 있어야 한다)

```bash
npx react-create-app web-app
```


## [Mobx](https://github.com/mobxjs/mobx)

- 리액트 SPA(Single Page Application)에서는 상태 관리를 위한 라이브러리로 주로 [Redux](https://redux.js.org/)를 사용한다.
- Mobx는 또 다른 상태관리 도구로, 정말 간단하게 상태를 관리할 수 있다.
- **[react-mobx](https://github.com/mobxjs/mobx-react)**를 이용하면 스토어의 상태가 변경될 때 뷰가 업데이트된다.
- 리덕스와 같은 보일러플레이트 코드를 사용하지 않기 위해 `decorator` 문법을 사용해야하는데, 추가 babel 설정이 필요하다.


## Mobx 패키지 설치

```bash
yarn add mobx react-mobx
```


## Mobx 데이터 구조

- 기본적으로 간단히 ES6 클래스와 ES7 데코레이터 문법을 이용해서 스토어를 생성한다.
- 아래 예시 코드는 간단한 view model과 관련된 데이터를 저장하는 클래스이다.
- 변수는 `observable`로 상태 변화 감지 시 리액트 뷰를 업데이트하고,
- 함수는 `action` 으로 정의되며, 리액트 내부에서 상태를 업데이트할 때 사용된다.


### 데코레이터를 사용하지 않고 정의하는 방법

```js
/* store/viewStore.js */
import { decorate, observable, action } from 'mobx';

class ViewStore {
  constructor() {
    this.isShowModal = false;
  }
  hideModal = () => {
    this.isShowModal = false;
  }
  showModal = () => {
    this.isShowModal = true;
  }
}

decorate(ViewStore, {
  isShowModal: observable,
  hideModal: action,
  showModal: action,
})

export default ViewStore
```

### 데코레이터를 사용한 스토어 정의

ES7 데코레이터를 사용하면 코드를 더욱 간단하게 처리할 수 있다.

```js
/* store/viewStore.js */
import { observable, action } from 'mobx';

class ViewStore {
  @observable isShowModal = false;

  @action hideModal = () => {
    this.isShowModal = false;
  }

  @action showModal = () => {
    this.isShowModal = true;
  }
}

export default new ViewStore();
```
```js
/* store/index.js */
import viewStore from './viewStore';

export default {
  viewStore,
}
```

### 스토어 추가

앱의 시작점이 되는 `index.js`에서 `Provider`를 이용해 `stores`를 전달한다.

```js
/* index.js */

import { Provider } from 'mobx-react';
import stores from './stores';

ReactDOM.render((
  <Provider {...stores}>
    <App />
  </Provider>
), document.getElementById('root'));
```

### Mobx Store의 사용

실제 스테이트를 사용할 컴포넌트에서 스토어를 주입하고, 상태 변화를 감지해서 화면을 업데이트한다.

```js
import { inject, observer } from 'mobx-react';

@inject('viewStore')
@observer
class App extends Component {
  render() {
    const { isShowModal } = this.props.viewStore;
    return (
      <div>
        {
            isShowModal ? <Modal /> : ''
        }
      </div>
    );
  }
}

export default App;
```

위 코드에서 데코레이터를 사용하지 않는 방법은 다음과 같다.

```js
import { inject, observer } from 'mobx-react';

class App extends Component {
  render() {
    const { isShowModal } = this.props.viewStore;
    return (
      <div>
        {
            isShowModal ? <Modal /> : ''
        }
      </div>
    );
  }
}

export default inject(({store}) => ({
  viewStore: store.viewStore,
}))(observer(App));
```


## `create-react-app`에서 eject 없이 바벨 설정 추가하기

- ES7의 데코레이터와 같이 해당 기능을 사용하려면 babel 설정을 추가해야한다.
- **create-react-app**의 기본 환경에서는 변경할 수 없다.
- `npm run eject` 스크립트를 통해 웹팩 설정을 외부로 꺼낸 후 변경할 수 있지만 번거롭다.
- 웹팩 설정이 꽤 복잡하고 장황하기 때문에, 이미 최적화된 **create-react-app**을 그대로 사용하는 방법이 있다.
- 아래 내용은 웹팩의 설정을 꺼내지 않는 방법을 소개한다.


### [react-app-rewired](https://www.notion.so/fe11st/react-mobx-f0cc3ae8e24d42bc869914ce876413d2)

리액트 스크립트를 대체하는 **react-app-rewired**를 이용하면 리액트 스크립트의 웹팩 설정에 새로운 바벨 설정을 주입시킬 수 있다.

```bash
yarn add react-app-rewired

# 추가 사용할 웹팩 패키지 설치 (데코레이터를 위한 모듈)
yarn add @babel/plugin-proposal-decorators --dev
```

- 프로젝트 루트 디렉토리에 `config-overrides.js` 추가한다.
- 이곳에서 웹팩의 config를 확장시킬 수 있다.

```js
module.exports = function override(config, env) {
  return config;
}
```

### `package.json` 스크립트 변경

![](/public/img/190107_01.png)

> *2019년 1월 3일 기준*
  *리액트 스크립트가 버전 업데이트 되면서 오류가 발생한다.
  아래와 같이 depencency가 있는 버전을 맞추어주어야 한다.*


```json
{
  "react-scripts": "2.1.1",
  "react-app-rewired": "^1.6.2"
}
```

`config-overrides.js` 에 데코레이터 바벨 설정 추가

```js
const { injectBabelPlugin } = require('react-app-rewired');

module.exports = function override(config) {
  config = injectBabelPlugin(['@babel/plugin-proposal-decorators', {
    "legacy": true
  }], config);

  return config;
}
```

`yarn start` 스크립트를 통해 개발 서버에서 정상 작동 되는 것을 확인할 수 있다.


## [리액트 라우터](https://github.com/ReactTraining/react-router)

### 리액트 라우터 설치

```bash
yarn add react-router-dom
```

`index.js` 에서 라우터 주입한다. `hashRouter` 를 이용할 수도 있다.

```js
/* index.js */

import { BrowserRouter } from 'react-router-dom';

ReactDOM.render((
  <Provider {...stores}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));

import { Switch, Route, withRouter, Link } from 'react-router-dom';

@withRouter
class App extends Component {
  render() {
    return (
      <div className="App">

        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>

        <Switch>
          <Route path="/about" component={About} />
          <Route path="/" component={Home} />
        </Switch>

      </div>
    );
  }
}
```


## 정리

- 본 포스트에서는 기본적인 웹어플리케이션의 필수적인 기능인 뷰 (React), 라우터 (React Router), 상태 관리 라이브러리 (MobX)를 이용해 프로젝트의 보일러플레이트를 구축해보았다.
- action, reducer, constant, store 등 꽤 장황한 코드를 작성해야하는 리덕스와 달리 Mobx는 정말로 심플하게 대규모 앱을 관리할 수 있는 툴로 보인다.
