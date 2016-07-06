var $ = require('./util').$;

function ChatPage(sign, uid, feedid) {
    this.sign = sign;
    this.uid = uid;
    this.feedid = feedid;
    return this.render();
}

ChatPage.prototyep.render = function(){
    return $("<div>", {
        className: "chatPage"
    }).append($("<div>", {
        className: "InputArea"
    }));
};

module.exports = ChatPage;