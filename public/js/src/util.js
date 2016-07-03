module.exports = {
    $: window.Zepto,
    fetchMyFeeds: function(host, uid, resolve, reject, finish) {
        this.$.ajax({
            type: 'GET',
            url: host + 'mobile/feedback/api/myproblems',
            data: {
                uid: uid
            },
            dataType: 'json',
            timeout: 2000,
            success: function(feeds) {
                resolve(feeds);
            },
            error: function(xhr, errorType, error) {
                reject(error);
            },
            complete: function() {
                finish();
            }
        });
    },
    getHead: function(uid){
        return '';
    }
};