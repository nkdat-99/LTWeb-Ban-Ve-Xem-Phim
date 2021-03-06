$(document).ready(function() {
    try {
        loginJS = new LoginJS();
    } catch (e) {
        console.log(e);
    }
})

class LoginJS {
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
                $('#nameAccount').text(response.name);
                $('.sign-in-up').css("display", "none");
                $('.log-in').css("display", "block");
                if (response.rule) {
                    $("#muaVe").hide();
                    $("#quanLi").show();
                    $("#singInManager").css("display", "block");
                } else {
                    $("#quanLi").hide();
                    $("#muaVe").show();
                    $("#singInBuy").css("display", "block");
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
        if (k) {
            $.ajax({
                url: "https://localhost:8443/api/login/",
                method: "POST",
                data: JSON.stringify(account),
                contentType: "application/json",
            }).done(function(res) {
                if (res) {
                    $(".title-announce").text("Đăng nhập thành công!");
                    $(".dialog-body").hide();
                    $("#loginFalse").css("display", "none");
                    localStorage.setItem("idaccount", res);
                    self.getAccountId(res);
                } else {
                    $("#loginFalse").css("display", "block");
                }
            }).fail(function(res) {
                console.log(res);
            })
        }
    }
}