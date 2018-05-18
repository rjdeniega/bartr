/**
 * Created by JasonDeniega on 11/02/2017.
 */

$(document).ready(function () {

    signUp();

    function signUp() {
        $("#signupbutton").click(function () {
            var username = $("#username").val();
            var password = $("#password").val();
            var confirm = $("#confirm").val();
            var name = $("#name").val();

            errorval = errorCheck();
            if (errorval == 0) {

                generateCSRFToken();
                executeAjaxFunction();
                $("#errormsg").text('creation successful');

            } else {
                if (errorval == 2) {
                    $("#errormsg").text('Error : passwords do not match');
                } else if (errorval == 1) {
                    $("#errormsg").text('Error : all fields are required');

                }
            }
            return false;
        });
    }

    function errorCheck() {
        var username = $("#username").val();
        var password = $("#password").val();
        var confirm = $("#confirm").val();
        var name = $("#name").val();

        var errorval = 0;

        if (password != confirm) {
            errorval = 2;
        } else if (password == "" || username == "" || confirm == "" || name == "") {
            errorval = 1
        } else {
            errorval = 0
        }

        return errorval;
    }

    function csrfSafeMethod(method) {
        // these HTTP methods do not require CSRF protection
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }

    function generateCSRFToken() {
        var csrftoken = $.cookie('csrftoken');

        $.ajaxSetup({
            beforeSend: function (xhr, settings) {
                if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                    xhr.setRequestHeader("X-CSRFToken", csrftoken);
                }
            }
        });

    }

    function executeAjaxFunction() {
        var username = $("#username").val();
        var password = $("#password").val();
        var confirm = $("#confirm").val();
        var name = $("#name").val();

        const data = {
                    name: name,
                    username: username,
                    password: password
                };


        var url = createUserURL;
        $.ajax({
            url: url,
            type: "POST",
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function (data) {
                if(data["value"] == true){
                    $("#errormsg").text('Error : username already taken');
                }else{
                    window.location.href = "/profile"
                }

            }
            ,
            error: function (data) {
                console.log(data.responseText);
                console.log("everything went to shit");
            }

        })
        ;
    }


});