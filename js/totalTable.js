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

                    var nazwaWaluty = $(this).find('nazwa_waluty').text(),
                        przelicznik = $(this).find('przelicznik').text(),
                        kodWaluty = $(this).find('kod_waluty').text(),
                        kursKupna = $(this).find('kurs_kupna').text(),
                        kursSprzedazy = $(this).find('kurs_sprzedazy').text();


                    $('.table-cur tbody').append('<tr><td>' + [nazwaWaluty,kodWaluty,kursKupna,kursSprzedazy].join('</td><td>') + '</td></tr>');

                    var dataDzien = $(xml).find('data_notowania');
                    $('.dateOfTable').append(dataDzien);
                });
            }
        });
    }

    totalTable();

    $('.sort-table').click(function() {

        var sortAsc = $(this).hasClass('asc'),
            $table  = $('#mainTable'),
            $rows   = $('tbody > tr', $table);

        $rows.sort(function(a, b) {

            var keyA = $.trim($('td:first-child',a).text().toLowerCase());
            var keyB = $.trim($('td:first-child',b).text().toLowerCase());

            if (sortAsc) {
                return (keyA > keyB) ? 1 : -1;
            } else {
                return (keyA < keyB) ? 1 : -1;
            }
        });

        $rows.each(function(index, row){
            $table.append(row);
        });
    });

});



