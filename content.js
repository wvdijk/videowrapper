chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
      (function(){
        var url = window.location.toString();
        if (/^(.*\.)?youtube\./.test(window.location.host)) {
          var re = /(^(.*\.)?youtube\.com\/watch\?v=)(\w+)/;
          var videoId = url.replace(re, '$3');
          var embed = '<div class="videowrapper"><iframe width="100%" src="https://www.youtube.com/embed/' + videoId + '?rel=0" frameborder="0" allowfullscreen></iframe></div>';
          clippy(embed);
        } else if (/^(.*\.)?vimeo\./.test(window.location.host)) {
          var re = /(https?:\/\/vimeo\.com\/)(\d+)/;
          var videoId = url.replace(re, '$2');
          var embed = '<div class="videowrapper"><iframe src="https://player.vimeo.com/video/' +videoId + '" width="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>';
          clippy(embed);
        } else {
          alert('Sorry, this site is not supported (yet)');
        }
      })();
 }
}
);

var clippy = function (text) { // from http://stackoverflow.com/a/18455088/1285581
  var copyFrom = document.createElement("textarea");
  copyFrom.textContent = text;
  var body = document.getElementsByTagName('body')[0];
  body.appendChild(copyFrom);
  copyFrom.select();
  document.execCommand('copy');
  body.removeChild(copyFrom);
}
