$(function() {
    var session;
    $('#login').click(function(){
        VK.Auth.login(function(response) {
            if (response.session) {
                $('#login-failed').addClass("hidden");
                $('#polls-body').removeClass("hidden");
                session = response.session;
                VK.Api.call('users.get', {user_ids: response.session.user.id}, function(r) {
                    console.log(r);
                });
            } else {
                $('#login-failed').removeClass("hidden");
            }
        });
    }, 8192);
    var val = 0;
    $("#testb").click(function() {
        var place = $('#polls-list');
        place.empty();
        for (i = 0; i < 3; ++i) {
            place.append('<p>' + val + '</p>');
            val = val + 1;
        }
    });
});