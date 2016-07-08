var $ = require('./util').$;

function ImgUploader() {

}

ImgUploader.prototype.render = function() {
    return $('<div>', {
            id: 'uploader',
            className: 'wu-example'
        })
        .append($('<div>', {
            id: 'thelist',
            className: 'uploader-list'
        }))
        .append($('<div>', {
            className: 'btns'
        }).append($('<div>', {
            id: picker,
            text: '选择文件'
        })).append($('<buttton>', {
            id: 'ctlBtn',
            className: 'btn btn-default',
            text: '开始上传'
        })));
}

module.exports = ImgUploader;