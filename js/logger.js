
var logger = (function(){
    var events = [];

    function addToLocalStorage(item){
        localStorage.setItem('logger', JSON.stringify(item));
    }

    return {
        log: function (event) {
            events.push(event);
            addToLocalStorage(events);
            debugger;
        },
        check: function () {
            var x = localStorage.getItem('logger');
            console.log(x);
        }
    }
})();

