(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var util = require('./util');
var $ = util.$;

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
            text: util.format(this.feed.createTime),
            className: 'feedDate',
        }))
        .append($('<p>', {
            text: '回复(' + (this.feed.answer_num ? this.feed.answer_num : 0) + ')',
            className: 'feedAnswerNum',
        }))
        .on('click', function() {
            this.tapHandler(this.feed.id);
        }.bind(this));
};

module.exports = MyFeedItem;
},{"./util":6}],2:[function(require,module,exports){
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
},{"./MyFeedItem":1,"./util":6}],3:[function(require,module,exports){
var MyFeedsList = require('./MyFeedsList');
var util = require('./util');

function MyFeedsPage(uid, postItemTapHandler, myFeedTapHandler) {
    this.uid = uid;
    this.postItemTapHandler = postItemTapHandler;
    this.myFeedTapHandler = myFeedTapHandler;
    return this.render();
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
        }).on('click', this.postItemTapHandler))
        .append(this.init());
    },
    init: function () {
        var myFeedsListView = $('<div>', {
            className: 'myFeedsListView'
        }).append($('<p>', {
            text: '我的反馈',
            className: 'myFeedsTitle'
        }));
        var loadingView = util.createLoadingView();
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
            myFeedsListView.append(util.createErrorView());
        }, function () {
            loadingView.hide();
        });
        return myFeedsListView;
    }
};

module.exports = MyFeedsPage;
},{"./MyFeedsList":2,"./util":6}],4:[function(require,module,exports){
var $ = require('./util').$;

function PostFeedPage(searchObj) {
    this.sign = searchObj.sign;
    this.uid = searchObj.uid;
    this.email = searchObj.email;
    this.devName = searchObj.devName;
    this.sysVersion = searchObj.sysVersion;
    this.appVersion = searchObj.appVersion;
    this.platform = searchObj.platform;
    return this.render();
}

PostFeedPage.prototype.render = function() {
    return $("<div>", {
            id: "postFeed",
            className: "postFeed"
        })
        .append($("<textarea>", {
            name: "feedContent",
            id: "feedContent",
            className: "feedContent",
            cols: "30",
            rows: "10",
            placeholder: "你的宝贵意见，是我们前进的动力。"
        }))
        .append($("<label>", {
            for: "isLogged"
        }))
        .append($("<checkbox>", {
            id: "isLogged",
            checked: "checked",
            text: "上传日志"
        }))
        .append($("<p>", {
            className: "picTitle",
            text: "提供图片以协助我们解决问题"
        }))
        .append($("<p>", {
            id: "picLimit",
            className: "picLimit",
            text: "0/2"
        }))
        .append($("<file>"))
        .append($("<button>", {
            text: "完成"
        }).on("tap", function() {
            util.postFeed();
        }));
};

module.exports = PostFeedPage;
},{"./util":6}],5:[function(require,module,exports){
var util = require('./util');
var $ = util.$;
var MyFeedsPage = require('./MyFeedsPage');
var PostFeedPage = require('./PostFeedPage');

/*
    {
        sign: 'abc'
        uid: '41140472',
        email: 'javaxmail@2980.com',
        devName: 'iPhone5,2',
        sysVersion: '9.3.2',
        appVersion: '1.1.2',
        platform: 1
    }
*/

// http://localhost:3000/html/index.html?uid=41140472&email=javaxmail@2980.com&devName=iPhone5,2&sysVersion=9.3.2&appVersion=1.1.1&platform=1

var searchObj = util.parse(location.search.slice(1));

var feedsPage = new MyFeedsPage(searchObj.uid, function() {
    feedsPage.hide();
    $(document.body).append(new PostFeedPage(searchObj));
}, function(feedid) {
    feedsPage.hide();
    $(document.body).append(new ChatPage(searchObj.sign, searchObj.uid, feedid));
});

$(document.body).append(feedsPage);
},{"./MyFeedsPage":3,"./PostFeedPage":4,"./util":6}],6:[function(require,module,exports){
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
    fetchMyFeeds: function(uid, resolve, reject, finish) {
        this.$.ajax({
            type: 'GET',
            url: '/mobile/feedback/api/myproblems',
            data: {
                uid: uid
            },
            dataType: 'json',
            timeout: 2000,
            success: function(resJSON) {
                if (resJSON.code === 0) resolve(resJSON.extData);
                else reject(resJSON.code);
            },
            error: function(xhr, errorType, error) {
                reject(error);
            },
            complete: function() {
                finish();
            }
        });
    },
    postFeed: function(data, resolve, reject, finish) {
        this.$.ajax({
            type: 'POST',
            url: '/mobile/feedback/api/problem',
            data: data,
            contentType: 'application/json',
            timeout: 2000,
            success: function(feed) {
                resolve(feed);
            },
            error: function(xhr, errorType, error) {
                reject(error);
            },
            complete: function() {
                finish();
            }
        });
    },
    fetchAnswers: function(feedid, resolve, reject, finish) {
        this.$.ajax({
            type: 'GET',
            url: '/mobile/feedback/api/problemdetail',
            data: {
                feedbackid: feedid
            },
            contentType: 'application/json',
            timeout: 2000,
            success: function(resJSON) {
                if (resJSON.code === 0) {
                    resolve(resJSON.answers);
                } else {
                    reject(resJSON.code);
                }
            },
            error: function(xhr, errorType, error) {
                reject(error);
            },
            complete: function() {
                finish();
            }
        });
    },
    postAnswer: function(data, resolve, reject, finish) {
        this.$.ajax({
            type: 'POST',
            url: '/mobile/feedback/api/answer',
            data: data,
            contentType: 'application/json',
            timeout: 2000,
            success: function(feed) {
                resolve(feed);
            },
            error: function(xhr, errorType, error) {
                reject(error);
            },
            complete: function() {
                finish();
            }
        });
    },
    format: function(dateLocalStr) {
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
    trim: function(str) {
        return str.replace(/^\s+|\s+$/g, '');
    },
    parse: function(search) {
        var queries = search.split("&");
        var json = {};
        for (var i = 0; i < queries.length; i++) {
            var kv = queries[i].split("=");
            json[kv[0]] = kv[1];
        }
        return json;
    },
    createLoadingView: function() {
        return $("<div>", {
            className: "loading center"
        });
    },
    createErrorView: function() {
        return $("<div>", {
            className: "center info",
            text: "加载失败，请稍后重试。"
        })
    }
};
},{}]},{},[5]);
