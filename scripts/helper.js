function changeCharset(binary, charset) {
        var ado = new ActiveXObject('ADODB.Stream');

        ado.Type = 1;            // Set to binary mode
        ado.Mode = 3;            // Can read and write at the same time
        ado.Open();              // Open the object
        ado.Write(binary);       // Write data to the object
        ado.Position = 0;        // Start from the front
        ado.Type     = 2;        // Set to text mode
        ado.Charset  = charset;  // Set the charset
        
        var res = ado.ReadText();

        ado.Close();
        return res;
}

// On windows system, the file name cannot contain such characters like /\:?"*<>|
// This function strip those characters and return the new string
function stripInvalidFileNameChars(fileName) {
        return fileName.replace(/[\/\\:\?"*<>|\.]/g, '');
}

function saveFileToDisk(data, fileName) {
        var ado = new ActiveXObject('ADODB.Stream');

        ado.Type = 1;                 // Set to binary mode
        ado.Open();
        ado.Write(data);              // Write binary data to the object
        ado.SaveToFile(fileName, 2);  // Write the data to disk
                                      // If the fileName already exist, the data will overwirte it
        ado.Close();
}
