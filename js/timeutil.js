function timeDifference(current, previous) {
  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;
  var elapsed = current - previous;
  if (elapsed < msPerMinute) {
    return Math.round(elapsed/1000) + ' seconds ago';
  }
  else if (elapsed < msPerHour) {
    return Math.round(elapsed/msPerMinute) + ' minutes ago';
  }
  else if (elapsed < msPerDay) {
    var i = Math.round(elapsed/msPerHour);
    if (i == 1) {
      return 'an hour ago';
    } else {
      return i + ' hours ago';
    }
  }
  else if (elapsed < msPerMonth) {
    var i = Math.round(elapsed/msPerDay);
    if (i == 1) {
      return 'a day ago';
    } else {
      return i + ' days ago';
    }
  }
  else if (elapsed < msPerYear) {
    var i = Math.round(elapsed/msPerMonth);
    if (i == 1) {
      return 'a month ago';
    } else {
      return i + ' months ago';
    }
  }
  else {
    var i = Math.round(elapsed/msPerYear);
    if (i == 1) {
      return 'a year ago';
    } else {
      return i + ' years ago';
    }
  }
}
