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