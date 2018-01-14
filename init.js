VK.init({
    apiId: 6121199
});

function show_error(name) {
        $('#errors').text(name);
        $('#errors').removeClass("hidden");
}
function hide_error() {
        $('#errors').addClass("hidden");
}

function tryToLogin(scope) {
    VK.Auth.login(function(response) {
        if (response.session) {
            hide_error();
            $('#polls-body').removeClass("hidden");
            session = response.session;
        } else {
            show_error('Не удалось подключить профиль');
        }
    }, scope);
}

function loginFunc(scope) {
    return function () {
        tryToLogin(scope);
    }
}