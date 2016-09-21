import socket
HOST = '127.0.0.1'
PORT = 8789


def send(msg):

    conn = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    conn.connect((HOST, PORT))
    conn.send(msg)
    r = conn.recv(4096)
    conn.close()
    return r


if __name__ == "__main__":
    
    print send("return app.version")

    # stops remote server
    send("keep_serving = false")
