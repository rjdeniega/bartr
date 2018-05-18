/**
 * Created by JasonDeniega on 17/02/2017.
 */



$(document).ready(function () {
    AOS.init();
    AOS.refresh();


    var locator     = 0;
    var prevlocator = 0;
    var isScrolling;

    $("#anchor2").click(function () {
        $('html, body').animate(
            {scrollTop: $("#recentposts").offset().top},
            2500,
            function () {
            });

    });

    isScrolling = false;
    $("#scroll").click(function () {

        isScrolling = true;
    });
    $(window).resize(function(){
        isScrolling = true;
    });
    $(window).scroll(function () {
        restoreNavBarBG();

        if (isScrolling) return false;
        //from header to box
        if (locator == 0 && prevlocator == 0) {
            id          = $("#boxes"); // go to box from header
            locator     = 1; // box's locator
            prevlocator = 0; // from header

            // from box to recent post
        } else if (locator == 1) { // if box

            if (prevlocator == 0) {
                id          = $("#recentposts");
                locator     = 2;
                prevlocator = 1;

                //change navbarcss
                changeNavBar();


            } else {
                id          = $("#header");
                locator     = 0;
                prevlocator = 0;
                restoreNavBar()

            }

        } else if (locator == 2 && prevlocator == 1) {//recent post to boxes
            id          = $("#boxes");
            locator     = 1;
            prevlocator = 2;
            restoreNavBar()
        }

        // target element
        var $id = $(id);
        if ($id.length === 0) {
            return;
        }

        // top position relative to the document
        var pos = $id.offset().top;

        // animated top scrolling
        isScrolling = true;
        $('html, body').animate({scrollTop: pos}, 2000, function () {
            $('html, body').clearQueue();
            $('html, body').stop();
            isScrolling = false;
        });


    });

    function changeNavBar() {
        $('.contents button')
            .delay(1800)
            .queue(function (next) {
                $(this).css('color', 'var(--purple');
                $(this).css('font-family', 'SFUIDisplay-Bold');
                $('#logo').attr('src', '/static/Resources/fullpurple.png');
                next();
            });
    }

    function changeNavBarDefault() {
        $('.contents button')
            .delay(1800)
            .queue(function (next) {
                $(this).css('color', 'white');
                $(this).css('font-family', 'SFUIDisplay-Thin');
                $('#logo').attr('src', '../Resources/gradicon.png');
                next();
            });
    }

    function changeNavBarToRed() {
        $('.contents button')
            .delay(1800)
            .queue(function (next) {
                $(this).css('color', 'white');
                $(this).css('font-family', 'SFUIDisplay-Thin');
                $('#logo').attr('src', '../Resources/fullred.png');
                next();
            });
    }

    function restoreNavBar() {
        $('.contents button')
            .delay(1800)
            .queue(function (next) {
                $(this).css('color', 'white');
                $(this).css('font-family', 'SFUIDisplay-Thin');
                $('#logo').attr('src', '/static/Resources/fullred.png')
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

    function changeNavBarBG() {
        $('#navBar')
            .delay(1800)
            .queue(function (next) {
                $(this).css('background-color', 'rgba(0,0,0,0.4)');
                next();
            });
    }


});