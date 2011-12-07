var _gaq = _gaq || [];

(function(account){
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
})('UA-XXXXX-X');
