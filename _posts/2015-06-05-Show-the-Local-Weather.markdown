---
layout: post
---
<img src="/assets/160605_01.png" class="fit image"> Show the Local Weather 프로젝트는 <a href="http://www.freecodecamp.com" target="_blank">Free Code Camp</a>의 과정에 있는 프로젝트 중 하나로 날씨 정보를 제공하는 웹페이지이다. 


자바스크립트의 navigator.geolocation 을 활용하여 클라이언트의 위도, 경도를 불러오고 날씨 정보와 지역 이름을 긁어와 html 문서에 출력했다. 

날씨와 위치정보는 아래 두 곳의 API에서 정보를 전달받았다.

 - 구글 지도 API
 - Open Weather Map API
 



<h3>Javascript</h3>
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
                    case '03d':
                        $(".temp_icon > i").removeClass();
                        $(".temp_icon > i").addClass("wi wi-cloud");
                        break;
                    case '04d':
                        $(".temp_icon > i").removeClass();
                        $(".temp_icon > i").addClass("wi wi-cloudy");
                        break;
                    case '09d':
                        $(".temp_icon > i").removeClass();
                        $(".temp_icon > i").addClass("wi wi-showers");
                        break;
                    case '10d':
                        $(".temp_icon > i").removeClass();
                        $(".temp_icon > i").addClass("wi wi-day-rain");
                        break;
                    case '11d':
                        $(".temp_icon > i").removeClass();
                        $(".temp_icon > i").addClass("wi wi-thunderstorm");
                        break;
                    case '13d':
                        $(".temp_icon > i").removeClass();
                        $(".temp_icon > i").addClass("wi wi-snow");
                        break;
                    case '50d':
                        $(".temp_icon > i").removeClass();
                        $(".temp_icon > i").addClass("wi wi-fog");
                        break;
                    case '01n':
                        $(".temp_icon > i").removeClass();
                        $(".temp_icon > i").addClass("wi wi-night-clear");
                        break;
                    case '02n':
                        $(".temp_icon > i").removeClass();
                        $(".temp_icon > i").addClass("wi wi-night-alt-cloudy");
                        break;
                    case '03n':
                        $(".temp_icon > i").removeClass();
                        $(".temp_icon > i").addClass("wi wi-cloud");
                        break;
                    case '04n':
                        $(".temp_icon > i").removeClass();
                        $(".temp_icon > i").addClass("wi wi-cloudy");
                        break;
                    case '09n':
                        $(".temp_icon > i").removeClass();
                        $(".temp_icon > i").addClass("wi wi-rain");
                        break;
                    case '10n':
                        $(".temp_icon > i").removeClass();
                        $(".temp_icon > i").addClass("wi wi-night-rain");
                        break;
                    case '11n':
                        $(".temp_icon > i").removeClass();
                        $(".temp_icon > i").addClass("wi wi-night-lightning");
                        break;
                    case '13n':
                        $(".temp_icon > i").removeClass();
                        $(".temp_icon > i").addClass("wi wi-night-snow");
                        break;
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



<img src="/assets/160605_02.png" class="fit image"> 

자바스크립트에서 getJSON의 매개변수로 Open Weather Map을 url을 보내면 json 형식의 데이터를 전달받을 수 있다. 
JSON을 활용한 것이 처음이라 콘솔창을 이용하여 데이터 출력 형식을 테스트해보면서 전달받을 수 있었다.



<img src="/assets/160605_03.png" class="fit image"> 

같은 방법으로 구글 지도에서도 위도,경도를 url로 매개 변수로 보내어 위치정보를 가져올 수 있었다.



<h3>HTML</h3>
{% highlight html %}
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>How's the Weather Today?</title>
    <script src="https://code.jquery.com/jquery-1.12.4.min.js" integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ=" crossorigin="anonymous"></script>
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-T8Gy5hrqNKT+hzMclPo118YTQO6cYprQmhrYwIiQ/3axmI1hQomh7Ud2hPOy8SP1" crossorigin="anonymous">
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
Open Weather Map에서는 날씨정보 뿐만아니라 아이콘의 형식도 제공한다. 이미지파일로 제공되는 아이콘이 구려 다른 아이콘을 찾아보니 font-awsome과 같이 폰트형식으로 제공하는 <a href="https://erikflowers.github.io/weather-icons/" target="_blank">오픈소스 아이콘</a>을 찾을 수 있었다.
아이콘은 이곳 <a href="https://erikflowers.github.io/weather-icons/" target="_blank">weather icon</a>에서 로컬에서 다운받아 진행하였다. 
