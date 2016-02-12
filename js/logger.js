var logger = (function(){
    var key = 'logger';

    return {
        log: function (event) {
            var events = JSON.parse(localStorage.getItem(key)) || [];
            events.push(event);
            localStorage.setItem(key, JSON.stringify(events));
        },

        getLog: function () {
            return JSON.parse(localStorage.getItem(key)) || []
        }
    }
})();


$(function () {
   logger.getLog().forEach(function (logEntry, index) {
       $('#tableLog tbody').append('<tr><td>' + [index,logEntry.label,logEntry.place].join('</td><td>') + '</td></tr>')
   })
});






