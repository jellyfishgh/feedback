(function($, baseUrl, storage) {
    function showMyFeeds(feeds) {
        feeds.map(function(feed) {
            $('#myFeedsPanel').append(renderFeed(feed));
        });
    }

    function renderFeedDetail(id) {
        var pathname = '/feedDetail?id=' + id;
        window.history.pushState(null, null, pathname);
    }

    function route(pathname) {
        switch (pathname) {}
    }
    window.onpopstate = function(event) {
        route(document.location.pathname);
    };
    $('#').on(tap, function() {
        renderPostFeedView();
    });
})(window.Zepto, 'http://192.168.191.94:8077', window.localStorage || {});

/*

http://zeptojs.com
https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
https://developer.mozilla.org/zh-CN/docs/DOM/Manipulating_the_browser_history
http://fex.baidu.com/webuploader/getting-started.html

gamecenter repo:学习操控历史纪录
*/