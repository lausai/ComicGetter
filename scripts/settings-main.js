var preference = window.dialogArguments;

$('#settings_ok').on('click', function() {
        var proxy = $('#proxy').val() + ':' + $('#port').val();

        if (proxy || '' == proxy)
                preference.setProxy(proxy);

        preference.setUseProxy(('checked' == $('#use_proxy').attr('checked')) ? true : false);
        
        var save_path = $('#save_path').val();
        if (save_path)
                preference.setSavePath(save_path);

        window.close();
});


$('#settings_cancel').on('click', function() {
        window.close();
});

$('#set_save_path').on('click', function() {
        var WINDOW_HANDLE = 0;  // This should be 0 if in script.
        var OPTIONS       = 0;  // Set to simplest mode, if set to &H10& then
                                // user can set the folder by typing the path manually
        var shell  = new ActiveXObject('Shell.Application');
        var folder = shell.BrowseForFolder(WINDOW_HANDLE, '您要將漫畫下載到哪', OPTIONS);
        
        if (folder)
                $('#save_path').val(folder.Self.Path);
});

$('#use_proxy').attr('checked', preference.isUseProxy());

if (preference.getProxy()) {
        var proxy = preference.getProxy().split(':');
        
        $('#proxy').val(proxy[0]);
        $('#port').val(proxy[1]);
} else {
        $('#proxy').val('');
        $('#port').val('');
}

if (preference.getSavePath())
        $('#save_path').val(preference.getSavePath());
