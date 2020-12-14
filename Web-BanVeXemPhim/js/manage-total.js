$(document).ready(function() {
    try {
        manageTotalJS = new ManageTotal();
    } catch (e) {
        console.log(e);
    }
})

class ManageTotal {
    constructor() {
        try {
            this.initEvents();
            this.getAll();
            this.getAccountId(localStorage.getItem("idaccount"));
        } catch (e) {
            console.log(e);
        }
    }

    initEvents() {
        $("#logOut").click(this.btnLogOut.bind(this));
    }

    getAccountId(x) {
        if (x != null && x != "null") {
            self = this;
            $.ajax({
                url: "https://localhost:8443/api/account/" + x,
                method: "GET",
                contentType: "application/json",
                dataType: "",
                async: false
            }).done(function(response) {
                console.log(response);
                $('#nameAccount').text(response.name);
                $('.sign-in-up').css("display", "none");
                $('.log-in').css("display", "block");
                if (response.rule) {
                    $("#muaVe").hide();
                } else {
                    $("#quanLi").hide();
                }
            }).fail(function(res) {
                console.log(res);
            })
        } else {
            $('.sign-in-up').css("display", "block");
            $('.log-in').css("display", "none");
            $("#quanLi").hide();
        }
    }

    btnLogOut() {
        localStorage.setItem("idaccount", null);
        $('.sign-in-up').css("display", "block");
        $('.log-in').css("display", "none");
    }

    getAll() {
        self = this;
        $.ajax({
            url: "https://localhost:8443/api/book/",
            method: "GET",
            contentType: "application/json",
            dataType: "",
            async: false
        }).done(function(response) {
            for (let i = 1; i <= 7; i++) {
                let dateOffset = (24 * 60 * 60 * 1000) * (i - 1);
                let myDate = new Date();
                myDate.setTime(myDate.getTime() + dateOffset);
                let listTotal = response.filter(e => self.formatDate(e.date_pay) == self.formatDate2(myDate));
                let total = 0;
                $.each(listTotal, function(index, item) {
                    total += item.total;
                })
                var trHTML = $(`<tr>
                <td>` + i + `</td>
                <td>` + self.formatDate2(myDate) + `</td>
                <td>` + listTotal.length + `</td>
                <td>` + total + `</td>
            </tr>`);
                $('#manageTotal').append(trHTML);
            }
        }).fail(function(res) {
            console.log(res);
        })
    }

    formatDate(valTime) {
        var date = new Date(valTime);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        m = (m < 10) ? '0' + m : m;
        d = (d < 10) ? '0' + d : d;
        return [d, m, y].join(' - ');
    }

    formatDate2(date) {
        var d = date.getDate();
        var m = date.getMonth() + 1;
        var y = date.getFullYear();
        var dateString = (d <= 9 ? '0' + d : d) + ' - ' + (m <= 9 ? '0' + m : m) + ' - ' + y;
        return dateString;
    }
}