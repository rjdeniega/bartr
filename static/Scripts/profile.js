/**
 * Created by JasonDeniega on 25/03/2017.
 */
$(document).ready(function () {


    showSettingsOnHover();
    changeUserCredentials();
    changeProfilePicture();
    accessModal();
    previewImageOnChange();

    $(".post").click(function () {
        var key = $(this).find($(".idtag")).val();
        $("#offercontainer").empty();
        getOffers(key);
    });
    $("body").on("click", ".offer", function () {
        $("#offermodaldiv").css('display', 'block');
        var key = $(this).find($(".offerpk")).text();
        getOfferInfo(key);
    });


    function showSettingsOnHover() {
        $("#userpic").hover(function () {
            $("#usersettings").css('display', 'block')
        });
        $(document).click(function () {
            $("#usersettings").css('display', 'none')

        });
    }

    function changeUserCredentials() {
        $("#savebutton").click(function () {
            if (!errorCheck()) {

                var contactnumber = $("#contactnumber").val();
                var email = $("#email").val();
                var name = $("#name").val();

                data = {
                    'contact_number': contactnumber,
                    'email': email,
                    'name': name
                };
                generateCSRFToken();

                $.ajax({
                    url: "/save_credentials/",
                    type: "POST",
                    data: JSON.stringify(data),
                    success: function (data) {
                        console.log(data["name"]);
                        $("#error").text('Information Saved');
                        $("#username").html(data["name"]);
                    }
                    ,
                    error: function (data) {
                        console.log(data.responseText);
                        console.log("everything went to shit");
                    }
                })
            }

        });
    }

    function errorCheck() {
        var contactnumber = $("#contactnumber").val();
        var email = $("#email").val();
        var name = $("#name").val();


        if (name == "") {
            $("#error").text('name cannot be blank');
            return true;
        } else if (contactnumber == "") {
            $("#error").text('contact number is required');
            return true;
        } else if (email == "") {
            $("#error").text('email is required');
            return true;
        }

        return false;

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

    function changeProfilePicture() {
        var image = $("#image");
        $("#uploadbutton").click(function () {
            const form = new FormData();
            form.append('image', extractPhoto(image));

            generateCSRFToken();
            $.ajax({
                url: '/upload_photo/',
                data: form,
                type: "POST",
                contentType: false,
                processData: false,
                success: function (data) {
                    location.reload();
                },
                error: function (data) {

                }

            })
        });
    }

    function extractPhoto(input) {
        var files = input[0].files;
        if (!files.length) {
            alert('Unable to upload: no file selected');
            return;
        }
        return files[0]
    }

    function previewImageOnChange() {
        $("#image").change(function () {
            readURL(this);
        })

    }

    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#preview').attr('src', e.target.result);
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    function accessModal() {
        $("#profilepicture").click(function () {
            $("#modaldiv").css('display', 'block');
        });
        $("#close").click(function () {
            $("#modaldiv").css('display', 'none');
        });
        $("#close2").click(function () {
            $("#offermodaldiv").css('display', 'none');
        });
    }

    function getOffers(key) {
        dict = {
            'key': key// pk value of post sent to retrieve offers to it
        };

        generateCSRFToken();
        $.ajax({
            url: "/retrieve_offers/",
            method: "POST",
            data: JSON.stringify(dict),
            success: function (data) {
                data = JSON.parse(data);

                $("#offercontainer").empty();
                $(".offer").empty();
                for (var i = 0; i < data.length; i++) {

                    var string = data[i].fields.author_name;
                    $("#offercontainer").append(
                        "<div class='offer'>" +
                        "<p class=offername>" + string + "</p>" +
                        "<p class='offerpk'>" + data[i].pk + "</p>" +
                        "<p class=offertext> offered his " + " " + data[i].fields.item_name + "</p>" +
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
            'key': key// pk value of post sent to retrieve offers to it
        };
        generateCSRFToken();
        $.ajax({
            url: "/get_user/",
            method: "POST",
            data: JSON.stringify(dict),
            success: function (data) {
                $('<img />', {
                    src: data["image"],
                    class: "offer_user_image"
                }).appendTo($('.offer:nth-child(' + (i + 1) + ')'))

            },
            error: function () {
            }

        });

    }

    function getOfferInfo(key) {
        dict = {
            'key': key// pk value of post sent to retrieve offers to it
        };

        generateCSRFToken();
        $.ajax({
            url: "/offer_info/",
            method: "POST",
            data: JSON.stringify(dict),
            success: function (data) {
                console.log(data);
                $("#offermodalusername").text(data["username"]);
                $("#offermodalcontactnumber").text(data["contact_number"]);
                $("#offermodalemail").text(data["email"]);
                $("#offermodalimage").attr('src',data["item_image"]);
                $("#offermodalitemname").text(data["item_name"]);
                $("#offermodaldescription").text(data["description"]);
                $("#offermodaluserimage").attr('src',data["user_image"]);
            },
            error: function () {
            }

        })
    }
});

