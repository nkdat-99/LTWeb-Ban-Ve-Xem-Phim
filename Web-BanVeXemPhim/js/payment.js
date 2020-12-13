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
        } catch (e) {
            console.log(e);
        }
    }

    initEvents() {
        $("#btnPayment").click(this.btnPayment.bind(this));
    }

    btnPayment() {
        var objBook = new Object();
        objBook.idaccount = 1;
        objBook.idshowtimes = parseInt(localStorage.getItem("idShowtimes"));
        objBook.idseat = parseInt(localStorage.getItem("idSeat"));
        objBook.pay_way = $("#payWay").val();
        objBook.total = parseFloat($("#totalTicket").text());
        console.log(objBook);
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
    }
}