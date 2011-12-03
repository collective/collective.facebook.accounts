function removeAuthAccount(name){
    $("#auth-account-"+name).remove();
    jQuery.get('@@remove-fb-account',
                {'account_name':name},
                function(results){});
}

function requestAuth() {
    
    var appID = document.getElementById('form.app_key').value;
    var perms = ""

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
        //window.open(url);
        window.location = url;
    }
}

if (window.location.hash.length != 0){
    var accessToken = window.location.hash.substring(1);
    var path = '@@facebook-controlpanel?';
    var queryParams = [accessToken,];
    var query = queryParams.join('&');
    var url = path + query;
    window.location = url;
}