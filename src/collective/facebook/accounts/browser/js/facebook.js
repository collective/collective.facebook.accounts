function clearForm(){
    document.getElementById("zc.page.browser_form").reset();
    // doing a "reset()" to the form is not enough, so let's remove
    // some additional form data
    var non_r_perm = document.getElementById("form.non_r_perm.to");
    while (non_r_perm.options[0] !== undefined){
        non_r_perm.options[0] = null;
    }
    var r_perm = document.getElementById("form.r_perm.to");
    while (r_perm.options[0] !== undefined){
        r_perm.options[0] = null;
    }
}

function removeAuthAccount(name){
    $("#auth-account-"+name).remove();
    jQuery.get('@@remove-fb-account',
                {'account_name':name},
                function(results){
                    clearForm();
                    var url = '@@facebook-controlpanel';
                    window.location = url;
                });
}

function requestAuth() {

    var appID = document.getElementById('form.app_key').value;
    var perms = "";

    $("select[name='form.non_r_perm.to'] option").each(
        function (){
            perms = perms +','+ $(this).attr('value') ;

        });
    $("select[name='form.r_perm.to'] option").each(
        function (){
            perms = perms +','+ $(this).attr('value') ;

        });

    // Remove initial ","
    perms = perms.slice(1);

    var path = 'https://www.facebook.com/dialog/oauth?';
    var queryParams = ['client_id=' + appID,
                        'redirect_uri=' + window.location,
                        'scope='+perms,
                        'response_type=token'];
    var query = queryParams.join('&');
    var url = path + query;

    if (appID !== 'undefined'){
        clearForm();
        window.open(url, "_blank", 'width=600,height=500');

    }
}

function requestAppToken() {
    var appID = document.getElementById('form.app_key2').value;
    var appSecret = document.getElementById('form.app_secret2').value;

    var path = 'https://graph.facebook.com/oauth/access_token?';
    var queryParams = ['client_id=' + appID,
                       'client_secret=' + appSecret,
                       'grant_type=client_credentials'];
    var query = queryParams.join('&');
    var url = path + query;

    if (appID !== 'undefined' && appID !== "" &&
        appSecret !== 'undefined' && appSecret !== ""){
        clearForm();
        jQuery.get(url, null, function (data) {
            var RE = /access_token=(.*)/;
            var match = data.match(RE);
            if (match && match[1]) {
                queryParams = ['access_token=' + match[1],
                               'app_token=1'];
                query = queryParams.join('&');
                window.location = window.location['href'] + '?' + query;
            }
        });
    }
}

if (window.location.hash.length != 0){
    var accessToken = window.location.hash.substring(1);
    var path = '@@facebook-controlpanel?';
    var queryParams = [accessToken];
    var query = queryParams.join('&');
    var url = path + query;
    if (opener != null){
        opener.location = url;
        window.close();
    }
    else{
        window.location = url;
    }
}