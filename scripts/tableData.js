/**
 * Created by lukaszk on 19.01.16.
 */

$(document).ready(function () {

    $("#post").append("<ul></ul>");

    $.ajax({

        type: "GET",

        url: "xml/kurs.xml",

        dataType: "xml",

        success: function (xml) {

            $(xml).find('pozycja').each(function () {

                var nazwaWaluty = $(this).find('nazwa_waluty').text();

                var przelicznik = $(this).find('przelicznik').text();
                var kodWaluty = $(this).find('kod_waluty').text();
                var kursKupna = $(this).find('kurs_kupna').text();
                var kursSprzedazy = $(this).find('kurs_sprzedazy').text();

                $("<li></li>").html(nazwaWaluty + ", " + kodWaluty+", " +kursKupna+", " +kursSprzedazy).appendTo("#post");

            });

        },

        error: function () {

            alert("An error occurred while processing XML file.");

        }

    });

});
