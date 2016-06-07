$(document).ready(function(){
    
    /* 탭 메뉴 페이지 */
    
    // 처음 로딩시 HOT 메뉴 보이기
    $("#menu_hot").show();
    $("#menu_item, #menu_sale, #menu_shop").hide();
    $(".menu_con").hide();
    
    
    // 탭 메뉴
    $(".main_menu ul li a").click(function(evt){
        evt.preventDefault(); /* 스크롤 이벤트 막기 */
        $("ul li a").removeClass("tab_active");
        $("ul li a").css("color","#565656");
        
        $(this).addClass("tab_active");
        $(this).css("color","#E2169F");
        
        var page = $(this).attr("href")
        $("#menu_hot, #menu_item, #menu_sale, #menu_shop").hide();
        $(page).show();
    });
    
    
    
    /* 이미지 팝업 */
    $(".content_page1 div").click(function(){
        var sel = $(this).find("img").attr("src");
        $(".img_popup_img img").attr("src", sel);
        $(".img_popup").show();
    });
    $(".img_popup").click(function(){
       $(this).fadeToggle(); 
    });
    
    
    /* 콘텍스트 메뉴 */
    $(".menu_icon").click(function(){
       $(".menu_con").show();
       $(".menu_con").animate({
           "margin-top":"0vh"
       },400);
    });
    
    $(".menu_con_exit").click(function(){
       $(".menu_con").animate({
           "margin-top":"-100vh"
       },400);
       $(".menu_con").hide();
   });
    
    
    
});//ready
