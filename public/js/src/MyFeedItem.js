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