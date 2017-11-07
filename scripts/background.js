'use strict';

var url = '';
var requestIds = [];
function handleRequest (details) {
    var header;
    for (var i = 0; i < details.requestHeaders.length; ++i) {
        header = details.requestHeaders[i];
        if (header.name === 'Origin') {
            url = header.value;
            if (url == 'url1'
                || url == 'url2'
            ) {
                requestIds.push(details.requestId)
            }
            break;
        }
    }
    return {requestHeaders: details.requestHeaders};
}

function handleRespone (details) {
    var indexId = requestIds.indexOf(details.requestId);
    // if exist requestId
    if (indexId >= 0) {
        details.responseHeaders.push({
            name: 'Access-Control-Allow-Origin',
            value: url
        });
        details.responseHeaders.push({
            name: 'Access-Control-Allow-Headers',
            value: ''
        });
        details.responseHeaders.push({
            name: 'Access-Control-Allow-Credentials',
            value: 'true'
        });
        requestIds.splice(indexId, 1);
    }
    return {responseHeaders: details.responseHeaders};
}

function setOn () {
    chrome.browserAction.setBadgeText({text: 'on'});
    chrome.browserAction.setBadgeBackgroundColor({color: [0, 0, 0, 0]});
    chrome.webRequest.onBeforeSendHeaders.addListener(handleRequest, {urls: ['<all_urls>'], types: ['xmlhttprequest']}, ['blocking', 'requestHeaders']);
    chrome.webRequest.onHeadersReceived.addListener(handleRespone, {urls: ['<all_urls>'], types: ['xmlhttprequest']}, ['blocking', 'responseHeaders']);
}
function setOff () {
    chrome.browserAction.setBadgeText({text: 'off'});
    chrome.browserAction.setBadgeBackgroundColor({color: [128, 128, 128, 200]});
    chrome.webRequest.onBeforeSendHeaders.removeListener(handleRequest);
    chrome.webRequest.onHeadersReceived.removeListener(handleRespone);
}

if (localStorage.getItem('on')) {
    setOn();
} else {
    setOff();
}

chrome.browserAction.onClicked.addListener(function () {
    if (localStorage.getItem('on')) {
        localStorage.setItem('on', '');
        setOff();
    } else {
        localStorage.setItem('on', '1');
        setOn();
    }
});
