var script = document.addEventListener('DOMContentLoaded', (e) => { // check if document ready by javascript






    // clear input elments method. 
    // this method call when form should to be reset
    function clearElements() {
        document.querySelector("#income").checked = false;
        document.querySelector("#cost").checked = false;
        document.querySelector("#amount").value = '';
        document.querySelector("#d-year").value = '';
        document.querySelector("#d-month").value = '';
        document.querySelector("#d-day").value = '';
        document.querySelector("#describe").value = '';
        document.querySelector("#tooman").style.display = "none";
        document.querySelector("#Num2persian").innerHTML = '';
    }

        


    // hide error elemets when recheck all of elements validation
    function hideErrorElements() {
        document.querySelectorAll('.element_erorr').forEach(function (el) {
            el.style.display = 'none';
        });

    }





    
    // form validation function
    // this fucntion when return true that data is valid
    function validation() {

        let valid = true;
        hideErrorElements();

        // income and cost radio button check
        if (!document.querySelector("#income").checked && !document.querySelector("#cost").checked) {
            document.querySelector("#error_type").style.display = "inline-block";
            valid = false;
        }

        // amount text check
        if (document.querySelector("#amount").value.length <= 0) {
            document.querySelector("#error_amount").style.display = "block";
            valid = false;
        }

        // date inputs check
        if ((document.querySelector("#d-year").value.length < 4) || 
            (document.querySelector("#d-month").value.length <= 0) ||  (document.querySelector("#d-month").value >12) ||  (document.querySelector("#d-month").value <1) ||
            (document.querySelector("#d-day").value.length <= 0) || (document.querySelector("#d-day").value >31) || (document.querySelector("#d-day").value <1) 
            ) {
            document.querySelector("#error_date").style.display = "inline-block";
            valid = false;
        }

        // amount text check
        if (document.querySelector("#describe").value.length <= 0) {
            document.querySelector("#error_describe").style.display = "inline-block";
            valid = false;
        }

        return valid;
    }






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




    // convert day field to 2digits if 1digit entered.
    document.querySelector("#d-day").addEventListener('focusout', function (event) {
        if (this.value.length == 1) this.value = '0' + this.value;
    });

    // convert day month to 2digits if 1digit entered.
    document.querySelector("#d-month").addEventListener('focusout', function (event) {
        if (this.value.length == 1) this.value = '0' + this.value;
    });


    // show error labale if year field lees than 4digists
    document.querySelector("#d-year").addEventListener('focusout', function (event) {
        if (this.value.length < 4) {
            document.querySelector("#error_date").style.display = "inline-block";
        }
    });



    // move cursor to month field if completed and correct day field entered.
    document.querySelector("#d-day").addEventListener('keyup', function (event) {
        if (this.value.length >= 2) document.querySelector("#d-month").focus();
    });

    // move cursor to year field if completed and correct month field entered.
    document.querySelector("#d-month").addEventListener('keyup', function (event) {
        if (this.value.length >= 2) document.getElementById("d-year").focus();
    });


    // move cursor to describe field if completed and correct year field entered.
    document.querySelector("#d-year").addEventListener('keyup', function (event) {
        if (this.value.length >= 4) document.getElementById("describe").focus();
    });



    // load data from local storage function
    function loadData() {
        return JSON.parse(localStorage.getItem("data") || "[]");
    }
   
    function saveData(data)
    {
        localStorage.setItem("data", JSON.stringify(data));
    }



    
    // define register button click event job
    // this function call when register button clicked
    
    document.querySelector("#RegButton").addEventListener('click', function (event) {
        if (validation()) {
            var data = loadData();
            var account = new Object();
            account.id = Date.now();
            account.type = document.querySelector("#income").checked ? 'درآمد' : 'هزینه';
            account.amount = removeComma(document.querySelector("#amount").value);
            account.date = document.querySelector("#d-year").value + '/' + document.querySelector("#d-month")
                .value + '/' + document.querySelector("#d-day").value;
            account.describe = document.querySelector("#describe").value;
            data.push(account);
            saveData(data);
            showDataGrid();
            clearElements();
        }
    });







    // show data from localstorage in a datagrid frame
    function showDataGrid() {
        
        var data = loadData();
        var row = '';
        document.getElementById('dataGrid').innerHTML = '';
        var i = 1;

        // add everyone records in row
        data.forEach(function (key, index, arr) {

            row = row + '<div class="row my-2" style="">';
            row = row + '<div class="col">' + i + '</div>';
            row = row + '<div class="col">' + addComma(arr[index].amount) + ' تومان '+  '</div>';
            row = row + '<div class="col">' + arr[index].date + '</div>';
            row = row + '<div class="col">' + arr[index].type + '</div>';
            row = row + '<div class="col">';

            row = row + '<button type="button" class="btn btn-primary btn-sm btn-show btn-show" data-bs-toggle="modal" data-bs-target="#confirmModal"'
                + ' RecID="' + arr[index].id + '" caption ="' + arr[index].describe + '" amount ="' + arr[index].amount + '" date ="' + arr[index].date + '">نمایش</button>';

            row = row + '<button type="button" class="btn btn-delete btn-sm" data-bs-toggle="modal" data-bs-target="#confirmModal"'
                + ' RecID="' + arr[index].id + '" caption ="' + arr[index].describe + '" amount ="' + arr[index].amount + '" date ="' + arr[index].date + '"> حذف </button>' + '</div>';
            row = row + ' </div>';
            i++;
        });
        document.getElementById('dataGrid').innerHTML = row;


        // define click event for all off button that have btn-show class (show buttons) to open bootstrap modal
        let btnShow = document.querySelectorAll(".btn-show");
        for (let i = 0; i < btnShow.length; i++) {
            btnShow[i].addEventListener("click", function () {
                document.getElementById('modal-body').innerHTML =  btnShow[i].getAttribute("caption") + ' -  ' + btnShow[i].getAttribute("amount") + '  تومان   ' + ' -  ' + ' به تاریخ: ' + btnShow[i].getAttribute("date");;
                document.getElementById('modal-body').setAttribute("RecID", btnShow[i].getAttribute("RecID"));
                document.getElementById('confirm').style.display = 'none';
                document.getElementById('cancel').innerHTML = 'برگشت';
                document.getElementById('modalLabel').style.display = 'none';
            });
        }

        // define click event for all off button that have btn-delete class (delete buttons) to open bootstrap modal
        let cbox = document.querySelectorAll(".btn-delete");
        for (let i = 0; i < cbox.length; i++) {
            cbox[i].addEventListener("click", function () {
                document.getElementById('modal-body').innerHTML =  cbox[i].getAttribute("caption") + ' -  ' + cbox[i].getAttribute("amount") + '  تومان   ' + ' -  ' + ' به تاریخ: ' + cbox[i].getAttribute("date");
                document.getElementById('modal-body').setAttribute("RecID", cbox[i].getAttribute("RecID"));
                document.getElementById('confirm').style.display = 'block';
                document.getElementById('cancel').innerHTML = 'لغو';
                document.getElementById('modalLabel').style.display = 'block';

            });
        }

        drawChart(); // draw chart after show datagrid
    }

 





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
