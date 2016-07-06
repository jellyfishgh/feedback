var util = require('./util');
var $ = util.$;
var MyFeedsPage = require('./MyFeedsPage');
var PostFeedPage = require('./PostFeedPage');

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