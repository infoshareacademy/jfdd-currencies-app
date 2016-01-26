/**
 * Created by lukaszk on 19.01.16.
 */

$(document).ready(function () {
    var leftSelectValue = localStorage.getItem("selectLeft");
    var rightSelectValue = localStorage.getItem("selectRight");
    var centerSelectValue = localStorage.getItem("selectCenter");

    buildSelectCurrency('id="selectLeft" ',leftSelectValue,$('#selectLeft').parents('section')[0]);
    buildSelectCurrency('id="selectRight" ',rightSelectValue,$('#selectRight').parents('section')[0]);
    buildSelectCurrency('id="selectCenter" ',centerSelectValue,$('#selectCenter').parents('section')[0]);

    $(".selectCur").after("<table class='table table-striped table-bordered'><thead><tr><th>Waluta</th><th>Kod waluty</th><th>Kurs kupna</th><th>Kurs sprzedaży</th></tr></thead><tr class='edit-tr'></tr></table>");





    actualizeTableData(leftSelectValue, $('#selectLeft').parents('section')[0]);
    actualizeTableData(rightSelectValue, $('#selectRight').parents('section')[0]);
    actualizeTableData(centerSelectValue, $('#selectCenter').parents('section')[0]);



    $("select").change(function() {
        actualizeTableData($(this)[0].selectedIndex, $(this).parents('section')[0]);
        addLocalStorage(this.id,$(this)[0].selectedIndex);

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


function addLocalStorage(selectId,selectedOption){
    localStorage.setItem(selectId, selectedOption);
}


function buildSelectCurrency(selectId, selectedOption, container) {
    var buildSelect = '<select ' + selectId + ' class="form-control selectCur">';
    var currency = ['Dolar amerykański', 'Dolar australijski', 'Dolar kanadyjski', 'Euro', 'Forint (Węgry)', 'Frank szwajcarski', 'Funt szterling', 'Jen (Japonia)', 'Korona czeska', 'Korona duńska', 'Korona norweska', 'Korona szwedzka', 'SDR (MFW)'];

    for (var countCurrency = 0; countCurrency <= 12; countCurrency++) {
        if (selectedOption == countCurrency) {
            buildSelect += '<option selected>' + currency[countCurrency] + '</option>';
        }
        else {
            buildSelect += '<option >' + currency[countCurrency] + '</option>';
        }
    }
    buildSelect += '</select>';
    $(container).prepend(buildSelect);
}
