---
layout: post
title:  "Show The Local Weather"
date:   2016-06-05
category: Project
comments: true
---

<img src="/img/160605_01.png" class="fit image">

### 개요

[Show The Local Weather](http://cnaa97.github.io/local_weather){:target="_blank"}은 Free Code Camp의 과제 중 하나로 날씨 정보를 제공하는 [웹페이지](http://cnaa97.github.io/local_weather){:target="_blank"}이다.

먼저 자바스크립트의 navigator.geolocation 을 활용하여 클라이언트의 위도, 경도를 불러오고 날씨 정보와 지역 이름을 긁어와 html 문서에 출력했다. 날씨와 위치정보는 아래 두 곳의 API를 이용했다.

 - 구글 지도 API
 - Open Weather Map API

### Javascript

{% highlight javascript %}

    // 브라우저마다 위치정보의 수집을 제한하고 있기 때문에
    // IF문으로 수집 여부를 체크한다.

if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){

    // 자바스크립트의 navigator.geolocation 객체를 이용하여 위도, 경도를 불러와서 변수에 저장한다.

        var currentLati = position.coords.latitude;
        var currentLongi = position.coords.longitude;
        console.log("위도 : "+currentLati + "  경도 : "+currentLongi);

        // 사전에 Open Weather Map에 가입하여 api id를 발급받는다.
        // 자바스크립트의 getJSON 함수를 이용하여 Open Weather Map 에서 제공하는 JSON 파일로 접근한다.
        // 현재 온도와 최저 온도, 최고 온도, 온도에 따른 아이콘까지 불러온다. 이를 변수에 저장한다.

        $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" +currentLati+ "&lon=" +currentLongi+ "&appid=""발급받은 API""units=metric",function(json){
                var currentTemp = Math.round(json.main.temp);
                var tempMin = Math.round(json.main.temp_min);
                var tempMax = Math.round(json.main.temp_max);
                var weatherIcon = json.weather[0].icon;

            // 현재 html 문서 내의 elements에 현재온도,최저,최고온도를 출력한다.

                $("#temp").text(currentTemp);
                $(".min").text(tempMin+"°C");
                $(".max").text(tempMax+"°C");

            // 온도에 따른 날씨 아이콘을 출력한다.
            // 날씨 아이콘은 폰트 기반의 다른 오픈소스를 사용했다.
            // switch 문을 이용하여 아이콘의 id값을 확인하고, 클래스를 추가/제거하는 식으로 구현했다.

                switch(weatherIcon) {
                    case '01d':
                        $(".temp_icon > i").removeClass();
                        $(".temp_icon > i").addClass("wi wi-day-sunny");
                        break;
                    case '02d':
                        $(".temp_icon > i").removeClass();
                        $(".temp_icon > i").addClass("wi wi-day-cloudy");
                        break;

                        /**** ...중략... ****/

                    case '50n':
                        $(".temp_icon > i").removeClass();
                        $(".temp_icon > i").addClass("wi wi-fog");
                        break;
                    default:
                        break;
                }
        });

        // 구글 지도 API에 아까 전달받은 위치정보(위도, 경도)를 통해 현재의 도시 이름을 가져온다.

        $.getJSON("http://maps.googleapis.com/maps/api/geocode/json?latlng=" +currentLati+ "," +currentLongi+ "&sensor=true", function(json){
            var city = json.results[0].address_components[3].long_name;
            $("#location").text(city);

        });
    });
}
{% endhighlight %}

자바스크립트 jQuery에서 getJSON 함수의 매개변수로 Open Weather Map을 url을 보내면 JSON 형식의 데이터를 전달받을 수 있다.
JSON의 데이터를 확인할 때, 전달받은 데이터를 콘솔창에 붙여넣고, 테스트해보면서 필요한 데이터를 확인하면서 진행했다.
<br><br>

### JSON

{% highlight JSON %}
{
  "coord": {
    "lon": 127,
    "lat": 37.52
  },
  "weather": [
    {
      "id": 721,
      "main": "Haze",
      "description": "haze",
      "icon": "50n"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 23.39,
    "pressure": 1018,
    "humidity": 73,
    "temp_min": 20,
    "temp_max": 25
  },
  "visibility": 10000,
  "wind": {
    "speed": 1,
    "deg": 180
  },
  "clouds": {
    "all": 75
  },
  "dt": 1473766800,
  "sys": {
    "type": 1,
    "id": 8519,
    "message": 0.0131,
    "country": "KR",
    "sunrise": 1473714759,
    "sunset": 1473759731
  },
  "id": 1846735,
  "name": "Chamsil",
  "cod": 200
}
{% endhighlight%}

같은 방법으로 구글 지도에서도 위도,경도를 url로 매개 변수로 보내어 위치정보를 가져올 수 있었다.
<br><br>

### HTML

{% highlight html %}
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>How's the Weather Today?</title>
    <script src="js/jquery-1.12.4.min.js"></script>
    <link href="css/font-awesome.min.css" rel="stylesheet">
    <link rel="stylesheet" href="weather-icons/css/weather-icons.min.css">
<body>
    <div class="container940">
        <div class="w_box">
            <div class="quote">
                <i class="fa fa-quote-left" aria-hidden="true"></i>
                <i class="fa fa-quote-right" aria-hidden="true"></i>
            </div>
            <h3 class="title">나들이 놉! <br> 미세먼지.. 콜록ㅠㅠ</h3>
            <div class="w_center">
                <div class="temp_icon"><i class=""></i></div>
                <h2 id="temp">24</h2>
                <h2 class="temp_mark">°C</h2>
                <span id="location">서울</span>
            </div>
        </div>
        <div class="w_box2">
            <div class="w_min">
                <i class="fa fa-caret-down"></i>
                <span class="min">19°C</span>
            </div>
            <div class="w_max">
                <i class="fa fa-caret-up"></i>
                <span class="max">29°C</span>
            </div>
        </div>
    </div>
</body>
</html>
{% endhighlight %}

날씨에 따라 아이콘이 바뀌는 것을 알 수 있다.
Open Weather Map에서는 날씨정보 뿐만아니라 아이콘의 형식도 제공한다. 이미지 파일(png)로 제공되는 아이콘이 마음에 들지 않아 다른 아이콘을 찾아보니 font-awesome과 같이 폰트 형태으로 제공하는 [오픈소스 아이콘](https://erikflowers.github.io/weather-icons/){:target="_blank"}을 찾을 수 있었다.
아이콘은 [이 곳](https://erikflowers.github.io/weather-icons/){:target="_blank"}에서 다운받아 로컬에 저장해놓고 불러왔다.
