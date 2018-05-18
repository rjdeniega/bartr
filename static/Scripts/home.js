/**
 * Created by JasonDeniega on 05/02/2017.
 */


//removed comments at feb 6 2:22PM

$(document).ready(function () {

    showSettingsOnHover();
    homeActions();
    slideShow();

    $("#loginbutton").click(function () {
        generateCSRFToken();
        executeAjaxFunction();
    });

    function slideShow() {
        //1st Slide
        const slider1 = $("#slider1");
        const slider2 = $("#slider2");
        const slider3 = $("#slider3");
        const slideshow1 = $("#slideshow1");
        const slideshow2 = $("#slideshow2");
        const slideshow3 = $("#slideshow3");
        const header = $("#header");
        var indicator = 1;
        const login = $("#login");

        slider1.click(function () {

            restoreNavBarBG();
            if (indicator === 2) { // If from slide 2
                indicator = 1;
                cascade(slideshow2, slideshow1, slider2, slider1);

            } else if (indicator === 3) { //If from slide 3
                indicator = 1;
                cascade(slideshow3, slideshow1, slider3, slider1);
            }
        });


        //2nd Slide
        slider2.click(function () {
            changeNavBarBG();

            $("#background2").css("display", "block").delay(5000);
            $("#heading2").css("display", "block").delay(5000);
            $("#subheading2").css("display", "block").delay(5000);

            if (indicator === 1) { // If from slide 1
                indicator = 2;
                cascade(slideshow1, slideshow2, slider1, slider2);


            } else if (indicator === 3) { //If from slide 3
                indicator = 2;
                cascade(slideshow3, slideshow2, slider3, slider2);
            }
        });


        //3rd Slide
        slider3.click(function () {
            changeNavBarBG();

            //Make slide 3 visible
            $("#background3").css("display", "block").delay(3000);
            $("#heading3").css("display", "block").delay(3000);
            $("#subheading3").css("display", "block").delay(3000);

            if (indicator === 1) { // If from slide 1
                indicator = 3;
                cascade(slideshow1, slideshow3, slider1, slider3);

            } else if (indicator === 2) { //If from slide 2
                indicator = 3;
                cascade(slideshow2, slideshow3, slider2, slider3);
            }
        });

    }

    function homeActions() {
        const slider1 = $("#slider1");
        const slider2 = $("#slider2");
        const slider3 = $("#slider3");
        const slideshow1 = $("#slideshow1");
        const slideshow2 = $("#slideshow2");
        const slideshow3 = $("#slideshow3");
        const header = $("#header");
        var indicator = 1;
        const login = $("#login");

        $("#anchor").click(function () {
            $('html, body').animate(
                {scrollTop: $("#boxes").offset().top},
                2500,
                function () {

                });
        });
        $(login).click(function () {
            $("#modaldiv").css("display", "block");
            $("html,body").css('overflow', 'hidden');
        });

        $("#close").click(function () {
            $("#modaldiv").css("display", "none");
            $("html,body").css('overflow', 'auto');
        });

    }

    function cascade(prevslide, currentslide, prevslider, currentslider) {
        prevslide.fadeOut(2000, function () {
            currentslide.fadeIn(1000);
        });
        currentslider.css("background-color", "lightgray");
        prevslider.removeAttr('disabled');
        prevslider.css("background-color", "var(--subtlered)");
    }

    function changeNavBarBG() {
        $('#navBar')
            .delay(1800)
            .queue(function (next) {
                $(this).css('background-color', 'rgba(0,0,0,0.4)');
                next();
            });
    }

    function changeNavBarBGGray() {
        $('#navBar')
            .delay(1800)
            .queue(function (next) {
                $(this).css('background-color', 'rgba(109,151,255,0.2)');
                next();
            });
    }

    function restoreNavBarBG() {
        $('#navBar')
            .delay(1800)
            .queue(function (next) {
                $(this).css('background-color', 'transparent');
                $('#separator').css('background-color', 'transparent');
                next();
            });
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


        const data = {
            username: username,
            password: password
        };


        $.ajax({
            url: '/log_in/',
            type: "POST",
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function (data) {
                if (data["status"] == "Found") {
                    console.log(data["username"]);
                    window.location.href = "/marketplace";
                } else {
                    $("#error").text("User not found")
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

    function showSettingsOnHover() {
        $("#userpic").hover(function () {
            $("#usersettings").css('display', 'block')
        });
        $(document).click(function () {
            $("#usersettings").css('display', 'none')

        });
    }

});

