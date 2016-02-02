
    $('.socialMediaLogIn').click( function()    {
        localStorage.setItem("popupWasShown",1);
        //location.reload();

            setTimeout(function () {
                location.reload();
            }, 2000);
    });

    (function () {
    if(localStorage.getItem("popupWasShown") != 1)  {
        $('#PopUp-wrapper').removeAttr('style', 'display:none');
    }

    }());

