/**
 * Created by Tomasz on 19.01.2016.
 */
$(document).ready(function(){

    $(".trigger-slide").click(function() {
        $('.menu-hidden').toggleClass('menu-show-up')
    });

    $( ".user-settings").click(function() {
        $('.user-settings-dropdown').toggle();

    });
});

