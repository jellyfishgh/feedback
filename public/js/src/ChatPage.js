var util = require('./util');
var $ = util.$;
var MsgsList = require('./MsgsList');

function ChatPage(sign, uid, feedid) {
    this.sign = sign;
    this.uid = uid;
    this.feedid = feedid;
    return this.render();
}

ChatPage.prototyep.render = function() {
    var loadingView = util.createLoadingView();
    var chatPage = $("<div>", {
        className: "chatPage"
    }).append(loadingView);
    util.fetchAnswers(this.feedid, function(answers) {
        if (answers.length > 0) {
            chatPage.append(new MsgsList(answers)).append($("<div>", {
                className: "inputArea"
            }).append($("<input>", {
                type: "text",
                placeholder: "可以继续描述你的问题",
                className: "answerInput",
                id: "answerInput"
            })).append($("<button>", {
                text: "发送",
                className: "sendAnswer"
            })).on('tap', function() {

            }));
        } else {
            chatPage.append($("<div>", {
                className: "center info",
                text: "客服暂时还没有回复你"
            }));
        }
    }, function() {
        chatPage.append(util.createErrorView());
    }, function() {
        loadingView.hide();
    });
    return chatPage;
};

module.exports = ChatPage;