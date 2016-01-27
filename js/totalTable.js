/**
 * Created by tomekn on 26.01.16.
 */

$(document).ready(function () {

    function totalTable () {

        $.ajax({

            type: "GET",

            url: "xml/2016_01_15.xml",

            dataType: "xml",

            success: function (xml) {

                $(xml).find('pozycja').each(function () {

                    var nazwaWaluty = $(this).find('nazwa_waluty').text();
                    var przelicznik = $(this).find('przelicznik').text();
                    var kodWaluty = $(this).find('kod_waluty').text();
                    var kursKupna = $(this).find('kurs_kupna').text();
                    var kursSprzedazy = $(this).find('kurs_sprzedazy').text();


                    $('.table-cur tbody').append('<tr><td>' + nazwaWaluty + '</td>' + '<td>' + kodWaluty
                        + '</td>' + '<td>' + kursKupna + '</td>' + '<td>' + kursSprzedazy + '</td></tr>');

                    var dataDzien = $(xml).find('data_notowania');
                    $('.dateOfTable').append(dataDzien);
                });
            }
        });
    }

    totalTable();

});


