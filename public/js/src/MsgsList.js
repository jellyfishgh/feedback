var util = require('./util');
var $ = util.$;
var MsgItem = require('./MsgItem');

function MsgsList(answers) {
    this.answers = answers;
    return this.render();
}

MsgsList.prototype.render = function () {
    var msgsList = $("<ul>", {
        className: "msgsList"
    });
    var currentChatDate = new Date(this.answers[0].createTime);
    this.answers.map(function (msg) {
        var msgDate = new Date(msg.createTime);
        if (msgDate - currentChatDate >= 6000) {
            currentChatDate = msgDate;
            msgsList.append($("<li>", {
                className: "chatDate",
                text: util.format(currentChatDate)
            }));
        }
        msgsList.append(new MsgItem(msg.type, msg.content, msg.picurl.split(',')));
    });
    return msgsList;
};

module.exports = MsgsList;