function loadNews() {
  // Get the data from the forums
  var topicArray = {};
  $.getJSON(getURL("https://forums.glowstone.net/api/category/12/announcements"), function(data) {
    var topics = [];
    var index = 0;
    for (var i = 0; i < data.topics.length; i++) {
      if (data.topics[i].deleted) {
        continue;
      }
      topics[index++] = data.topics[i];
    }
    topics = _.sortBy(topics, "timestamp").reverse();
    for (var i = 0; i < 5; i++) {
      var t = topics[i];
      var html = "";
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
          topicArray['<div class="content box"><h2><a style="color: black" href="' + topicurl + '">' + title + '</a><br><h5>Posted by ' + author + ' <strong id="datetest">' + date + '</strong>, ' + comments + ' comment' + (comments === 1 ? "" : "s") + '</h5></h2>' + content + '</div>'] = timestamp;
      }});
    }
  }).complete(function() {
    $("#announcements-loading").remove();
    for (var html in topicArray) {
      $("#announcements-parent").html($("#announcements-parent").html() + "<br>" + html);
    }
    $("#announcements-more").show();
  });
}

function loadAnnouncementsFront(count) {
  $.getJSON(getURL("https://forums.glowstone.net/api/category/12/announcements"), function(data) {
    var topics = [];
    var index = 0;
    for (var i = 0; i < data.topics.length; i++) {
      if (data.topics[i].deleted) {
        continue;
      }
      topics[index++] = data.topics[i];
    }
    topics = _.sortBy(topics, "timestamp").reverse();
    var build = "";
    for (var i = 0; i < count; i++) {
      var date = timeDifference(new Date().getTime(), topics[i].timestamp);
      build += '<a class="announcement-link" target="_blank" data-balloon="' + date + '" data-balloon-pos="up"href="https://forums.glowstone.net/topic/' + topics[i].slug + '">' + topics[i].title + '</a>';
      if (i < (count - 1)) {
        build += ", ";
      }
    }
    $("#announcements-titles").html(build);
    $("#announcements-front").slideDown(500);
  });
}
