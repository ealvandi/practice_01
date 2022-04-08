var script = document.addEventListener('DOMContentLoaded', (e) => { // check if document ready by javascript






    // Apply data entry restrictions to numbers only for amount field
    document.querySelector("#amount").addEventListener('keydown', function (event) {
        justNumber(event);
    });

    // Apply data entry restrictions to numbers only for day field
    document.querySelector("#d-day").addEventListener('keydown', function (event) {
        justNumber(event);
    });

    // Apply data entry restrictions to numbers only for day month
    document.querySelector("#d-month").addEventListener('keydown', function (event) {
        justNumber(event);
    });

    // Apply data entry restrictions to numbers only for day year
    document.querySelector("#d-year").addEventListener('keydown', function (event) {
        justNumber(event);
    });




    // add comma to 3rd part digits function
    function addComma(Num) {
        Num += '';
        Num = Num.replace(',', '');
        Num = Num.replace(',', '');
        Num = Num.replace(',', '');
        Num = Num.replace(',', '');
        Num = Num.replace(',', '');
        Num = Num.replace(',', '');
        var x = Num.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1))
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        return x1 + x2;
    };

    // remove comma from 3rd part digits function
    function removeComma(str) {
        return str.replaceAll(',', '');
    }

});
