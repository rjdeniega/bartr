/**
 * Created by JasonDeniega on 06/02/2017.
 */


$(document).ready(function(){
    const searchbar = $("#searchbar");
    const searchButton = $("#searchicon");
    const homeButton = $("#homeicon");


    //FOR SEARCH BUTTON
    // searchbar.attr("disabled","disabled");
    //
    // searchbar.focus(function(){
    //     searchbar.css("width","200px");
    // });
    // searchbar.focusout(function(){
    //     searchbar.css("width","0");
    // });
    //
    // searchButton.click(function(){
    //     console.log("clicked");
    //     searchbar.removeAttr("disabled");
    //     searchbar.focus();
    //     searchbar.css("width","200px");
    // });
    //FOR HOME BUTTON
    homeButton.click(function(){
        window.location.href = '../HTML/Bartr.html';
        return false;
    });
    $("#logo").click(function() {
        window.location.href = '../HTML/home.html';
        return false;
    });

    $("#signup").click(function() {
        window.location.href = '../HTML/SignUp.html';
        return false;
    });

    $("#marketplacelink").click(function(){
        window.location.href = '../HTML/Marketplace2.html';
        return false;
    });

    $("#userpic").click(function(){
        window.location.href = '../HTML/Profile.html';
        return false;
    });




});