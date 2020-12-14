$(document).ready(function() {
    try {
        singUpJS = new SingUpJS();
    } catch (e) {
        console.log(e);
    }
})

class SingUpJS {
    constructor() {
        try {
            this.initEvents();
            this.getAccountId(localStorage.getItem("idaccount"));
        } catch (e) {
            console.log(e);
        }
    }

    initEvents() {
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

    btnCancel() {
        $("input").val("");
    }

    btnSave() {
        self = this;
        var account = new Object;
        let k = true;
        account.username = $('#txtUser').val();
        account.password = $('#txtPass').val();
        var repassword = $('#txtRePass').val();
        account.name = $('#txtName').val();
        account.rule = 0;
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
        if (account.password != repassword) {
            k = false;
            $("#checkRePass").show();
        } else
            $("#checkRePass").hide();
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
                if (res) {
                    $(".title-announce").text("Đăng kí tài khoản thành công!");
                    $("#singIn").css("display", "block");
                    $(".dialog-body").hide();
                } else {
                    $("#singupFalse").css("display", "block");
                }
            }).fail(function(res) {
                console.log(res);
            })
        }
    }
}