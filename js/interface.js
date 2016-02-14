
$(document).ready(function(){

    $(".trigger-slide").click(function() {
        $('.menu-hidden').toggleClass('menu-show-up')
    });

    $( ".user-settings").click(function() {
        $('.user-settings-dropdown').toggle();

    });

    // skins //


    $('.motive-blue-btn').click(function(){
        $('.blue-skin').css('background-color','#2980B9');
        $('img').attr('src','images/logo_blue.svg')
    });

    $('.motive-red-btn').click(function(){
        $('.blue-skin').css('background-color','#C0392B');
        $('img').attr('src','images/logo_red.svg')
    });

    $('.motive-green-btn').click(function(){
        $('.blue-skin').css('background-color','#16A085');
        $('img').attr('src','images/logo_green.svg')
    });

    $(function () {
        $('#userName').append(localStorage.getItem("name"));
    });
});

var date = new Date();
var actualYear = date.getFullYear();
document.getElementById("currentYear").innerHTML = actualYear;

