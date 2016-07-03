var util = require('./util');
var $ = util.$;
var MsgContentView = require('./MsgContentView');

function MsgItem(uid, msg) {
    this.uid = uid;
    this.type = msg.type;
    this.picurl = msg.picurl;
    this.createTime = msg.createTime;
    this.content = msg.content;
}

MsgItem.prototype.render = function() {
    return $("<li>", {

    }).append($("<p>", {
        text: this.createTime
    })).append(new MsgContentView(this.content, this.picurl.split(',')).render())
    .append($("<img>"), {
        src: util.getHead(this.uid)
    });
};

module.exports = MsgItem;