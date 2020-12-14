$(document).ready(function() {
    try {
        selectJS = new SelectJS();
    } catch (e) {
        console.log(e);
    }
})

class SelectJS {
    constructor() {
        try {
            this.initEvents();
            this.getBook();
            this.getSeat();
            this.getAccountId(localStorage.getItem("idaccount"));
            this.book = null;
        } catch (e) {
            console.log(e);
        }
    }

    initEvents() {
        $("#seat").on("click", "td", this.seatSelect);
        $("#btnPay").click(this.btnPay.bind(this));
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

    getBook() {
        self = this;
        let x = localStorage.getItem("idShowtimes");
        $.ajax({
            url: "https://localhost:8443/api/book/" + x,
            method: "GET",
            contentType: "application/json",
            dataType: "",
            async: false
        }).done(function(response) {
            self.book = response;
        }).fail(function(res) {
            console.log(res);
        })
    }

    getSeat() {
        self = this;
        let x = localStorage.getItem("idRoom");
        $.ajax({
            url: "https://localhost:8443/api/seat/" + x,
            method: "GET",
            contentType: "application/json",
            dataType: "",
            async: false
        }).done(function(response) {
            self.seat = response;
            var idrow = 0;
            $.each(response, function(index, item) {
                let seatSelected = "";
                $.each(self.book, function(i, list) {
                    if (list.idseat == item.id) {
                        seatSelected = "seat-no-selected";
                    }
                })
                if (index % 6 == 0) {
                    idrow++;
                    $('#seat').append(`<tr id=row` + idrow + `></tr>`);
                }
                var td = $(`<td id="` + item.id + `" class="` + seatSelected + `">` + item.name + `</td>`);
                $(`#row` + idrow + ``).append(td);
                $(td).data('key', item[Object.keys(item)[0]]);
            })
        }).fail(function(res) {
            console.log(res);
        })
    }

    seatSelect() {
        if (!$(this).hasClass("seat-no-selected")) {
            $('td.seat-selected').removeClass('seat-selected');
            $(this).addClass('seat-selected');
        }
        $('.require-seat').hide();
    }

    btnPay() {
        var tdSelected = $("td.seat-selected");
        var idSelected = tdSelected.data('key');
        if (idSelected != null) {
            localStorage.setItem("idSeat", idSelected);
            window.location.href = "/html/payment.html";
        } else {
            $('.require-seat').show();
        }
    }
}