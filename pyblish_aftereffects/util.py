import os
import socket


def send(msg, port=None):

    host = '127.0.0.1'
    if not port:
        port = int(os.environ["PYBLISH_AFTEREFFECTS_PORT"])

    conn = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    conn.connect((host, port))
    conn.send(msg)
    r = conn.recv(4096)
    conn.close()
    return r


def stop_server(port=None):
    send("keep_serving = false", port)


if __name__ == '__main__':
    send("return app.version", port=8728)
