var preference = window.dialogArguments;

$('#settings_ok').on('click', function() {
        var proxy = $('#proxy').val();

        if (proxy || '' == proxy)
                preference.setProxy(proxy);

        preference.setUseProxy(('checked' == $('#use_proxy').attr('checked')) ? true : false);

        window.close();
});


$('#settings_cancel').on('click', function() {
        window.close();
});

$('#use_proxy').attr('checked', preference.isUseProxy());
$('#proxy').val(preference.getProxy() ? preference.getProxy() : '');
