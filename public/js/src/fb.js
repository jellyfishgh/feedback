(function($, baseUrl, storage) {
    function getMyFeeds(uid, cb) {
        $.ajax({
            type: 'GET',
            url: baseUrl + '/mobile/feedback/api/myproblems',
            data: {
                uid: uid
            },
            dataType: 'json',
            timeout: 300,
            success: function(feeds) {
                cb(feeds);
            },
            error: function(xhr, errorType, error) {
                alert('请检查你的网络连接情况，稍后重新。');
            }
        });
    }

    function showMyFeeds(feeds) {
        feeds.map(function(feed) {
            $('#myFeedsPanel').append(renderFeed(feed));
        });
    }

    function renderFeed(feed) {
        return $("<li>", {
                id: "feedItem",
                className: "feedItem"
            })
            .append($('<div>'), {
                className: 'reminder',
                css: {
                    display: feed.userremind ? 'inline' : 'none'
                }
            })
            .append($('<p>'), {
                text: feed.content,
                className: 'feedContent'
            })
            .append($('<p>'), {
                text: feed.createTime,
                className: 'feedDate'
            })
            .append($('<p>'), {
                text: '回复(' + feed.answer_num + ')',
                className: 'feedAnswerNum'
            })
            .on('tap', function() {
                renderFeedDetail(feed.id);
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