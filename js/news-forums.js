$(function() {
  // Get the data from the forums
  var topicArray = {};
  $.getJSON(getURL("https://forums.glowstone.net/api/category/12/announcements"), function(data) {
    var topics = data.topics;
    var length = topics.length > 5 ? 5 : topics.length;
    for (var i = 0; i < length; i++) {
      var t = topics[i];
      var html = "";
      if (!t.deleted) {
        var api = getURL("https://forums.glowstone.net/api/topic/" + t.slug);
        $.ajax({
          dataType: "json",
          url: api,
          async: false,
          success: function(topic) {
            var topicurl = "https://forums.glowstone.net/topic/" + topic.slug;
            var timestamp = Number(topic.timestamp);
            var date = timeDifference(new Date().getTime(), timestamp);
            var author = topic.posts[0].user.username;
            var comments = topic.posts.length - 1;
            var content = topic.posts[0].content.replace("\\n", "");
            var title = topic.title;
            topicArray['<div class="content box"><h2>' + title + '<a class="button is-outlined" style="float: right" href="' + topicurl + '">View post</a><br><h5>Posted by ' + author + ' <strong id="datetest">' + date + '</strong>, ' + comments + ' comment' + (comments <= 1 ? "" : "s") + '</h5></h2>' + content + '</div>'] = timestamp;
        }});
      }
    }

  }).complete(function() {
    $("#announcements-loading").remove();
    for (var html in topicArray) {
      $("#announcements-parent").html($("#announcements-parent").html() + "<br>" + html);
    }
    $("#announcements-more").show();
  });
});
