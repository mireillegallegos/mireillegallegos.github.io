$(document).ready(function (){
  // scrollto anchor link
  $("a[href^='#']").click(function (e){
    e.preventDefault();

    // get target from href
    var target = $(this).attr('href');

    $('html, body').animate({
        scrollTop: $(target).offset().top
    }, 1000);
  });
});