$(document).ready(function(){
    
    /* 탭 메뉴 페이지 */
    // 처음 로딩시 HOT부분만 엑티브
    
    // 탭 메뉴
    $(".main_menu ul li a").click(function(evt){
        evt.preventDefault(); /* 스크롤 이벤트 막기 */
        $("ul li a").removeClass("tab_active");
        $(this).addClass("tab_active");
        
        var page = $(this).attr("href")
        $("#menu_hot, #menu_item, #menu_sale, #menu_shop").hide();
        $(page).show();
    });
    $("#menu_hot").show();
    
    
    
    /* 콘텍스트 메뉴 */
    $(".menu_icon").click(function(){
       $(".menu_con").animate({
           "margin-top":"0vh"
       },400);
    });
    $(".menu_con_exit").click(function(){
       $(".menu_con").animate({
           "margin-top":"-100vh"
       },400);
   });
    
    
    // image slider
    $('.content_page1').on('swipeup',function(){
        console.log("swipedown..");
    });
    $(document).on('swipeup',function(){
        alert("swipeup..");
    });
    
    $(document).on('swipeup', '.content_page1', function () {
        alert("swipeup..");
});
    
    
    $(".menu_bar_like").click(function(){
        $('.content').animate({
            "margin-left":"-100vh"
        },1000);
    });
    $(".menu_bar_find").click(function(){
        $('.content').animate({
            "margin-left":"0vh"
        },1000);
    });
    $('.content01 > img').slideDown(500);
    $('.content02 > img').slideDown(1000);
    
});//ready
