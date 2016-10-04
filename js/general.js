$(document).ready(function(){
  $("a").on('click', function(event) {
    if (this.hash !== "" && $(this).attr("href").startsWith("#")) {
      event.preventDefault();
      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 1000, function(){
        window.location.hash = hash;
      });
    }
  });
  $("#irc").on('click', function(event) {
    $("#ircModal").fadeIn(400);
  });
  $("#ircModalClose").on('click', function(event){
    $("#ircModal").fadeOut(300);
  });
  $("#ircModalBack").on('click', function(event){
    $("#ircModal").fadeOut(300);
  });
});
