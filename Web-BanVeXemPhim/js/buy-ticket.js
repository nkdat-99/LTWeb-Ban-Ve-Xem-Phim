$(document).ready(function() {
    try {
        baseJS = new BaseJS();
    } catch (e) {
        console.log(e);
    }
})

class BaseJS {
    constructor() {
        try {
            this.initEvents();
            this.getCinema();
            this.getAllBook();
            this.getFilm();
            this.getRoom();
            this.getShowtimes();
            this.room = null;
            this.book = null;
        } catch (e) {
            console.log(e);
        }
    }

    initEvents() {
        $("#listFilm").on("click", "a", this.btnFilm);
    }

    getCinema() {
        self = this;
        $.ajax({
            url: "https://localhost:8443/api/cinema/", // Đường dẫn địa chỉ
            method: "GET", // Phương thức
            contentType: "application/json", // Kiểu dữ liệu trả về
            dataType: "", // Kiểu dữ liệu của tham số
            async: false
        }).done(function(response) {
            $('#titleCinema').text('Rạp ' + response[0].name);
            $('#addressCinema').text('Địa chỉ: ' + response[0].address);
            $('#hotLine').text('Hotline: ' + response[0].hotline);
            $('#totalRoom').text('4');
            $('#totalSeat').text('240');
        }).fail(function(res) {
            console.log(res);
        })
    }

    getAllBook() {
        self = this;
        $.ajax({
            url: "https://localhost:8443/api/book/",
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

    getFilm() {
        self = this;
        $.ajax({
            url: "https://localhost:8443/api/film/",
            method: "GET",
            contentType: "application/json",
            dataType: "",
            async: false
        }).done(function(response) {
            $.each(response, function(index, item) {
                let iconFilm = 2;
                if (index % 2 == 1)
                    iconFilm = 1;
                if (index % 4 == 0)
                    iconFilm = 3;
                var trHTML = $(`<div class="film-` + iconFilm + `">
                <div class="title-film">
                    <i class="icon-film"></i>` + item.name + `
                </div>
                <div class="type-film">` + item.styles + `</div>
                <div class="list-schedule-film" id="idFilm-` + item.id + `">
                </div>
            </div>`);
                $('#listFilm').append(trHTML);
            })
        }).fail(function(res) {
            console.log(res);
        })
    }

    getRoom() {
        self = this;
        $.ajax({
            url: "https://localhost:8443/api/room/",
            method: "GET",
            contentType: "application/json",
            dataType: "",
            async: false
        }).done(function(response) {
            self.room = response;
        }).fail(function(res) {
            console.log(res);
        })
    }

    getShowtimes() {
        self = this;
        $.ajax({
            url: "https://localhost:8443/api/showtimes/",
            method: "GET",
            contentType: "application/json",
            dataType: "",
            async: false
        }).done(function(response) {
            $.each(response, function(index, item) {
                let idfilm = '#idFilm-' + item.idfilm;
                let itemRoom = self.room.filter(e => e.id == item.idroom);
                let itemCL = itemRoom[0].slg - self.book.filter(e => e.idshowtimes == item.id).length;
                console.log(itemCL);
                var trHTML = $(`<a class="list-info">
                    <div class="list-select-film info-room">Phòng ` + itemRoom[0].name + `</div>
                    <div class="list-select-film info-time">` + item.giochieu + `</div>
                    <div class="list-select-film info-seat">` + itemCL + `/` + itemRoom[0].slg + ` Ghế ngồi</div>
                </a>`);
                $(idfilm).append(trHTML);
                $(trHTML).data('id', item[Object.keys(item)[0]]);
                $(trHTML).data('room', item[Object.keys(item)[2]]);
            })
        }).fail(function(res) {
            console.log(res);
        })
    }

    btnFilm() {
        $(this).addClass('film-selected');
        var idSelected = $("a.film-selected");
        var idShowtimes = idSelected.data('id');
        var idRoom = idSelected.data('room');
        localStorage.setItem("idShowtimes", idShowtimes);
        localStorage.setItem("idRoom", idRoom);
        window.location.href = "/html/select-seat.html";
    }
}