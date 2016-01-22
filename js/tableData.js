/**
 * Created by lukaszk on 19.01.16.
 */

$(document).ready(function () {


    $(".left-select").after("<table class='table table-striped table-bordered'><thead><tr><th>Waluta</th><th>Kod waluty</th><th>Kurs kupna</th><th>Kurs sprzedaży</th></tr></thead></table>");

    $.ajax({

        type: "GET",

        url: "xml/kurs.xml",

        dataType: "xml",

        success: function (xml) {

            $(xml).find('pozycja').eq(0).each(function () {

                var nazwaWaluty = $(this).find('nazwa_waluty').text();

                var przelicznik = $(this).find('przelicznik').text();
                var kodWaluty = $(this).find('kod_waluty').text();
                var kursKupna = $(this).find('kurs_kupna').text();
                var kursSprzedazy = $(this).find('kurs_sprzedazy').text();

                $("<tr></tr>").html('<td>'+nazwaWaluty + '</td>'+ '<td>'+ kodWaluty+'</td>'+'<td>'+kursKupna+'</td>'+'<td>'+kursSprzedazy+'</td>').appendTo("table");

            });

        },

        error: function () {

            console.log("An error occurred while processing XML file.");

        }

    });
});
