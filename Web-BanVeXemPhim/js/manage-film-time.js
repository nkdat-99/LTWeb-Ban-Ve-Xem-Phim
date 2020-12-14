$(document).ready(function() {
    try {
        filmTimeJS = new FilmTimeJS();
    } catch (e) {
        console.log(e);
    }
})

class FilmTimeJS {
    constructor() {
        try {
            this.initEvents();
            this.getAll();
            this.getAllFilm();
            this.getAllRoom();
            this.getAccountId(localStorage.getItem("idaccount"));
            this.film = null;
            this.room = null;
        } catch (e) {
            console.log(e);
        }
    }

    initEvents() {
        $("#manageFilmTime tbody").on("click", "tr", this.selected);
        $("#manageFilmTime tbody, #btnAdd").click(this.hideAnnounce.bind(this));
        $("#btnAdd").click(this.btnAdd.bind(this));
        $("#btnDelete").click(this.btnDelete.bind(this));
        $("#btnEdit").click(this.btnEdit.bind(this));
        $("#btnCancel").click(this.btnCancel.bind(this));
        $("#btnSave").click(this.btnSave.bind(this));
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

    getAllFilm() {
        self = this;
        $.ajax({
            url: "https://localhost:8443/api/film/",
            method: "GET",
            contentType: "application/json",
            dataType: "",
            async: false
        }).done(function(response) {
            $.each(response, function(index, item) {
                var trHTML = $(`<option value="` + item.id + `"> ` + item.name + `</option>`);
                $('#txtFilm').append(trHTML);
            })
        }).fail(function(res) {
            console.log(res);
        })
    }

    getAllRoom() {
        self = this;
        $.ajax({
            url: "https://localhost:8443/api/room/",
            method: "GET",
            contentType: "application/json",
            dataType: "",
            async: false
        }).done(function(response) {
            $.each(response, function(index, item) {
                var trHTML = $(`<option value="` + item.id + `"> ` + item.name + `</option>`);
                $('#txtRoom').append(trHTML);
            })
        }).fail(function(res) {
            console.log(res);
        })
    }

    getFilm(x) {
        self = this;
        $.ajax({
            url: "https://localhost:8443/api/film/" + x,
            method: "GET",
            contentType: "application/json",
            dataType: "",
            async: false
        }).done(function(response) {
            self.film = response;
        }).fail(function(res) {
            console.log(res);
        })
    }

    getRoom(x) {
        self = this;
        $.ajax({
            url: "https://localhost:8443/api/room/" + x,
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

    getAll() {
        self = this;
        $('#manageFilmTime tbody').empty();
        $.ajax({
            url: "https://localhost:8443/api/showtimes/",
            method: "GET",
            contentType: "application/json",
            dataType: "",
            async: false
        }).done(function(response) {
            $.each(response, function(index, item) {
                let i = index + 1;
                self.getFilm(item.idfilm);
                self.getRoom(item.idroom);
                var trHTML = $(`<tr>
                    <td>` + i + `</td>
                    <td>` + self.film.name + `</td>
                    <td>` + self.room.name + `</td>
                    <td>` + item.giochieu + `</td>
                    <td>` + self.formatDate(item.ngaychieu) + `</td>
                </tr>`);
                $('#manageFilmTime tbody').append(trHTML);
                $(trHTML).data('key', item[Object.keys(item)[0]]);
            })
        }).fail(function(res) {
            console.log(res);
        })
    }

    btnAdd() {
        $("input").val("");
        $(".dialog-modal").show();
        $(".dialog").show();
    }

    btnEdit() {
        self = this;
        $("input").val("");
        $(".dialog-modal").show();
        $(".dialog").show();
        var trSelected = $("tr.row-selected");
        var id = trSelected.data('key');
        $.ajax({
            url: "https://localhost:8443/api/showtimes/" + id,
            method: "GET",
            contentType: "application/json",
            dataType: "",
            async: false
        }).done(function(res) {
            $('#txtFilm').val(res.idfilm);
            $('#txtRoom').val(res.idroom);
            $('#txtTime').val(res.giochieu);
            $('#txtDate').val(self.formatDate(res.ngaychieu));
            console.log(self.formatDate(res.ngaychieu))
        }).fail(function(res) {
            console.log(res);
        })
    }

    selected() {
        $('tr.row-selected').removeClass('row-selected');
        $(this).addClass('row-selected');
    }

    btnDelete() {
        self = this;
        var tdSelected = $("tr.row-selected");
        var idSelected = tdSelected.data('key');
        $.ajax({
            url: "https://localhost:8443/api/showtimes/" + idSelected,
            method: "DELETE",
            async: false
        }).done(function(res) {
            console.log(res);
            $(".title-announce").css("display", "block");
            $(".title-announce").text("Xóa thành công!");
            self.getAll();
        }).fail(function(res) {
            console.log(res);
        })
    }

    btnCancel() {
        $(".dialog-modal").hide();
        $(".dialog").hide();
    }

    btnSave() {
        self = this;
        var showTime = new Object;
        let k = true;
        showTime.idfilm = $('#txtFilm').val();
        showTime.idroom = $('#txtRoom').val();
        showTime.giochieu = $('#txtTime').val();
        showTime.ngaychieu = $('#txtDate').val();
        if (showTime.giochieu == "") {
            k = false;
            $("#checkTime").show();
        } else
            $("#checkTime").hide();
        if (showTime.ngaychieu == "") {
            k = false;
            $("#checkDate").show();
        } else
            $("#checkDate").hide();
        console.log(showTime);
        if (k) {
            $.ajax({
                url: "https://localhost:8443/api/showtimes/",
                method: "POST",
                data: JSON.stringify(showTime),
                contentType: "application/json",
            }).done(function(res) {
                self.getAll();
                $(".title-announce").text("Thêm thành công!");
                $(".title-announce").css("display", "block");
                $(".dialog-modal").hide();
                $(".dialog").hide();
            }).fail(function(res) {
                console.log(res);
            })
        }
    }

    hideAnnounce() {
        $(".title-announce").css("display", "none");
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
        var dateString = (d <= 9 ? '0' + d : d) + '-' + (m <= 9 ? '0' + m : m) + '-' + y;
        return dateString;
    }
}