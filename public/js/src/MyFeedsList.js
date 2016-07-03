var MyFeedItem = require('./MyFeedItem');
var $ = require('./util').$;

function MyFeedsList(feeds) {
    this.feeds = feeds;
}

MyFeedsList.prototype.render = function() {
    var myFeedsList = $('<ul>', {
        id: 'myFeedsList'
    });
    this.feeds.map(function(feed) {
        myFeedsList.append(new MyFeedItem(feed).render());
    });
    return myFeedsList;
};

module.exports = MyFeedsList;