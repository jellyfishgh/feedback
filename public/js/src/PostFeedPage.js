var $ = require('./util').$;
var ImgUploader = require('./ImgUploader');

function PostFeedPage(searchObj) {
    this.sign = searchObj.sign;
    this.uid = searchObj.uid;
    this.email = searchObj.email;
    this.devName = searchObj.devName;
    this.sysVersion = searchObj.sysVersion;
    this.appVersion = searchObj.appVersion;
    this.platform = searchObj.platform;
    return this.render();
}

PostFeedPage.prototype.render = function() {
    return $("<div>", {
            id: "postFeed",
            className: "postFeed"
        })
        .append($("<textarea>", {
            name: "feedContent",
            id: "feedContent",
            className: "feedContent",
            cols: "30",
            rows: "10",
            placeholder: "你的宝贵意见，是我们前进的动力。"
        }))
        .append($("<label>", {
            for: "isLogged"
        }))
        .append($("<checkbox>", {
            id: "isLogged",
            checked: "checked",
            text: "上传日志"
        }))
        .append($("<p>", {
            className: "picTitle",
            text: "提供图片以协助我们解决问题"
        }))
        .append($("<p>", {
            id: "picLimit",
            className: "picLimit",
            text: "0/2"
        }))
        .append(new ImgUploader().render())
        .append($("<button>", {
            text: "完成"
        }).on("tap", function() {
            util.postFeed();
        }));
};

module.exports = PostFeedPage;