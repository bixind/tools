$(function() {
    var session;
    function show_error(name) {
        $('#errors').text(name);
        $('#errors').removeClass("hidden");
    };
    function hide_error() {
            $('#errors').addClass("hidden");
    }
    $('#login').click(function(){
        VK.Auth.login(function(response) {
            if (response.session) {
                hide_error();
                $('#polls-body').removeClass("hidden");
                session = response.session;
                VK.Api.call('users.get', {user_ids: response.session.user.id}, function(r) {
                    console.log(r);
                });
            } else {
                show_error('Не удалось подключить профиль');
            }
        }, 8192);
    });

    function addPoll(place, owner_id, poll_id) {
        VK.Api.call('polls.getById', {owner_id: owner_id, poll_id: poll_id}, function(r) {
            var poll = r.response;
            var part = '<div class="panel panel-default">\
                            <div class="panel-heading">' + poll.question + '</div>\
                            <table class="table">\
                                <thead>\
                                <tr>\
                                    <th>Вариант</th>\
                                    <th>Голосов</th>\
                                    <th>Процент</th>\
                                </tr>\
                                </thead>\
                                <tbody>';

            poll.answers.forEach(function(item){
                part = part + '<tr>' +
                        '<th>' + item.text + '</th>' +
                        '<th>' + item.votes + '</th>' +
                        '<th>' + item.rate + '</th>' +
                        '</tr>';
            });
            part = part +
            '</tbody>\
                </table>\
                <div class="panel-body">\
                Голосов:' + poll.votes +
                '</div>\
            </div>';
            place.append(part);
        });
    };

    var re = /-?\d+_\d+$/;
    $("#url-button").click(function() {
        var s = $('#tg-url').val();
        var res = re.exec(s);
        if (!res) {
            show_error("Неверный url");
            return;
        }
        hide_error();
        var place = $('#polls-list');
        place.empty();
        VK.Api.call('wall.getById', {posts: res[0] }, function(r) {
            r.response[0].attachments.forEach(function(item){
                if (item.type === 'poll') {
                    addPoll(place, r.response[0].from_id, item.poll.poll_id);
                }
            });
        });
    });
});
