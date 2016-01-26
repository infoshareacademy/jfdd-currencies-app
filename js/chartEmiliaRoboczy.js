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
                    var data = [];

                    $(response).find('pozycja').each(function () {


                        $(this).find('data').each(function() {
                            data.push($(this).text());
                        });
                        console.log(data);

                        //var kurs = $(this).find('kurs').text();
                        //
                        //console.log(typeof data);
                        //console.log(data);
                        //
                        //var dataTablica=data.split(" ");
                        //
                        //$('<p></p>').html(data).appendTo('#tresc');


                        //dataTablica.push(data);
                        //console.log(dataTablica);






                        //if (wybranaData1== data[x])    {
                        //    console.log(kurs[x]);
                        //    $('.lista').append('<li>' + kurs + '</li>');
                        //}
                        //$('<p></p>').html(data).appendTo('#tresc');

                    });
                    //return dataTablica;
                    //console.log(dataTablica);





                })
            }

        });

    };
    gownoTest();


});
