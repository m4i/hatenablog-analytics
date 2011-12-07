(function(_gaq){
  var scripts = document.getElementsByTagName('script');
  var account = scripts[scripts.length - 1].innerHTML;

  if (window._gat) {
    var trackers = _gat._getTrackers();
    for (var i = 0; i < trackers.length; ++i) {
      if (trackers[i]._getAccount() == account) return;
    }
  } else {
    for (var i = 0; i < _gaq.length; ++i) {
      if (_gaq[i][1] == account) return;
    }
  }

  var prefix = account.replace(/\W/g, '');
  _gaq.push(
    [prefix + '._setAccount', account],
    [prefix + '._trackPageview']
  );

  function trackSocial() {
    if (window.FB) {
      FB.Event.subscribe('edge.create', function(url) {
        _gaq.push([prefix + '._trackSocial', 'Facebook', 'Like', url]);
      });
      FB.Event.subscribe('edge.remove', function(url) {
        _gaq.push([prefix + '._trackSocial', 'Facebook', 'Unlike', url]);
      });
    }

    if (window.twttr) {
      twttr.events.bind('tweet', function(event) {
        if (event && event.target && event.target.nodeName == 'IFRAME') {
          var matches;
          if (matches = event.target.src.match(/[#&]url=([^&]*)/)) {
            var url = unescape(matches[1]);
            _gaq.push([prefix + '._trackSocial', 'Twitter', 'Tweet', url]);
          }
        }
      });
    }
  }
  window.addEventListener
    ? window.addEventListener('load', trackSocial, false)
    : window.attachEvent('onload', trackSocial);

  if (window._gaq) return;
  window._gaq = _gaq;

  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})(window._gaq || []);
