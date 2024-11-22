---
title: 블로그 개편
slug: blog-renewal
tags: 
  - project
authors:
  - cnaa97
---

블로그를 개편했습니다. 이제 글을 좀 쓰려구요. 
그 동안 많이 바뀐 제 여러가지 생각을 어느 공간에 담으려고 합니다.

<!-- truncate -->

정적 사이트 생성기를 이용해서 github pages를 이용해 블로그를 시작한게 2016년이더라구요.
정보가 짧게 소비되는 숏텀의 소셜미디어는 저에게 맞지 않아서 쓰지 않게 되더라구요.

최근 몇 년간은 글을 거의 올리지 않았습니다. 쓰더라도 제 개인 노트에 일기나 저널을 쓰는 정도였는데요,
뭔가 학습을 하더라도 인풋으로 들여마시면, 아웃풋으로 결과물을 뽑아내야 지식을 완전히 내 것으로 만드는 건데,
그 동안에는 [Bear](https://bear.app/)라는 노트 앱을 이용했습니다. 

어느 순간 이왕 만든 지식, 성장한 내용을 공유도 좀 하고, 내 생각도 드러내고 싶더라구요.
그런데, 펜이랑 공책이 마음에 안들어서 시스템을 먼저 개편해봤습니다.

### 공부하기 전 책상 정리

예전부터 저는 항상 뭔가 결심하고 시작하기 전에 주변 정리를 먼저 했던 것 같아요. 
시험공부를 한다고 하면 반드시 책상 정리를 먼저 해야하는...

블로그도 글을 다시 쓰자고 결심하면 블로그부터 다시 개편한다고나 할까요?

### 블로깅 시스템
약 10년 동안 [jeykll](https://jekyllrb.com/), [nextjs](https://nextjs.org/) + [notion](https://notion.so), [hugo](https://gohugo.io/) 이렇게 여러가지 기술을 바꾸어가면서 블로그를 구성했습니다. 스타일시트도 처음엔 css로 시작했다가 sass, tailwindcss 까지 바뀌었네요.

떡보단 떡고물에 더 관심이 많았었네요. 글보다 블로깅 시스템에 더 관심을 가진 것 같습니다.

가장 오래 운영한건 처음 운영했던 jekyll이었습니다. 

### 문제는 CMS
Github pages를 이용하면서 가장 힘들었던 점은 코드로 글을 관리하니, 글 생산이 불편하고 느리다는 것이었습니다. 
특히 이미지 하나 올리려고 하면, 어디 파일 붙여넣고 이미지 참조도 오타없이 시켜야하는 문제가 있었어요.

생산과 소비를 동일한 시스템에서 하는 네이버나 티스토리를 쓰는 블로그가 부러울 때도 있었는데요, 
그래서 노션을 CMS 도구로 이용하자는 아이디어였습니다. 

원리는 노션의 API를 이용해 글을 동적으로 읽어와서 랜더링하는 방식이었습니다. 
Nextjs를 SSG(Static Site Genetator)로 export 해서 비슷한 오픈소스 중 괜찮은 것을 찾아 커스터마이징부터 했습니다. 
이 때는 라우팅을 사용해야됬어서, 배포를 Github Pages 대신 Nextjs를 쉽게 배포할 수 있는 도구인 Vercel로 갈아탔습니다.

### 속도 문제
문제는 속도였습니다. 특히 이미지 에셋은 속도가 너무 너무 느려서 레디스 서버를 하나 구성해, 이미지를 캐싱을 해두어야 했는데, 
이것도 처음 캐싱을 해야하는 순간에는 캐싱될 때까지 너무 오래걸렸습니다.

### 다시 마크다운으로
속도 문제로 어쩔 수 없이 다시 마크다운으로 돌아가자고 판단했다고, [hugo](https://gohugo.io/)를 이용했습니다. 
golang 기반이니 "핫"하니깐 블로그도 할 겸, 한 번 써보고싶기도 했고, 그래서 다시 Github Pages와 마크다운으로, 과거에 썼던 글만 돌려놓았죠.

hugo는 구성하다가, 관련 오픈소스에 코드 한 줄 기여도 할 정도로 초반에는 열정이 넘쳤었습니다.

### 다시 CMS
그런데 hugo에서 다시 쓰려니 또 관리 문제가 생겼졌습니다. 처음 jekyll에서 겪었던 CMS가 문제인데, 
간단히 서버 하나 만들려고 하다가, 그냥 편하게 하자 싶어서, 찾아본 도구가 Netlify였는데, 2023년 2월에 [CMS 기능을 분리](https://www.netlify.com/blog/netlify-cms-to-become-decap-cms/)했더라구요. CMS 기능만 분리된 [decapcms](https://decapcms.org/docs/docusaurus/)로 이용하기로 했습니다.

CMS의 원리는 간단합니다. 내부적으로 어드민을 제공하는데, Github이나 레파지토리 관리 도구에 인증을 시키고, 해당 저장소에 접근해 파일시스템처럼 파일을 읽어오는 방식이에요. 
decapcms는 파알시스템에서 읽은 글과 이미지 에셋을 편집하는 에디터를 제공하고, 저장하면, 다시 Git에 푸시해주는 방식입니다.

어차피 하는 작업, 랜더링까지 욕심내봤습니다. Hugo는 간단한데, 오랜만에 보니 구조를 까먹어서, 다시 페이스북에서 만든 정적 웹사이트 생성기인 [docusaurus](https://docusaurus.io/)로 구성했습니다. 

<br/>

이렇게 지난 10년 간의 블로그 시스템 여정이었습니다. 왠지 또 바꿀 것 같은 불안함도 드네요.ㅎㅎ