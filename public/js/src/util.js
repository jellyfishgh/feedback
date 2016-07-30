function formateDT(date) {
    return formateDate(date) + ' ' + formateTime(date);
}

function formateDate(date) {
    return (date.getMonth() + 1) + '.' + date.getDate();
}

function formateTime(date) {
    return prefix(date.getHours()) + ':' + prefix(date.getMinutes());
}

function prefix(num) {
    return num < 10 ? '0' + num : num;
}

var week = ['日', '一', '二', '三', '四', '五', '六'];

module.exports = {
    $: window.Zepto,
    fetchMyFeeds: function(uid, resolve, reject, finish) {
        this.$.ajax({
            type: 'GET',
            url: '/mobile/feedback/api/myproblems',
            data: {
                uid: uid
            },
            dataType: 'json',
            timeout: 2000,
            success: function(resJSON) {
                if (resJSON.code === 0) resolve(resJSON.extData);
                else reject(resJSON.code);
            },
            error: function(xhr, errorType, error) {
                reject(error);
            },
            complete: function() {
                finish();
            }
        });
    },
    postFeed: function(data, resolve, reject, finish) {
        this.$.ajax({
            type: 'POST',
            url: '/mobile/feedback/api/problem',
            data: data,
            contentType: 'application/json',
            timeout: 2000,
            success: function(feed) {
                resolve(feed);
            },
            error: function(xhr, errorType, error) {
                reject(error);
            },
            complete: function() {
                finish();
            }
        });
    },
    fetchAnswers: function(feedid, resolve, reject, finish) {
        this.$.ajax({
            type: 'GET',
            url: '/mobile/feedback/api/problemdetail',
            data: {
                feedbackid: feedid
            },
            contentType: 'application/json',
            timeout: 2000,
            success: function(resJSON) {
                if (resJSON.code === 0) {
                    resolve(resJSON.answers);
                } else {
                    reject(resJSON.code);
                }
            },
            error: function(xhr, errorType, error) {
                reject(error);
            },
            complete: function() {
                finish();
            }
        });
    },
    postAnswer: function(data, resolve, reject, finish) {
        this.$.ajax({
            type: 'POST',
            url: '/mobile/feedback/api/answer',
            data: data,
            contentType: 'application/json',
            timeout: 2000,
            success: function(feed) {
                resolve(feed);
            },
            error: function(xhr, errorType, error) {
                reject(error);
            },
            complete: function() {
                finish();
            }
        });
    },
    format: function(dateLocalStr) {
        var date = new Date(dateLocalStr);
        var now = new Date();
        if (date.getFullYear() === now.getFullYear()) {
            if (date.getMonth() === now.getMonth()) {
                if (date.getDate() === now.getDate()) {
                    return formateTime(date);
                } else {
                    if (now.getDate() - date.getDate() === 1) {
                        return '昨天 ' + formateTime(date);
                    } else {
                        if (now.getDate() - date.getDate() < 7) {
                            return '星期' + week[now.getDay()] + ' ' + formateTime(date);
                        } else {
                            return formateDT(date);
                        }
                    }
                }
            } else {
                return formateDT(date);
            }
        } else {
            return date.toLocaleDateString();
        }
    },
    trim: function(str) {
        return str.replace(/^\s+|\s+$/g, '');
    },
    parse: function(search) {
        var queries = search.split('&');
        var json = {};
        for (var i = 0; i < queries.length; i++) {
            var kv = queries[i].split('=');
            json[kv[0]] = kv[1];
        }
        return json;
    },
    createLoadingView: function() {
        return this.$('<div>', {
            className: 'loading center'
        });
    },
    createErrorView: function() {
        return this.$('<div>', {
            className: 'center info',
            text: '加载失败，请稍后重试。'
        });
    }
};