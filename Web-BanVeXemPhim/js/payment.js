$(document).ready(function() {
    try {
        paymentJS = new PaymentJS();
    } catch (e) {
        console.log(e);
    }
})

class PaymentJS {
    constructor() {
        try {
            this.initEvents();
            this.getAccountId(localStorage.getItem("idaccount"));
        } catch (e) {
            console.log(e);
        }
    }

    initEvents() {
        $("#btnPayment").click(this.btnPayment.bind(this));
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

    btnPayment() {
        var objBook = new Object();
        objBook.idaccount = localStorage.getItem("idaccount");
        if (objBook.idaccount != null && objBook.idaccount != "null") {
            objBook.idshowtimes = parseInt(localStorage.getItem("idShowtimes"));
            objBook.idseat = parseInt(localStorage.getItem("idSeat"));
            objBook.pay_way = $("#payWay").val();
            objBook.total = parseFloat($("#totalTicket").text());
            objBook.date_pay = new Date();
            $.ajax({
                url: "https://localhost:8443/api/book/",
                method: "POST",
                data: JSON.stringify(objBook),
                contentType: "application/json",
            }).done(function(res) {
                localStorage.setItem("codeBooking", res);
                window.location.href = "/html/oke.html";
            }).fail(function(res) {
                console.log(res);
            })
        } else {
            $('.requi-text').text("* Bạn phải đăng nhập trước khi thanh toán");
        }
    }
}