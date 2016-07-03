var $ = require('./util').$;

function PostFeedPage(uid) {
    this.uid = uid;
}

PostFeedPage.prototype.render = function() {
    return $("<div>", {
            id: "postFeed",
            className: "postFeed"
        }).append($("<textarea>", {
            name: "feedContent",
            id: "feedContent",
            className: "feedContent",
            cols: "30",
            rows: "10",
            placeholder: "你的宝贵意见，是我们前进的动力。"
        })).append($("<label>", {
            for: "isLogged"
        }).append("<checkbox>", {
            id: "isLogged",
            checked: "checked",
            text: "上传日志"
        })).append($("<p>", {
            className: "picTitle",
            text: "提供图片以协助我们解决问题"
        })).append($("<p>", {
            id: "picLimit",
            className: "picLimit",
            text: "0/2"
        })).append($("<file>"))
        .append(($("<button>"), {
            text: "完成"
        }).on("tap", function() {

        }));
};

module.exports = PostFeedPage;