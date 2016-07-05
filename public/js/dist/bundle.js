(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var $ = require('./util').$;

function MyFeedItem(feed, tapHandler) {
    this.feed = feed;
    this.tapHandler = tapHandler;
}

MyFeedItem.prototype.render = function() {
    return $('<li>', {
            id: 'feedItem' + this.feed.id,
            className: 'feedItem',
        })
        .append($('<div>', {
            className: 'reminder',
            css: {
                display: this.feed.userremind ? 'inline' : 'none',
            },
        }))
        .append($('<p>', {
            text: this.feed.content,
            className: 'feedContent',
        }))
        .append($('<p>', {
            text: this.feed.createTime,
            className: 'feedDate',
        }))
        .append($('<p>', {
            text: '回复(' + this.feed.answer_num + ')',
            className: 'feedAnswerNum',
        }))
        .on('tap', function() {
            this.tapHandler(this.feed.id);
        });
};

module.exports = MyFeedItem;
},{"./util":5}],2:[function(require,module,exports){
var MyFeedItem = require('./MyFeedItem');
var $ = require('./util').$;

function MyFeedsList(feeds, myFeedTapHandler) {
    this.feeds = feeds;
    this.myFeedTapHandler = myFeedTapHandler;
}

MyFeedsList.prototype.render = function() {
    var myFeedsList = $('<ul>', {
        id: 'myFeedsList'
    });
    this.feeds.map(function(feed) {
        myFeedsList.append(new MyFeedItem(feed, this.myFeedTapHandler).render());
    });
    return myFeedsList;
};

module.exports = MyFeedsList;
},{"./MyFeedItem":1,"./util":5}],3:[function(require,module,exports){
var MyFeedsList = require('./MyFeedsList');
var util = require('./util');

function MyFeedsPage(uid, postItemTapHandler, myFeedTapHandler) {
    this.uid = uid;
    this.postItemTapHandler = postItemTapHandler;
    this.myFeedTapHandler = myFeedTapHandler;
}

MyFeedsPage.prototype = {
    constructor: MyFeedsPage,
    render: function () {
        return $('<div>', {
            className: "myFeedsPage"
        }).append($('<p>', {
            text: '意见反馈',
            className: 'postFeedItem',
            id: 'postFeedItem'
        }).on('tap', this.postItemTapHandler)).append(this.init());
    },
    init: function () {
        var myFeedsListView = $('<div>', {
            className: 'myFeedsListView'
        }).append($('<p>', {
            text: '我的反馈',
            className: 'myFeedsTitle'
        }));
        var loadingView = $("<div>", {
            className: "loading center"
        });
        myFeedsListView.append(loadingView);
        util.fetchMyFeeds(this.uid, function (feeds) {
            if (feeds.length > 0) {
                myFeedsListView.append(new MyFeedsList(feeds, this.myFeedTapHandler).render());
            } else {
                myFeedsListView.append($("<div>", {
                    className: "center info",
                    text: "你还没有提交过反馈。"
                }));
            }
        }, function () {
            myFeedsListView.append($("<div>", {
                className: "center info",
                text: "加载失败，请稍后重试。"
            }));
        }, function () {
            loadingView.hide();
        });
        return myFeedsListView;
    }
};

module.exports = MyFeedsPage;
},{"./MyFeedsList":2,"./util":5}],4:[function(require,module,exports){
var util = require('./util');
var $ = util.$;
var MyFeedsPage = require('./MyFeedsPage');

/*
    {
        uid: '41140472',
        email: 'javaxmail@2980.com',
        devName: 'iPhone5,2',
        sysVersion: '9.3.2',
        appVersion: '1.1.2',
        platform: 1
    }
*/
var searchObj = util.parse(location.search.slice(1));
console.log(searchObj);

var feedsPage = new MyFeedsPage(searchObj.uid, function(){
    feedsPage.hide();
    $(document).append(new PostFeedPage(searchObj).render());
}, function(feedid){
    feedsPage.hide();
    $(document).append(new ChatPage(feedid).render());
});

$(document).append(feedsPage.render());


},{"./MyFeedsPage":3,"./util":5}],5:[function(require,module,exports){
function formateDT(date) {
    return formateDate(date) + " " + formateTime(date);
}

function formateDate(date) {
    return (date.getMonth() + 1) + '.' + date.getDate();
}
function formateTime(date) {
    return prefix(date.getHours()) + ':' + prefix(date.getMinutes());
}

function prefix(num) {
    return num < 10 ? '0' + num : num;
}

var week = ["日", "一", "二", "三", "四", "五", "六"];

module.exports = {
    $: window.Zepto,
    fetchMyFeeds: function (uid, resolve, reject, finish) {
        this.$.ajax({
            type: 'GET',
            url: 'mobile/feedback/api/myproblems',
            data: {
                uid: uid
            },
            dataType: 'json',
            timeout: 2000,
            success: function (feeds) {
                resolve(feeds);
            },
            error: function (xhr, errorType, error) {
                reject(error);
            },
            complete: function () {
                finish();
            }
        });
    },
    postFeed: function (data, resolve, reject, finish) {
        this.$.ajax({
            type: 'POST',
            url: 'mobile/feedback/api/problem',
            data: data,
            contentType: 'application/json',
            timeout: 2000,
            success: function (feed) {
                resolve(feed);
            },
            error: function (xhr, errorType, error) {
                reject(error);
            },
            complete: function () {
                finish();
            }
        });
    },
    fetchAnswers: function(){

    },
    postAnswer: function(){

    },
    format: function (dateLocalStr) {
        var date = new Date(dateLocalStr);
        var now = new Date();
        if (date.getFullYear() === now.getFullYear()) {
            if (date.getMonth() === now.getMonth()) {
                if (date.getDate() === now.getDate()) {
                    return formateTime(date);
                } else {
                    if (now.getDate() - date.getDate() === 1) {
                        return '昨天 ' + formateTime(date);
                    } else {
                        if (now.getDate() - date.getDate() < 7) {
                            return '星期' + week[now.getDay()] + ' ' + formateTime(date);
                        } else {
                            return formateDT(date);
                        }
                    }
                }
            } else {
                return formateDT(date);
            }
        } else {
            return date.toLocaleDateString();
        }
    },
    trim: function (str) {
        return str.replace(/^\s+|\s+$/g, '');
    },
    parse: function (search) {
        var queries = search.split("&");
        var json = {};
        for (var i = 0; i < queries.length; i++) {
            var kv = queries[i].split("=");
            json[kv[0]] = kv[1];
        }
        return json;
    }
};
},{}]},{},[4]);
