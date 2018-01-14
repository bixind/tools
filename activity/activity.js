$(function () {
    $('#login').click(loginFunc(8192 | 4096));
    $('#listen-button').click(function () {
        VK.API.call('messages.getLongPollServer', {need_pts: 0, lp_version: 2}, function (r) {
            console.log(r);
        });
    });
});