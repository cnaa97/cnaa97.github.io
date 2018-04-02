---
layout: post
title:  "AWS EC2 + NginX + Nodejs Express"
date:   2018-04-02
category: Front-end
comments: true
---

### 배경

[commoners(커머너즈) 홈페이지](https://commoners.co.kr/)를 풀스택으로 개발하면서 여러 이슈가 있었는데, 그 중 경험이 없어서 어려웠던 부분이 백엔드였다. 배포도 마찬가지였다. 서버에 배포시켜 웹서버를 띄우는 것보다, 개발 환경에서 가상 서버 크고 끄는데 더 익숙했던 나는 서버 작업 모두가 큰 이슈였다. 

백엔드 스택은 AWS의 EC2 리눅스 서버를 사용하고, nginx 위에 Nodejs express, 데이터베이스는 mongodb를 사용한다. 이 과정에서 겪은 몇몇 문제를 공유해본다.

<br/>

### forever로 express 서버 실행

서버 실행은 `npm start`로 express 서버를 실행시키는 방법을 택했다. 서버가 프로세스(백그라운드)에서 실행되어야 했기에 [forever](https://www.npmjs.com/package/forever) 라는 프로세스 관리 패키지를 글로벌에 설치하여 사용했고, 잘 작동한다. 

forever를 이용해서 스크립트를 실행하는 코드는 아래와 같다.
```
forever start -c "npm start" ./
```

<br/>

### AWS 80포트 방화벽 문제

EC2 서버에서는 기본 포트인 80 포트가 보안 문제로 직접 접근할 수 없기 때문에, 방화벽 설정을 통해 리다이렉트 시켜주는 방법을 이용해야 한다. `iptables`를 통해 리눅스에서 방화벽을 설정할 수 있는데, 아래 코드를 통해 80포트로 접근되는 접근을 3000포트로 리다이렉트 시켰다.

```
sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000
```

<br/>

### AWS로 SSL 인증서 적용

크롬에서는 사용자 랩탑의 카메라를 사용하기 위해서는 SSL 인증을 요구했는데, 카메라를 사용해서 얼굴을 인식하는 것과 같은 [인터렉션 디자인 작업]()을 커머너즈 홈페이지에 적용할 경우를 대비해 SSL 적용이 필요했다.

SSL을 적용하는 것은 AWS에서 처리했는데, [Certificate Manager](https://aws.amazon.com/certificate-manager/)를 사용하면 무료로 인증서를 발급받아 적용할 수 있다. 

여기에 EC2의 로드밸런서를 이용해 80 포트로 접근하면 http, 443 포트로 접근하면 https로 넘겨준다. 

<br/>

### http 접근 시 https로 넘기는 문제

또 다른 문제에 직면했는데, http로 접근했을 때도 https로 접속시키게 만들고 싶었다. express의 라우터를 리슨하면서 처리해봤는데, 잘 되지 않았다. AWS의 로드밸런서 만으로 되지 않았다. 

페이스북 AWS 커뮤니티에 질문해보니, 3가지 답변이 올라왔다.

1. 웹서버에서 해결 (Nginx rewrite 모듈을 적용)
2. AWS 기능 활용 (클라우드 프론트 / ALB) 
3. Express `x-forwarded-proto` 로 해결

나는 express 보다 비교적 안정적인 nginx를 express 앞단에 두는 방법을 택했다. 조금 검색해보니 해킹 위험 방지 효과도 있고 마침 EC2에 nginx로 설치되어 있어서 1번 방법을 선택했다. 직접적으로 익스프레스 서버를 실행하는건 동일하지만, nginx의 프록시패스로 처리된다.

<br/>

### 기존 방화벽 코드 삭제

nginx의 프록시 패스를 사용하기 위해 기존에 `iptables`에 적용시킨 코드를 삭제해야 한다.

1. 기존 방화벽 룰 확인
```
iptables -t nat -L --line-numbers
```

2. 체인 번호 확인 후 삭제

만약 1번이 내가 삭제할 룰 이라면,
```
iptables -t nat -D PREROUTING 1
```

<br/>

### Nginx 의 프록시 패스로 express 적용하기

- nginx 가 설치된 디렉토리로 이동한다.
```
cd /etc/nginx/
```

- `nginx.conf` 파일을 수정한다. 
    기존 설치된 `nginx.conf` 파일은 백업 본을 복사해두고, 불필요한 부분은 주석 처리한 후 `include` 하는 방법을 선택했다. 

- nginx.conf 편집 (주석 생략)

```
worker_processes  1;

events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    keepalive_timeout  65;
    
    # servers 하위 설정 파일을 모두 include 시킨다
    include servers/*;
}
```

- servers/site_url.conf 편집

```
server {
    listen 80;
    server_name site_url;

    # 로드 밸런서를 사용했다면, 아래 코드로 인해 http -> https로 리다이렉트됨
    proxy_set_header X-Forwarded-Proto $scheme;
    if ( $http_x_forwarded_proto != 'https' ) {
        return 301 https://$host$request_uri;
    }

    location / {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-NginX-Proxy true;

        proxy_pass http://127.0.0.1:3000/;
        proxy_redirect off;
    }

    gzip on;
    gzip_comp_level 2;
    gzip_proxied any;
    gzip_min_length 1000;
    gzip_disable "MSIE [1-6]\."
    gzip_types text/plain text/css application/json application/x-javascript text/xml application/xml application/xml+rss text/javascript;
}
```

- nginx restart
```
sudo /etc/init.d/nginx restart
```

이후 다시 forever를 이용해 express를 실행시키고, http로 접근해보면 https로 리다이렉트 되는 것을 확인할 수 있다.

