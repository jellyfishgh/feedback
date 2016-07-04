var util = require('./util');
var $ = util.$;
var MyFeedsPage = require('./MyFeedsPage');

/*
    {
        uid: '41140472',
        email: 'javaxmail@2980.com',
        devName: 'iPhone5,2',
        sysVersion: '9.3.2',
        appVersion: '1.1.2',
        platform: 1
    }
*/
var searchObj = util.parse(location.search.slice(1));

var feedsPage = new MyFeedsPage(searchObj.uid, function(){
    feedsPage.hide();
    $(document).append(new PostFeedPage(searchObj).render());
}, function(feedid){
    feedsPage.hide();
    $(document).append(new ChatPage(feedid).render());
});

$(document).append(feedsPage.render());

