$(document).ready(function () {

    var wybranaData1= 19930107;
    var wybranaData2= 19930127;


    function gownoTest () {
        //$('#tresc').append('<ul></ul>');
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
                        var dataTablica=[];


                        dataTablica.push(data);
                        console.log(dataTablica);






                        //if (wybranaData1== data[x])    {
                        //    console.log(kurs[x]);
                        //    $('.lista').append('<li>' + kurs + '</li>');
                        //}

                        //$('<li></li>').html(data).appendTo('#tresc');
                    });
                    return dataTablica;
                    console.log(dataTablica);





                })
            }

        });

    };
    gownoTest();


});
