// settting port environment variable
var port = Math.floor((Math.random() * 1000) + 8000);
$.setenv("PYBLISH_AFTEREFFECTS_PORT", port);

// start pyblish lite
var cmd = "start python -m pyblish_standalone --register-gui pyblish_lite"
var batFile= new File("~/pyblish_aftereffects.bat");
batFile.open("w");
batFile.write(cmd);
batFile.close();
batFile.execute();

// create a new socket
conn = new Socket();

var keep_serving = true;

while (keep_serving) {
    if (conn.listen(port))  // ... you'd probably want to make this configurable
    {
        // wait forever for a connection
        var incoming;
        do incoming = conn.poll();
        while (incoming == null);

        // grab the next non-null communication
        new_cmd = incoming.read();
        try {
            var F = new Function (new_cmd);
            var results = F();
            incoming.writeln(results);
        }
        catch (err) {
            incoming.writeln(err + "FAIL\n");
            incoming.close();
            delete incoming;
        }
    } // end if
} // -- end while
