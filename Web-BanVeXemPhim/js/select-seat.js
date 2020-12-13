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
            this.book = null;
        } catch (e) {
            console.log(e);
        }
    }

    initEvents() {
        $("#seat").on("click", "td", this.seatSelect);
        $("#btnPay").click(this.btnPay.bind(this));
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