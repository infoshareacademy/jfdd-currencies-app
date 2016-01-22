/**
 * Created by lukaszk on 19.01.16.
 */

$(document).ready(function () {

    $(".left-select").after("<table class='table table-striped table-bordered'><thead><tr><th>Waluta</th><th>Kod waluty</th><th>Kurs kupna</th><th>Kurs sprzedaży</th></tr></thead><tr class='edit-tr'></tr></table>");
    actualizeTableData(0);

    $("select").change(function() {
        actualizeTableData($(this)[0].selectedIndex, $(this).parents('section')[0]);
    });

});

function actualizeTableData (selectedOption, container){

    $.ajax({

        type: "GET",

        url: "xml/kurs.xml",

        dataType: "xml",

        success: function (xml) {

            $(xml).find('pozycja').eq(selectedOption).each(function () {

                var nazwaWaluty = $(this).find('nazwa_waluty').text();
                var przelicznik = $(this).find('przelicznik').text();
                var kodWaluty = $(this).find('kod_waluty').text();
                var kursKupna = $(this).find('kurs_kupna').text();
                var kursSprzedazy = $(this).find('kurs_sprzedazy').text();
                var newCurrency='<tr class="edit-tr"><td>'+nazwaWaluty + '</td>'+ '<td>'+ kodWaluty+'</td>'+'<td>'+kursKupna+'</td>'+'<td>'+kursSprzedazy+'</td></tr>';
                $('.table .edit-tr ', container).replaceWith(newCurrency);
            });
        }
    });
}