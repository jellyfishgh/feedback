class Feed {
    constructor(feed, tapHandler) {
        this.feed = feed;
        this.tapHandler = tapHandler;
    }
    renderToHtml() {
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
            .on('tap', () => {
                this.tapHandler(feed.id);
            });
    }
}