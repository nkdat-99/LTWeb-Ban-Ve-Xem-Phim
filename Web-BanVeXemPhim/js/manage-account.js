$(document).ready(function() {
    try {
        accountJS = new AccountJS();
    } catch (e) {
        console.log(e);
    }


})

class AccountJS {
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
        $("#manageAccount tbody").on("click", "tr", this.selected);
        $("#manageAccount tbody, #btnAdd").click(this.hideAnnounce.bind(this));
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
        $('#manageAccount tbody').empty();
        $.ajax({
            url: "https://localhost:8443/api/account/",
            method: "GET",
            contentType: "application/json",
            dataType: "",
            async: false
        }).done(function(response) {
            $.each(response, function(index, item) {
                let i = index + 1;
                let rule = (item.rule) ? "Admin" : "Khách hàng";
                var trHTML = $(`<tr>
                    <td>` + i + `</td>
                    <td>` + item.username + `</td>
                    <td>` + item.name + `</td>
                    <td>` + rule + `</td>
                </tr>`);
                $('#manageAccount tbody').append(trHTML);
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
            url: "https://localhost:8443/api/account/" + id,
            method: "GET",
            contentType: "application/json",
            dataType: "",
            async: false
        }).done(function(res) {
            console.log(res);
            $('#txtUser').val(res.username);
            $('#txtPass').val(res.password);
            $('#txtName').val(res.name);
            $('#txtRule').val(res.rule);
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
        console.log(idSelected);
        $.ajax({
            url: "https://localhost:8443/api/account/" + idSelected,
            method: "DELETE",
            async: false
        }).done(function(res) {
            self.getAll();
            $(".title-announce").text("Xóa thành công!");
            $(".title-announce").css("display", "block");
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
        var account = new Object;
        let k = true;
        account.username = $('#txtUser').val();
        account.password = $('#txtPass').val();
        account.name = $('#txtName').val();
        account.rule = parseInt($('#txtRule').val());
        if (account.username == "") {
            k = false;
            $("#checkUser").show();
        } else
            $("#checkUser").hide();
        if (account.password == "") {
            k = false;
            $("#checkPass").show();
        } else
            $("#checkPass").hide();
        if (account.name == "") {
            k = false;
            $("#checkName").show();
        } else
            $("#checkName").hide();
        if (k) {
            $.ajax({
                url: "https://localhost:8443/api/register/",
                method: "POST",
                data: JSON.stringify(account),
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