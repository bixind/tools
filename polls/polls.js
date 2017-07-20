$(function() {
    var val = 0;
    $("#testb").click(function() {
        var place = $('#polls-list');
        place.empty();
        for (i = 0; i < 3; ++i) {
            place.append('<p>' + val + '</p>');
            val = val + 1;
        }
    });
    VK.Auth.login(function(response) {
        console.log(response.session);
        VK.Api.call('users.get', {user_ids: response.session.user.id}, function(r) {
            console.log(r);
        });
    });
});