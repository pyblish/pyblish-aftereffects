// create a new socket
conn = new Socket();

var keep_serving = true;

while (keep_serving) {
    if (conn.listen(8789))  // ... you'd probably want to make this configurable
    {
        // wait forever for a connection
        var incoming;
        do incoming = conn.poll();
        while (incoming == null);

        // grab the next non-null communication
        new_cmd = incoming.read();
        try {
            var F = new Function (new_cmd);
            incoming.writeln(F());
        }
        catch (err) {
            incoming.writeln(err + "FAIL\n");
            incoming.close();
            delete incoming;
        }
    } // end if
} // -- end while
