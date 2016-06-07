<!-- 외부 javascript 로딩 
<script src="js/myUtil.js"></script>
<script src="js/custom.js"></script>
-->

//인자로 전달받는 id 에 해당하는 obj문서객체를 리턴하는 함수명 $ 달러
	var $ = function(id){
		var obj = document.getElementById(id);
		return obj;
	};