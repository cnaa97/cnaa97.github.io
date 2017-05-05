$(function () {

    /**
    * smooth scroll
    */
    $('.category-item-link').click(function(){
        $('html, body').animate({
            scrollTop: $(`[name="${$.attr(this, 'href').substr(1)}"]`).offset().top - 16
        }, 500);
        return false;
    });

});
