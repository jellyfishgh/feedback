export function getMyFeeds(host, uid, resolve, reject, finish) {
    $.ajax({
        type: 'GET',
        url: `${host}mobile/feedback/api/myproblems`,
        data: {
            uid: uid
        },
        dataType: 'json',
        timeout: 1000,
        success: function (feeds) {
            resolve(feeds);
        },
        error: function (xhr, errorType, error) {
            reject(error);
        },
        complete: function(){
            finish();
        }
    });
}

export function route(url){

}