(function () {
  'use strict';

  if (window.localStorage && window.localStorage.pmIgnore) {
    return;
  }

  // API urls
  var apiUrl = 'https://api.poeticmetric.com';
  var apiEventsUrl = apiUrl + '/events';
  var apiEventDurationSaveUrl = apiEventsUrl + '/durations';

  // event stuff
  var lastUrl;
  var duration = 0;
  var lastVisibleAt = null;
  var eventId = null;

  function handleVisibilityChange() {
    if (document.visibilityState === 'visible') {
      lastVisibleAt = new Date();
    } else {
      sendDuration();
    }
  }

  function onPageChange() {
    sendDuration();

    duration = 0;
    lastVisibleAt = new Date();
    eventId = null;

    sendPageViewEvent();
  }

  function sendDuration() {
    if (eventId === null || lastVisibleAt === null) return;

    duration = duration + Math.round((new Date().getTime() - lastVisibleAt.getTime())/ 1000);

    navigator.sendBeacon(
      apiEventDurationSaveUrl, JSON.stringify({
        d: duration,
        e: eventId,
      }));
  }

  function sendPageViewEvent() {
    var url = window.document.location.href;

    if (url === lastUrl) return;

    var intl = window.Intl.DateTimeFormat().resolvedOptions();
    var referrer = null;

    if (lastUrl !== undefined) {
      referrer = lastUrl;
    } else if (window.document.referrer !== "") {
      referrer = window.document.referrer;
    }

    var payload = {
      k: 'PAGE_VIEW',
      l: intl.locale,
      r: referrer,
      t: intl.timeZone,
      u: url,
    };

    lastUrl = url;
    eventId = null;
    duration = 0;

    var request = new XMLHttpRequest();

    request.open('POST', apiEventsUrl, true);
    request.setRequestHeader('content-type', 'application/json');
    request.onload = function () {
      if (request.status === 202) {
        var response = JSON.parse(request.responseText);

        eventId = response.eventId;
      }
    }
    request.send(JSON.stringify(payload));
  }

  if ((window.history || {}).pushState) {
    var windowHistoryPushState = window.history.pushState;

    window.history.pushState = function () {
      windowHistoryPushState.apply(this, arguments);

      onPageChange();
    }
  }

  window.addEventListener('popstate', onPageChange, { capture: true });
  window.addEventListener('visibilitychange', handleVisibilityChange, { capture: true });
  window.addEventListener('pagehide', handleVisibilityChange, { capture: true });

  onPageChange();
})();
