$(document).ready(function () {

    var wybranaData1 = 20100409;
    var wybranaData2 = 20100701;


    function pobierzDane(url) {
        //$('#tresc').append('<ul></ul>');
        $.ajax({
            type: "GET",
            url: url,
            dataType: "xml",
            error: function () {
                $('#tresc').text('wystąpil błąd');
            },
            success: function (response) {

                var data = [];
                var kurs = [];

                $(response).find('pozycja').each(function () {

                    $(this).find('data').each(function () {
                        data.push(parseFloat($(this).text()));
                    });
                    $(this).find('kurs').each(function () {
                        kurs.push(parseFloat($(this).text()));
                    });
                });

                var startPosition = data.indexOf(wybranaData1);
                var stopPosition = data.indexOf(wybranaData2);

                var dateChartArray = data.slice(startPosition, stopPosition+1);
                var rateChartArray = kurs.slice(startPosition, stopPosition+1);

                console.log(dateChartArray);
                console.log(rateChartArray);



            }

        });

    };

    pobierzDane("../xml/GBP.xml");


});
