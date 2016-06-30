import MyFeedsPanel from './MyFeedsPanel';
import { getMyFeeds } from './tool';

class MyFeedsPage {
    constructor(postFeedHandler, feedDetailHandler) {
        this.postFeedHandler = postFeedHandler;
        this.feedDetailHandler = feedDetailHandler;
    }
    render() {
        return $('<div>', {
                className: 'myFeedsPage',
                id: 'myFeedsPage'
            })
            .append($('<div>', {
                className: 'postFeedItem',
                id: 'postFeedItem'
            }).on('tap', this.postFeedHandler))
            .append($('<div>', {
                className: 'myFeedsPanel'
            }).append($('<div>', {
                text: '我的问题',
                className: 'banner'
            })).append();
    }
}

export default MyFeedsPage;
