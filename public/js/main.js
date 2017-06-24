// $(function () {
//     /**
//     * smooth scroll
//     */
//     $('.category-item-link').click(function(){
//         $('html, body').animate({
//             scrollTop: $(`[name="${$.attr(this, 'href').substr(1)}"]`).offset().top - 16
//         }, 500);
//         return false;
//     });
// });

window.onload = function () {

    (function(document) {
        "use strict";

        var hidden_el  = document.getElementsByClassName("hidden-content"),
            control_el = document.getElementsByClassName("toggle-content");

        if (hidden_el.length < 1 || control_el.length < 1) {
            return;
        }

        // Get the elements
        hidden_el  = hidden_el[0];

        for(var i=0; i < control_el.length; i++){
            var item =  control_el[i];
            item.onclick = function() {
                var element_classes = (" "+hidden_el.className+" ").replace(/[\n\t\r]/g, " "),
                    remove_class    = "slide-down",
                    add_class       = "slide-up",
                    is_showing      = element_classes.indexOf(" "+remove_class+" ") > -1;

                if ( ! is_showing) {
                    // Switch variable values
                    remove_class = [add_class, add_class = remove_class][0];
                    document.body.style.overflow = "hidden";
                } else {
                    document.body.style.overflow = "scroll";
                }

                // Remove the previous class (if present) and add the new class
                hidden_el.className = (element_classes.replace(" "+remove_class+" ", "") + " "+add_class+" ").trim();

                return false;
            };
        }
    })(document);
};