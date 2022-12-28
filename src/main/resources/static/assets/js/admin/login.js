jQuery(document).ready(function($) {
    var validator = $("#form-login").validate({
        errorClass : "error-message",
        onsubmit: true,
        rules: {
            username: {
                required: true
            },
            password: {
                required: true
            }
        },
        messages: {
            username: {
                required: "Vui lòng nhập tài khoản"
            },
            password: {
                required: "Vui lòng nhập mật khẩu"
            }
        }
    })

    $("#btn-login").on("click", function (e) {
        e.preventDefault();
        if($("#form-login").valid()) {
            loginAccount();
        }
    })

    function loginAccount() {
        var username = $("#username").val();
        var password = $("#password").val();
        var data = {
            username: username,
            password: password
        }
        $.ajax({
            url: "http://localhost:8080/api/v1/login",
            method: 'post',
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json"

        }).done(function (data) {
            console.log( data);
            localStorage.setItem("token", data.token);
            var expDate = new Date();

            expDate.setTime(expDate.getTime() + (1 *60* 60 * 1000));
            $.cookie("token_user", data.token, {expires: expDate, path: '/'    });
            // window.open("http://localhost:9090/admin/accountManagement");
            window.location.replace("http://localhost:9090/admin/accountManagement");
        }) .fail(function (error) {
            console.log("ERROR "  + error)
        })
    }
})