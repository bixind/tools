$(function () {
    var scope = 2 | 4096;
    $('#login').click(function () {
        var params = {client_id: 6121199,
            redirect_uri: "https://bixind.github.io/tools/activity/index.html",
            scope: scope,
            response_type: 'token',
            v: 5.69
        };
        window.open("https://oauth.vk.com/authorize?" + $.param(params),"_self");
    });
    $('#listen-button').click(function () {
        VK.Api.call('messages.getLongPollServer', {need_pts: 0, lp_version: 2}, function (r) {
            console.log(r);
        });
    });
});