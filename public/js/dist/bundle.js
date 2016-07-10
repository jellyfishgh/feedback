(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var util = require('./util');
var $ = util.$;
var MsgsList = require('./MsgsList');

function ChatPage(sign, uid, feedid) {
    this.sign = sign;
    this.uid = uid;
    this.feedid = feedid;
    return this.render();
}

ChatPage.prototype.render = function() {
    var loadingView = util.createLoadingView();
    var chatPage = $("<div>", {
        className: "chatPage"
    }).append(loadingView);
    util.fetchAnswers(this.feedid, function(answers) {
        if (answers.length > 0) {
            chatPage.append(new MsgsList(answers)).append($("<div>", {
                className: "inputArea"
            }).append($("<input>", {
                type: "text",
                placeholder: "可以继续描述你的问题",
                className: "answerInput",
                id: "answerInput"
            })).append($("<button>", {
                text: "发送",
                className: "sendAnswer"
            })).on('tap', function() {

            }));
        } else {
            chatPage.append($("<div>", {
                className: "center info",
                text: "客服暂时还没有回复你"
            }));
        }
    }, function() {
        chatPage.append(util.createErrorView());
    }, function() {
        loadingView.hide();
    });
    return chatPage;
};

module.exports = ChatPage;
},{"./MsgsList":4,"./util":10}],2:[function(require,module,exports){
var $ = require('./util').$;

function ImgUploader() {

}

ImgUploader.prototype.render = function() {
    return $('<div>', {
            id: 'uploader',
            className: 'wu-example'
        })
        .append($('<div>', {
            id: 'thelist',
            className: 'uploader-list'
        }))
        .append($('<div>', {
            className: 'btns'
        }).append($('<div>', {
            id: picker,
            text: '选择文件'
        })).append($('<buttton>', {
            id: 'ctlBtn',
            className: 'btn btn-default',
            text: '开始上传'
        })));
}

module.exports = ImgUploader;
},{"./util":10}],3:[function(require,module,exports){
var util = require('./util');
var $ = util.$;

function MsgItem(msgType, msgTextContent, msgPicUrls) {
    this.type = msgType;
    this.textContent = msgTextContent;
    this.picUrls = msgPicUrls;
    
}

MsgItem.prototype.render = function() {
    var msgConetentview = $("<div>", {
        className: "msgConetent"
    }).append($("<p>", {
        text: this.textContent
    }));
    var picsView = $("<div>", {
        className: "picsView"
    });
    this.picUrls.map(function(picUrl) {
        picsView.append($("<img>", {
            src: picUrl
        }));
    });
    msgConetentview.append(picsView);
    return $("<li>", {
        className: this.type === 1 ? 'left' : 'right'
    }).append(msgConetentview);
};

module.exports = MsgItem;
},{"./util":10}],4:[function(require,module,exports){
var util = require('./util');
var $ = util.$;
var MsgItem = require('./MsgItem');

function MsgsList(answers) {
    this.answers = answers;
    return this.render();
}

MsgsList.prototype.render = function () {
    var msgsList = $("<ul>", {
        className: "msgsList"
    });
    var currentChatDate = new Date(this.answers[0].createTime);
    this.answers.map(function (msg) {
        var msgDate = new Date(msg.createTime);
        if (msgDate - currentChatDate >= 6000) {
            currentChatDate = msgDate;
            msgsList.append($("<li>", {
                className: "chatDate",
                text: util.format(currentChatDate)
            }));
        }
        msgsList.append(new MsgItem(msg.type, msg.content, msg.picurl.split(',')));
    });
    return msgsList;
};

module.exports = MsgsList;
},{"./MsgItem":3,"./util":10}],5:[function(require,module,exports){
var util = require('./util');
var $ = util.$;

function MyFeedItem(feed, tapHandler) {
    this.feed = feed;
    this.tapHandler = tapHandler;
}

MyFeedItem.prototype.render = function() {
    return $('<li>', {
            id: 'feedItem' + this.feed.id,
            class: 'feedItem',
        })
        .append($('<div>', {
            class: 'reminder',
            css: {
                display: this.feed.userremind ? 'inline' : 'none',
            },
        }))
        .append($('<p>', {
            text: this.feed.content,
            class: 'feedContent',
        }))
        .append($('<p>', {
            text: util.format(this.feed.createTime),
            class: 'feedDate',
        }))
        .append($('<p>', {
            text: '回复(' + (this.feed.answer_num ? this.feed.answer_num : 0) + ')',
            class: 'feedAnswerNum',
        }))
        .on('click', function() {
            this.tapHandler(this.feed.id);
        }.bind(this));
};

module.exports = MyFeedItem;
},{"./util":10}],6:[function(require,module,exports){
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
    }.bind(this));
    return myFeedsList;
};

module.exports = MyFeedsList;
},{"./MyFeedItem":5,"./util":10}],7:[function(require,module,exports){
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
    render: function() {
        return $('<div>', {
                class: "myFeedsPage"
            })
            .append($('<p>', {
                text: '意见反馈',
                class: 'postFeedItem',
                id: 'postFeedItem'
            }).append($('<span>', {
                text: '>',
                class: 'inArrow',
            })).on('click', this.postItemTapHandler))
            .append(this.init());
    },
    init: function() {
        var myFeedsListView = $('<div>', {
            class: 'myFeedsListView'
        }).append($('<p>', {
            text: '我的反馈',
            class: 'myFeedsTitle'
        }));
        var loadingView = util.createLoadingView();
        myFeedsListView.append(loadingView);
        util.fetchMyFeeds(this.uid, function(feeds) {
            if (feeds.length > 0) {
                myFeedsListView.append(new MyFeedsList(feeds, this.myFeedTapHandler).render());
            } else {
                myFeedsListView.append($("<div>", {
                    class: "center info",
                    text: "你还没有提交过反馈。"
                }));
            }
        }.bind(this), function() {
            myFeedsListView.append(util.createErrorView());
        }, function() {
            loadingView.hide();
        });
        return myFeedsListView;
    }
};

module.exports = MyFeedsPage;
},{"./MyFeedsList":6,"./util":10}],8:[function(require,module,exports){
var $ = require('./util').$;
var ImgUploader = require('./ImgUploader');

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
        .append(new ImgUploader().render())
        .append($("<button>", {
            text: "完成"
        }).on("tap", function() {
            util.postFeed();
        }));
};

module.exports = PostFeedPage;
},{"./ImgUploader":2,"./util":10}],9:[function(require,module,exports){
var util = require('./util');
var $ = util.$;
var MyFeedsPage = require('./MyFeedsPage');
var PostFeedPage = require('./PostFeedPage');
var ChatPage = require('./ChatPage');

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
},{"./ChatPage":1,"./MyFeedsPage":7,"./PostFeedPage":8,"./util":10}],10:[function(require,module,exports){
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
},{}]},{},[9]);
