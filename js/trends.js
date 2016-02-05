
var currencySelected,
    currencyDataFirst,
    currencyDataSecond;

$("#selectButton").change(function () {
    currencySelected = $(this).val();
});

$("#trendsForm").submit(function (event) {
    event.preventDefault();
    currencyDataFirst = $('#dateOne').val();
    currencyDataSecond = $('#dateTwo').val();
    var url = ('xml/' + currencySelected + '.xml');
    fetchData(url);
    debugger;
    return false;
});


new JsDatePick({
    useMode: 2,
    target: "data1",
    isStripped: false,
    selectedDate: {
        year: 2000,
        month: 1,
        day: 3
    },
    yearsRange: new Array(2000, 2016),
    limitToToday: false,
    dateFormat: "%Y-%m-%d"
});

new JsDatePick({
    useMode: 2,
    target: "data2",
    isStripped: false,
    selectedDate: {
        year: 2000,
        month: 1,
        day: 4
    },
    yearsRange: new Array(2000, 2016),
    limitToToday: false,
    dateFormat: "%Y-%m-%d"
});

function fetchData(url) {

    $.ajax({
        type: "GET",
        url: url,
        dataType: "xml",
        success: function (response) {

            var data = [];


            $(response).find('pozycja').each(function () {

                $(this).find('data').each(function () {
                    data.push($(this).text());
                    console.log(data);
                });
            });


        }

    }).then(function () {

    });
}
