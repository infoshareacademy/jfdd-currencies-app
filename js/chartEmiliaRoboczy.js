$(document).ready(function () {
    (function () {
        $('#tresc').append('<ul></ul>');
        $.ajax({
            type: "GET",
            url: "../xml/GBPtest.xml",
            dataType: "xml",
            error: function () {
                $('#tresc').text('wystapil blad');
            },
            success: function (response) {
                $(response).find('waluty').each(function () {

                    $(response).find('pozycja').each(function () {
                        var data = $(this).find('data').text();
                        var kurs = $(this).find('kurs').text();

                        $('<li></li>').html(data+ ' '+kurs).appendTo('#tresc');
                    });



                })
            }

        });

    })();


});
