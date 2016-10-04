
function download(url, warning) {
  if ($("#download-warning").is(":hidden") && warning) {
    $("#download-warning").slideDown(500);
  }
  window.open(url);
}


$(function() {
  $("#download-snapshot").removeAttr("href");
  $("#download-snapshot").click(function() {
    download("https://251-33457443-gh.circle-artifacts.com/0//tmp/circle-artifacts.tHzq1kg/glowstone++-1.11-16w38a-SNAPSHOT.jar", true);
  });
});
