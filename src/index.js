(function() {
    'use strict';

    var eventKindPageView = 'PAGE_VIEW';

    var lastUrl;

    function sendEvent(kind) {
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
            k: kind,
            l: intl.locale,
            r: referrer,
            t: intl.timeZone,
            u: url,
        };

        lastUrl = url;

        var request = new XMLHttpRequest();

        request.open('POST', 'https://api.poeticmetric.com/events', true);
        request.setRequestHeader('content-type', 'application/json');
        request.send(JSON.stringify(payload));
    }

    if ((window.history || {}).pushState) {
        var windowHistoryPushState = window.history.pushState;

        window.history.pushState = function() {
            windowHistoryPushState.apply(this, arguments);

            sendEvent(eventKindPageView);
        }

        window.addEventListener('popstate', function() {
            sendEvent(eventKindPageView);
        });
    }

    sendEvent(eventKindPageView);
})();
