
function download(url, warning) {
  if ($("#download-warning").is(":hidden") && warning) {
    $("#download-warning").slideDown(500);
  }
  window.open(url);
}


$(function() {
  var dl = $("#download-snapshot").attr("href");
  $("#download-snapshot").removeAttr("href");
  $("#download-snapshot").click(function() {
    download(dl, true);
  });
});
