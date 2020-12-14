$(document).ready(function() {
    try {
        filmJS = new FilmJS();
    } catch (e) {
        console.log(e);
    }
})

class FilmJS {
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
        $("#manageFilm tbody").on("click", "tr", this.selected);
        $("#manageFilm tbody, #btnAdd").click(this.hideAnnounce.bind(this));
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

    getAll() {
        self = this;
        $('#manageFilm tbody').empty();
        $.ajax({
            url: "https://localhost:8443/api/film/",
            method: "GET",
            contentType: "application/json",
            dataType: "",
            async: false
        }).done(function(response) {
            $.each(response, function(index, item) {
                let i = index + 1;
                var trHTML = $(`<tr>
                    <td>` + i + `</td>
                    <td>` + item.name + `</td>
                    <td>` + item.time + `</td>
                    <td>` + item.price + `</td>
                    <td>` + item.styles + `</td>
                </tr>`);
                $('#manageFilm tbody').append(trHTML);
                $(trHTML).data('key', item[Object.keys(item)[0]]);
            })
        }).fail(function(res) {
            console.log(res);
        })

    }

    btnAdd() {
        $(".dialog-modal").show();
        $(".dialog").show();
    }

    btnEdit() {
        $(".dialog-modal").show();
        $(".dialog").show();
        var trSelected = $("tr.row-selected");
        var id = trSelected.data('key');
        $.ajax({
            url: "https://localhost:8443/api/film/" + id,
            method: "GET",
            contentType: "application/json",
            dataType: "",
            async: false
        }).done(function(res) {
            $('#txtNameFilm').val(res.name);
            $('#txtTime').val(res.time);
            $('#txtPrice').val(res.price);
            $('#txtStyle').val(res.styles);
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
            url: "https://localhost:8443/api/film/" + idSelected,
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
        $("input").val("");
    }

    btnSave() {
        self = this;
        var item = new Object;
        let k = true;
        item.name = $('#txtNameFilm').val();
        item.time = $('#txtTime').val();
        item.price = $('#txtPrice').val();
        item.styles = $('#txtStyle').val();
        if (item.name == "") {
            k = false;
            $("#checkNameFilm").show();
        } else
            $("#checkNameFilm").hide();
        if (item.time == "") {
            k = false;
            $("#checkTime").show();
        } else
            $("#checkTime").hide();
        if (item.price == "") {
            k = false;
            $("#checkPrice").show();
        } else
            $("#checkPrice").hide();
        if (k) {
            $.ajax({
                url: "https://localhost:8443/api/film/",
                method: "POST",
                data: JSON.stringify(item),
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
}