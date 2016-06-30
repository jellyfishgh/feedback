class FeedItem {
    constructor($, feed, tapHandler) {
        this.$ = $;
        this.feed = feed;
        this.tapHandler = tapHandler;
    }
    render() {
        const $ = this.$;
        return $('<li>', {
                id: `feedItem${this.feed.id}`,
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
                text: `回复(${this.feed.answer_num})`,
                className: 'feedAnswerNum',
            }))
            .on('tap', () => {
                this.tapHandler(this.feed.id);
            });
    }
}

export default FeedItem;
