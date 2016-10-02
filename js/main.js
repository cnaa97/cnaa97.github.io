$(function () {
    // 데스크탑 메뉴 토글
    $(".page-nav > .nav-categori > span").click(function(){
        $(this).parent().find("li").slideToggle(200);
    });
    
    // 모바일 메뉴 토글
    var menu = $('.context-menu div');
    menu.on('click', function () {
        var menuNum = $(this).data('menu');
        $(this).toggleClass('menu-' + menuNum + '-active');
        $('.page-nav').slideToggle();
        $('.page-content').toggle();
    })
})