$(document).ready(function() {
    try {
        manageTicketJS = new ManageTicket();
    } catch (e) {
        console.log(e);
    }


})

class ManageTicket {
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
            url: "https://localhost:8443/api/getall/",
            method: "GET",
            contentType: "application/json",
            dataType: "",
            async: false
        }).done(function(response) {
            $.each(response, function(index, item) {
                var trHTML = $(`<tr>
                <td>` + item.id + `</td>
                <td>` + item.name + `</td>
                <td>` + item.filmname + `</td>
                <td>` + item.time + `</td>
                <td>` + self.formatDate(item.date) + `</td>
                <td>` + item.roomname + `</td>
                <td>` + item.seatname + `</td>
                <td>` + item.total + `</td>
            </tr>`);
                $('#manageTicket').append(trHTML);
            })
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
}