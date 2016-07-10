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