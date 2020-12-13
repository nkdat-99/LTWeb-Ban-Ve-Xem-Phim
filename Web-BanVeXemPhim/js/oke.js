$(document).ready(function() {
    try {
        okeJS = new OkeJS();
    } catch (e) {
        console.log(e);
    }
})

class OkeJS {
    constructor() {
        try {
            $("#code-ticket").text(localStorage.getItem("codeBooking"));
        } catch (e) {
            console.log(e);
        }
    }
}