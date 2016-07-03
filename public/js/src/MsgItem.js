var util = require('./util');
var $ = util.$;

function MsgItem(msgType, msgTextContent, msgPicUrls) {
    this.type = msgType;
    this.textContent = msgTextContent;
    this.picUrls = msgPicUrls;
    
}

MsgItem.prototype.render = function() {
    var msgConetentview = $("<div>", {
        className: "msgConetent"
    }).append($("<p>", {
        text: this.textContent
    }));
    var picsView = $("<div>", {
        className: "picsView"
    });
    this.picUrls.map(function(picUrl) {
        picsView.append($("<img>", {
            src: picUrl
        }));
    });
    msgConetentview.append(picsView);
    return $("<li>", {
        className: this.type === 1 ? 'left' : 'right'
    }).append(msgConetentview);
};

module.exports = MsgItem;