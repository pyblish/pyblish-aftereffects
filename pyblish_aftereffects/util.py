import sys
import socket


def send(msg, port=None):

    host = '127.0.0.1'
    if not port:
        port = int(sys.argv[sys.argv.index("--port") + 1])

    conn = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    conn.connect((host, port))
    conn.send(msg)
    r = conn.recv(4096)
    conn.close()
    return r


if __name__ == '__main__':
    send("return app.version", port=8728)
