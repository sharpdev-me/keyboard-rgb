import express from "express";
import * as ws from "ws";
import { Colors, Groups, KeyColor, KeyNames, Rows } from "../../libs/colors";
import * as RGB from "../../connections/keyboard";

export default function(port: number, wsPort: number) {
    const app = express();
    app.use("/", express.static("profiles/website/public"));

    const wsServer = new ws.Server({
        port: wsPort
    });

    wsServer.on("connection", socket => {
        socket.on("message", data => {
            console.log(data);
            let message = convert(data.toString());

            if(message.instruction == "set") {
                let key = message.arguments[0] as KeyNames;
                console.log(color(message.arguments[1]));
                
                RGB.setKey(key, color(message.arguments[1]));
            } else if(message.instruction == "row") {
                let row_name = message.arguments[0];
                let row: Rows;

                if(row_name == "FUNCTION") row = Rows.FUNCTION;
                if(row_name == "NUMBERS") row = Rows.NUMBERS;
                if(row_name == "TOP") row = Rows.TOP;
                if(row_name == "MIDDLE") row = Rows.MIDDLE;
                if(row_name == "BOTTOM") row = Rows.BOTTOM;
                if(row_name == "META") row = Rows.META;

                RGB.setRow(row, color(message.arguments[1]))
            } else if(message.instruction == "group") {
                let group_name = message.arguments[0];
                let col = color(message.arguments[1]);

                RGB.setGroup(Groups[group_name], col);
            } else if(message.instruction == "get") {
                let data = RGB.getData();
                let r = "";
                for (const key in data) {
                    if (Object.prototype.hasOwnProperty.call(data, key)) {
                        const color = data[key];
                        r += `${key}:${color.toString()};`;
                    }
                }
                console.log(r.substring(0, r.length - 1));
                socket.send(r.substring(0, r.length - 1));
            }
        });
        socket.on("close", (code, reason) => {
            console.log(`Socket closed (${code}) ${reason}`);
        })
    });
    
    app.listen(port, () => {
        console.log("express started " + port);
    });

    setInterval(() => {
        RGB.update();
    }, 20);
}

function convert(message: string): SocketMessage {
    let split = message.split(";");
    return {
        instruction: split.shift() as Instruction,
        arguments: split
    };
}

function color(arg: string) {
    let color_split = arg.split(",");
    return Colors.rgb(Number(color_split[0]), Number(color_split[1]), Number(color_split[2]));
}

type Instruction = 
    "set" |
    "row" |
    "group" |
    "get" |
    "clear";

interface SocketMessage {
    instruction: Instruction;
    arguments: string[];
}