import FeedItem from './FeedItem';

class MyFeedsPanel {
    constructor($, feeds) {
        this.$ = $;
        this.feeds = feeds;
    }
    render(feeds) {
        const myFeedsPanel = this.$('<ul>', {
            id: 'myFeedsPanel'
        });
        feeds.map((feed) => {
            myFeedsPanel.append(new FeedItem(this.$, this.feedTapHandler, feed).render());
            return feed;
        });
        return myFeedsPanel;
    }
    feedTapHandler(feedId) {
        window.history.pushState(null, null, `/feedDetail?id=${feedId}`);
    }
}

export default MyFeedsPanel;
