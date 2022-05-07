import { KeyNames, Colors, Rows, Groups } from "./colors.js";

let socket = new WebSocket("ws://127.0.0.1:8001");

let current_data = {};

socket.onopen = e => {
    socket.send(`get`);
};

socket.onmessage = e => {
    let key_data = {};
    let data = e.data;
    let pairs = data.split(";");
    for (const pair of pairs) {
        let s = pair.split(":");
        let key = s[0];
        let value = s[1];
        let vs = value.split(",");
        key_data[key] = Colors.rgb(vs[0], vs[1], vs[2]);
    }
    current_data = key_data;
};

socket.onclose = e => {
    if(e.wasClean) {
        console.log(`[close] Socket closed cleanly, reason=${e.reason}`);
    } else {
        console.log("[close] Connection ended unexpectedly");
    }
};

socket.onerror = e => {
    console.log(`[error] WebSocket error: ${error.message}`);
}

export function setKey(key, color) {
    current_data[key] = color;
    socket.send(`set;${key};${color.toString()}`);
}

export function setData(data_raw) {
    let data = {};
    for (const key in data_raw) {
        if (Object.hasOwnProperty.call(data_raw, key)) {
            const color = data_raw[key];
            data[key] = Colors.rgb(color.red, color.green, color.blue);
        }
    }
    current_data = data;
}

export function getData() {
    return current_data;
}

export function saveData() {
    for (const key in current_data) {
        if (Object.hasOwnProperty.call(current_data, key)) {
            const color = current_data[key];
            socket.send(`set;${key};${color.toString()}`);
        }
    }
}