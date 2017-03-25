$(function() {
  $.getJSON(getURL("https://bamboo.gserv.me/rest/api/latest/result/GSPP-SRV.json?expand=results.result.artifacts,results.result.labels&max-result=10"), function(data) {
    var results = data.results.result;
    var base =
    '<table class="table">' +
      '<thead>' +
        '<tr>' +
          '<th><span class="icon"><i class="fa fa-server"></i></span></th>' +
          '<th>Date</th>' +
          '<th>Version</th>' +
          '<th>Trigger</th>' +
          '<th><span class="icon"><i class="fa fa-download"></i></span></th>' +
        '</tr>' +
      '</thead>' +
      '<tbody>{builds}' +
      '</tbody>' +
    '</table>';
    var model =
    '<tr>' +
      '<td>{buildnumber}</td>' +
      '<td>{date}</td>' +
      '<td>{version}</td>' +
      '<td>{reason}</td>' +
      '<td>{download}</td>' +
    '</tr>';
    var content = "";
    for (var i = 0; i < results.length; i++) {
      var b = results[i];
      var buildnumber = '<a href="https://bamboo.gserv.me/browse/GSPP-SRV-' + b.buildNumber.toString() + '">#' + b.buildNumber.toString() + '</a>';
      var state = b.state.toLowerCase();
      var stateIcon = '<span class="icon" style="color: #fce473;"><i class="fa fa-bolt"></i></span>';
      if (state == "successful") {
        stateIcon = '<span class="icon" style="color: #97cd76;"><i class="fa fa-check"></i></span>';
      } else if (state == "failed") {
        stateIcon = '<span class="icon" style="color: #ed6c63;"><i class="fa fa-check"></i></span>';
      }
      var reason = b.buildReason;
      var date = b.buildRelativeTime;
      if (b.buildReason.includes("Manual run ")) {
        reason = b.buildReason;
      } else if ("vcsRevisionKey" in b) {
        reason = '<a target="_blank" href="https://github.com/GlowstoneMC/Glowstone/commit/' + b.vcsRevisionKey + '"><span class="icon"><i class="fa fa-github"></i></span></a>&nbsp;Commit &nbsp;<a target="_blank" href="https://github.com/GlowstoneMC/Glowstone/commit/' + b.vcsRevisionKey + '"><code>' + b.vcsRevisionKey.substr(0, 7) + '</code></a>&nbsp;&nbsp;by&nbsp;' + b.buildReason.replace("Changes by ", "");
      }
      var version = '<span style="color: gray">N/A</span>';
      if (b.labels.size > 0) {
        version = b.labels.label[0].name.split("_").join(".");
      }
      if (b.labels.size > 1) {
        version += " (<strong>" + b.labels.label[1].name.replace("mc", "").split("_").join(".") + "</strong>)";
      }
      var download = '<span class="icon" style="color: #ed6c63;"><i class="fa fa-times"></i></span>';
      if (b.artifacts.artifact.length > 0) {
        if (b.state.toLowerCase() == "successful") {
          download = '<a href="' + b.artifacts.artifact[0].link.href + '"><span class="icon icon-success"><i class="fa fa-download"></i></span></a>';
        } else {
          download = '<a href="' + b.artifacts.artifact[0].link.href + '"><span class="icon icon-warning"><i class="fa fa-download"></i></span></a>';
        }
      }
      content += model.replace("{buildnumber}", buildnumber).replace("{date}", date).replace("{reason}", reason).replace("{download}", download).replace("{version}", version);
    }
    $("#builds-parent").html(base.replace("{builds}", content));
  });
});
