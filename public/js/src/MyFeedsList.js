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