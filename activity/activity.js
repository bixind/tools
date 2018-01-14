$(function () {
    var scope = 2 | 4096;
    $('#login').click(function () {
        var params = {client_id: VK._apiId,
            redirect_uri: "https://oauth.vk.com/blank.html",
            scope: scope,
            response_type: 'token',
            v: 5.69,
            display: 'popup'
        };
        window.open("https://oauth.vk.com/authorize?" + $.param(params));
    });

    var token;
    var re = /access_token=(\w+)/;
    $("#url-button").click(function() {
        var s = $('#tg-url').val();
        var res = re.exec(s);
        if (!res) {
            show_error("Неверный url");
            return;
        }
        hide_error();
        token = res[1];
        $('#inner-body').removeClass("hidden");
        VK.Api.call('messages.getLongPollServer', {need_pts: 0, lp_version: 2}, function (r) {
            console.log(r);
        });
    });
});