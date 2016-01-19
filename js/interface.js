/**
 * Created by Tomasz on 19.01.2016.
 */
$(document).ready(function(){

    $( ".trigger-slide" ).click(function() {
        $('.slide-list-right').animate({
            right: 0
        }, 400)
    });

    $( ".user-settings").click(function() {
        $('.user-settings-dropdown').css('display','block');
    });

});

