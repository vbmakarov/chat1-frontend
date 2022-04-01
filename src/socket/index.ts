import { io } from "socket.io-client";
import { config } from '../config'

const socket = io(config.SERVER_URL, { autoConnect: false })

export function socketConnect() {

    socket.connect()

    socket.on("connect", () => {
        console.log(window.location.origin);
    });


    socket.on("connect_error", () => {
        setTimeout(() => {
            socket.connect();
        }, 1000);
    });
}

export default socket;