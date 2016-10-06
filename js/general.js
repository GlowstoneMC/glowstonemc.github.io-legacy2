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
  $("#chat").on('click', function(event) {
    $("#chatModal").fadeIn(400);
  });
  $("#chatModalClose").on('click', function(event){
    $("#chatModal").fadeOut(300);
  });
  $("#chatModalBack").on('click', function(event){
    $("#chatModal").fadeOut(300);
  });
});
