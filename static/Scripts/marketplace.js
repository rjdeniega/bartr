/**
 * Created by JasonDeniega on 13/02/2017.
 */

$(document).ready(function () {
    const navBar = $("#navBar");
    const content = $('.contents');
    const logo = $('#logo');
    const searchbar = $('#searchbar');

    marketplaceActions();
    changeViewStyles();
    showSettingsOnHover();
    scrollChange();
    previewImageOnChange();
    submitPost();


    $("body").on("click", ".post", function () {
        $("#offermodaldiv").css('display', 'block');
        var key = $(this).find($(".idtag")).val();
        retrievePostInfo(key);
        submit_offer(key);
    });
    $("#close2").click(function () {
        $("#offermodaldiv").css('display', 'none')
    });
    $("#gadgets").click(function () {
        filterByCategory("Gadgets");
    });
    $("#clothing").click(function () {
        filterByCategory("Clothing");
    });
    $("#vehicles").click(function () {
        filterByCategory("Vehicles");
    });
    $("#collectibles").click(function () {
        filterByCategory("Collectibles");
    });
    $("#gaming").click(function () {
        filterByCategory("Gaming");
    });
    $("#others").click(function () {
        filterByCategory("Others");
    });

    $("#listicon").click(function(){

    });

    $("#searchbar").keypress(function(e) {
    if(e.which == 13) {
        if($(this).val != ""){
            searchByName($(this).val());
        }
    }
});


    function marketplaceActions() {
        $("#createpost").click(function () {
            $("#modaldiv").css('display', 'block');
        });
        $("#close").click(function () {
            $("#modaldiv").css('display', 'none');
        });

    }

    function showLoader() {
        setTimeout(function () {
            $('body').addClass('loaded');
        }, 3000, function () {

        });
    }

    function changeViewStyles() {
        $('#listicon').click(function () {
            $("#viewstyle").attr('href', "static Stylesheets/listVersion.css")
        });
        $('#tilesicon').click(function () {
            $('link[href="static/Stylesheets/listVersion.css"]').attr('href', 'static/Stylesheets/tileVersion.css');
        });

        $('#postdiv').animate({top: "0px"},
            1500
        );


        $('#listicon').click(function () {
            data = {
                stylesheet: "list"
            };
            console.log(JSON.stringify(data));
            generateCSRFToken();

            $.ajax({
                url: "/marketplace/",
                type: "POST",
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: function (data) {

                }
                ,
                error: function (data) {
                    console.log(data.responseText);
                    console.log("everything went to shit");
                }
            })
            ;
        });
    }

    function scrollChange() {
        $(window).scroll(function () {
            var sc = $(window).scrollTop();
            if (sc > 0) {
                morphNavBar();
            } else {
                revertNavBar();
            }
        });

    }

    function showSettingsOnHover() {
        $("#userpic").hover(function () {
            $("#usersettings").css('display', 'block')
        });
        $(document).click(function () {
            $("#usersettings").css('display', 'none')

        });
    }

    function morphNavBar() {
        navBar.css("background-color", "var(--gray)");
        navBar.css("height", "50px");
        navBar.css("height", "50px");
        // navBar.css("border-bottom","1px solid white");
        navBar.css("box-shadow", " 0 2px 2px 0 rgba(21, 21, 21, 0.5)");
        content.css("height", "50px");
        logo.css("height", "45px");
        logo.css("width", "45px");
        logo.css("top", "8%");
        $(".contents button").css("color","white");
        $(".contents button").css("font-family","SFUIDisplay-Thin");
        // $("#sidebar").css("height","649px");
        // $("#sidebar").css("top","50px");
        searchbar.css("color","white")

        $("#sidebar").animate({
            height: "649px",
            top: "50px"
        }, {queue: false, duration: 500});

        $(".link").css('display', 'none');
        $("#marketplacelink").css('top', '24%');
        searchbar.css('width', '500px');
        searchbar.css('top', '20%');
        searchbar.css('border', 'solid 1px var(--subtlered)');
        $("#searchicon").css('left', '59%');
        $("#searchicon").css('top', '30%');
        $("#searchicon").css('z-index', '999');
        $("#desc").css('display', 'none');
        $("#userpic").css('display', 'none');


    }

    function revertNavBar() {

        navBar.css("background-color", "#fafafa");
        navBar.css("height", "80px");
        navBar.css("height", "80px");
        navBar.css("box-shadow", " none");
        content.css("height", "80px");
        logo.css("height", "55px");
        logo.css("width", "60px");
        logo.css("top", "20%");
        $(".contents button").css("color","black");
        $(".contents button").css("font-family","SFUIDisplay-Regular");
        // $("#sidebar").css("height","614px");
        // $("#sidebar").css("top","85px");

        $("#sidebar").animate({
            height: "613px",
            top: "85px"
        }, {queue: false, duration: 500});

        $(".link").css('display', 'inline-block');
        // $(".link").css('top','55%');

        $("#marketplacelink").css('top', '35%');
        searchbar.css('top', '35%');
        searchbar.css('left', '23%');
        searchbar.css('width', '0px');
        searchbar.css('border', 'none');
        $("#searchicon").css('left', '23%');
        $("#searchicon").css('z-index', '-1');
        $("#searchicon").css('top', '37%');
        $("#desc").css('display', 'block');
        $("#userpic").css('display', 'block');
        searchbar.css("color","var(--gray");


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

    function previewImageOnChange() {
        $("#tradeimage").change(function () {
            readURL(this, $("#tradepreview"));
        });
        $("#receiveimage").change(function () {
            readURL(this, $("#receivepreview"));
        });
        $("#offerimage").change(function () {
            readURL(this, $("#offerpreview"));
        });

    }

    function readURL(input, preview) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                preview.attr('src', e.target.result);
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    function submitPost() {


        $('#submitpost').click(function () {
                var category = $('#categorydropdown').val();
                var tradename = $('#tradename').val();
                var receivename = $('#receivename').val();
                var description = $('#description').val();
                var tradeimage = $('#tradeimage');
                var receiveimage = $('#receiveimage');

                if (!errorCheck() && extractPhoto(tradeimage) && extractPhoto(receiveimage)) {
                    const form = new FormData();
                    // data = {
                    //     'tradename': tradename,
                    //     'receivename': receivename,
                    //     'description': description
                    // };
                    form.append('tradeimage', extractPhoto(tradeimage));
                    form.append('receiveimage', extractPhoto(receiveimage));
                    form.append('tradename', tradename);
                    form.append('receivename', receivename);
                    form.append('description', description);
                    form.append('category', category);


                    generateCSRFToken();
                    $.ajax({
                        url: '/submit_post/',
                        data: form,
                        type: "POST",
                        contentType: false,
                        processData: false,
                        success: function (data) {
                            $('#error').text("post successfully created");
                            location.reload();
                        },
                        error: function (data) {
                            console.log("somethings wrong with form")
                        }
                    });

                }

            }
        );
    }

    function errorCheck() {
        var tradename = $('#tradename').val();
        var receivename = $('#receivename').val();
        var description = $('#description').val();

        if (tradename == "") {
            $("#error").text("Error: name of trade item required");
            return true;
        } else if (receivename == "") {
            $("#error").text("Error: name of requested item required");
            return true;
        } else if (description == "") {
            $("#error").text("Please provide a description for trade");
            return true;
        }
        return false;

    }

    function extractPhoto(input) {
        var files = input[0].files;
        if (!files.length) {
            alert('Unable to upload: no image/s selected');
            return false;
        }
        return files[0]
    }

    function retrievePostInfo(key) {

        keydict = {
            'key': key
        };
        generateCSRFToken();
        $.ajax({
            url: '/retrieve_post/',
            method: "POST",
            data: JSON.stringify(keydict),
            success: function (data) {
                $("#postitemname").text(data["tradename"].toUpperCase());
                $("#postcategory").text(data["category"]);
                $("#postdescription").html(data["description"]);
                $("#postimage").attr('src', data["image"]);
                $("#postimagesample").attr('src', data["offer_preview"]);
                $("#offermodaluserimage").attr('src',data["userimage"]);
                $("#offermodalusername").html(data["username"]);
            },
            error: function () {
                console.log("shit")
            }
        })

    }

    function offerErrorCheck() {
        var offername = $('#offername').val();
        var offerdescription = $('#offerdescription').val();

        if (offername == "") {
            $("#error2").text("Error: name of trade item required");
            return true;
        } else if (offerdescription == "") {
            $("#error2").text("Please provide a description for trade");
            return true;
        }
        return false;
    }

    function submit_offer(key) {
        $('#submitoffer').click(function () {
                var offername = $('#offername').val();
                var offerdescription = $('#offerdescription').val();
                var offerimage = $('#offerimage');

                if (!offerErrorCheck() && extractPhoto(offerimage)) {
                    const form = new FormData();

                    form.append('offerimage', extractPhoto(offerimage));
                    form.append('offername', offername);
                    form.append('offerdescription', offerdescription);
                    form.append('key', key);

                    generateCSRFToken();
                    $.ajax({
                        url: '/submit_offer/',
                        data: form,
                        type: "POST",
                        contentType: false,
                        processData: false,
                        success: function (data) {
                            console.log(data);
                            $('#error2').text("offer sent to user");
                            $('#offermodaldiv').css('display',"none");
                        },
                        error: function (data) {
                            console.log("somethings wrong with form")
                        }
                    });

                }

            }
        );


    }

    function filterByCategory(key) {
        dict = {
            'key': key// pk value of post sent to retrieve offers to it
        };

        generateCSRFToken();
        $.ajax({
            url: "/get_by_category/",
            method: "POST",
            data: JSON.stringify(dict),
            success: function (data) {
                data = JSON.parse(data);
                console.log(data);
                $("#postdiv").empty();
                for (var i = 0; i < data.length; i++) {
                    $("#postdiv").append(
                        "<div class='post'>" +
                        "<input type='text' class='idtag' value='" + data[i].pk + "'>" +
                        "<div class='userinfo'>" +
                        "<div class='username'>" + data[i].fields.author_name + "</div>" +
                        "<p>"+data[i].fields.date_submitted+"</p>" +
                        "</div>" +
                        "<div class='postinfo'>"+
                        "<div class='itemdescription'>" + data[i].fields.trade_item_name + "</div>" +
                        "<div class='text2'>for</div>" +
                        "<div class='tradedescription'>" + data[i].fields.receive_item_name + "</div>" +
                        "<button class='makeoffer'>Make Offer</button>" +
                        "</div>" +
                        "<img src='" + data[i].fields.trade_item_url + "' class='tradeitem'>" +
                        "<img src='" + data[i].fields.receive_item_url + "' class='receivingitem'>" +
                        "</div>"
                    );
                    appendUserImage(i, data[i].fields.author);

                }
            },
            error: function () {
            }

        })
    }

    function appendUserImage(i, key) {
        dict = {
            'key': key
        };
        console.log(key);
        generateCSRFToken();
        $.ajax({
            url: "/get_user/",
            method: "POST",
            data: JSON.stringify(dict),
            success: function (data) {
                $('<img />', {
                    src: data["image"],
                    class: "userposticon"
                }).appendTo($('.post:nth-child(' + (i + 1) + ')').find($(".userinfo")));

            },
            error: function () {
            }

        });

    }

    function searchByName(key){
         dict = {
            'key': key// pk value of post sent to retrieve offers to it
        };

        generateCSRFToken();
        $.ajax({
            url: "/get_by_name/",
            method: "POST",
            data: JSON.stringify(dict),
            success: function (data) {
                data = JSON.parse(data);
                console.log(data);
                $("#postdiv").empty();
                for (var i = 0; i < data.length; i++) {
                    $("#postdiv").append(
                        "<div class='post'>" +
                        "<input type='text' class='idtag' value='" + data[i].pk + "'>" +
                        "<div class='userinfo'>" +
                        "<div class='username'>" + data[i].fields.author_name + "</div>" +
                        "<p>"+ data[i].fields.date_submitted+ "</p>" +
                        "</div>" +
                        "<div class='postinfo'>"+
                        "<div class='itemdescription'>" + data[i].fields.trade_item_name + "</div>" +
                        "<div class='text2'>for</div>" +
                        "<div class='tradedescription'>" + data[i].fields.receive_item_name + "</div>" +
                        "<button class='makeoffer'>Make Offer</button>" +
                        "</div>" +
                        "<img src='" + data[i].fields.trade_item_url + "' class='tradeitem'>" +
                        "<img src='" + data[i].fields.receive_item_url + "' class='receivingitem'>" +
                        "</div>"
                    );
                    appendUserImage(i, data[i].fields.author);

                }
            },
            error: function () {
            }

        })
    }

});
