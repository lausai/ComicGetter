function ProgressDisplayer() {
}

ProgressDisplayer.prototype.onDwProgressChanged = function(progress) {
        $('#progress_bar').width(progress + '%');
}
