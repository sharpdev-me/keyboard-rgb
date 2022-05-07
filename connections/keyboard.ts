import * as usb from "usb";
import { KeyColor, Colors, KeyNames, Rows } from "../libs/colors";
import { promisify } from "util";
import * as fs from "fs";

class BufferBuilder {
    constructor(public data: string) {
        this.data = data;
    }

    append(data: string | number): BufferBuilder {
        if(typeof data == "string") {
            this.data += data;
        } else if(typeof data == "number") {
            let dataT = data.toString(16);
            if(data < 16) dataT = "0" + dataT;
            this.data += dataT;
        }
        return this;
    }

    fill(data: string, total: number): BufferBuilder {
        for(let i = this.data.length; i < total; i++) {
            this.append(data);
        }
        return this;
    }

    build(encoding: BufferEncoding): Buffer {
        if(this.data.length != 128) {
            // console.log(this.data);
        }
        return Buffer.from(this.data, encoding)
    }
}

interface KeyColors {
    esc: KeyColor;
    f1: KeyColor;
    f2: KeyColor;
    f3: KeyColor;
    f4: KeyColor;
    f5: KeyColor;
    f6: KeyColor;
    f7: KeyColor;
    f8: KeyColor;
    f9: KeyColor;
    f10: KeyColor;
    f11: KeyColor;
    f12: KeyColor;
    PrtScreen: KeyColor;
    ScrLock: KeyColor;
    PauseBreak: KeyColor;
    Grave: KeyColor;
    One: KeyColor;
    Two: KeyColor;
    Three: KeyColor;
    Four: KeyColor;
    Five: KeyColor;
    Six: KeyColor;
    Seven: KeyColor;
    Eight: KeyColor;
    Nine: KeyColor;
    Zero: KeyColor;
    Minus: KeyColor;
    Equals: KeyColor;
    Backspace: KeyColor;
    Insert: KeyColor;
    Home: KeyColor;
    PgUp: KeyColor;
    Tab: KeyColor;
    Q: KeyColor;
    W: KeyColor;
    E: KeyColor;
    R: KeyColor;
    T: KeyColor;
    Y: KeyColor;
    U: KeyColor;
    I: KeyColor;
    O: KeyColor;
    P: KeyColor;
    LBracket: KeyColor;
    RBracket: KeyColor;
    Backslash: KeyColor;
    Delete: KeyColor;
    End: KeyColor;
    PgDn: KeyColor;
    Caps: KeyColor;
    A: KeyColor;
    S: KeyColor;
    D: KeyColor;
    F: KeyColor;
    G: KeyColor;
    H: KeyColor;
    J: KeyColor;
    K: KeyColor;
    L: KeyColor;
    SemiColon: KeyColor;
    Apostrophe: KeyColor;
    Enter: KeyColor;
    LShift: KeyColor;
    Z: KeyColor;
    X: KeyColor;
    C: KeyColor;
    V: KeyColor;
    B: KeyColor;
    N: KeyColor;
    M: KeyColor;
    Comma: KeyColor;
    Period: KeyColor;
    Slash: KeyColor;
    RShift: KeyColor;
    Up: KeyColor;
    LCtrl: KeyColor;
    Meta: KeyColor;
    LAlt: KeyColor;
    Space: KeyColor;
    RAlt: KeyColor;
    Fn: KeyColor;
    Menu: KeyColor;
    RCtrl: KeyColor;
    Left: KeyColor;
    Down: KeyColor;
    Right: KeyColor;
};

function errorHandler(error: any) {
    if(error) return console.error(error);
}

const device = usb.findByIds(2385, 5862);

device.open();
const device_interface = device.interface(2);
device_interface.claim();

const out_endpoint = device_interface.endpoint(4) as usb.OutEndpoint;

out_endpoint.on("error", errorHandler);

function builder(colors: KeyColors): Buffer[] {
    const packets = [];
    packets[0] = new BufferBuilder("a200003c")
        .append(colors.esc.green)
        .append(colors.f1.green)
        .append(colors.f2.green)
        .append(colors.f3.green)
        .append(colors.f4.green)
        .append(colors.f5.green)
        .append("0000")
        .append(colors.f6.green)
        .append(colors.f7.green)
        .append(colors.Grave.green)
        .append(colors.One.green)
        .append(colors.Two.green)
        .append(colors.Three.green)
        .append("0000")
        .append(colors.esc.red)
        .append(colors.f1.red)
        .append(colors.f2.red)
        .append(colors.f3.red)
        .append(colors.f4.red)
        .append(colors.f5.red)
        .append("0000")
        .append(colors.f6.red)
        .append(colors.f7.red)
        .append(colors.Grave.red)
        .append(colors.One.red)
        .append(colors.Two.red)
        .append(colors.Three.red)
        .append("0000")
        .append(colors.esc.blue)
        .append(colors.f1.blue)
        .append(colors.f2.blue)
        .append(colors.f3.blue)
        .append(colors.f4.blue)
        .append(colors.f5.blue)
        .append("0000")
        .append(colors.f6.blue)
        .append(colors.f7.blue)
        .append(colors.Grave.blue)
        .append(colors.One.blue)
        .append(colors.Two.blue)
        .append(colors.Three.blue)
        .append("0000")
        .append(colors.Four.green)
        .append(colors.Five.green)
        .append(colors.Six.green)
        .append(colors.Seven.green)
        .append(colors.Eight.green)
        .append(colors.Tab.green)
        .append("0000")
        .append(colors.Q.green)
        .append(colors.W.green)
        .append(colors.E.green)
        .append(colors.R.green)
        .build("hex");
    packets[1] = new BufferBuilder("a201003c")
        .append(colors.T.green)
        .append(colors.Y.green)
        .append("0000")
        .append(colors.Four.red)
        .append(colors.Five.red)
        .append(colors.Six.red)
        .append(colors.Seven.red)
        .append(colors.Eight.red)
        .append(colors.Tab.red)
        .append("0000")
        .append(colors.Q.red)
        .append(colors.W.red)
        .append(colors.E.red)
        .append(colors.R.red)
        .append(colors.T.red)
        .append(colors.Y.red)
        .append("0000")
        .append(colors.Four.blue)
        .append(colors.Five.blue)
        .append(colors.Six.blue)
        .append(colors.Seven.blue)
        .append(colors.Eight.blue)
        .append(colors.Tab.blue)
        .append("0000")
        .append(colors.Q.blue)
        .append(colors.W.blue)
        .append(colors.E.blue)
        .append(colors.R.blue)
        .append(colors.T.blue)
        .append(colors.Y.blue)
        .append("0000")
        .append(colors.U.green)
        .append(colors.Caps.green)
        .append(colors.A.green)
        .append(colors.S.green)
        .append(colors.D.green)
        .append(colors.F.green)
        .append("0000")
        .append(colors.G.green)
        .append(colors.H.green)
        .append(colors.J.green)
        .append(colors.LShift.green)
        .append("ff")
        .append(colors.Z.green)
        .append("00")
        .append("00")
        .append(colors.U.red)
        .append(colors.Caps.red)
        .append(colors.A.red)
        .append(colors.S.red)
        .append(colors.D.red)
        .append(colors.F.red)
        .fill("0", 128)
        .build("hex")
    packets[2] = new BufferBuilder("a202003c")
        .append(colors.G.red)
        .append(colors.H.red)
        .append(colors.J.red)
        .append(colors.LShift.red)
        .append("00")
        .append(colors.Z.red)
        .append("0000")
        .append(colors.U.blue)
        .append(colors.Caps.blue)
        .append(colors.A.blue)
        .append(colors.S.blue)
        .append(colors.D.blue)
        .append(colors.F.blue)
        .append("0000")
        .append(colors.G.blue)
        .append(colors.H.blue)
        .append(colors.J.blue)
        .append(colors.LShift.blue)
        .append("00")
        .append(colors.Z.blue)
        .append("0000")
        .append(colors.X.green)
        .append(colors.C.green)
        .append(colors.V.green)
        .append(colors.B.green)
        .append(colors.N.green)
        .append(colors.LCtrl.green)
        .append("0000")
        .append(colors.Meta.green)
        .append(colors.LAlt.green)
        .append("00")
        .append(colors.Space.green)
        .append("00000000")
        .append(colors.X.red)
        .append(colors.C.red)
        .append(colors.V.red)
        .append(colors.B.red)
        .append(colors.N.red)
        .append(colors.LCtrl.red)
        .append("0000")
        .append(colors.Meta.red)
        .append(colors.LAlt.red)
        .append("00")
        .append(colors.Space.red)
        .append("00000000")
        .append(colors.X.blue)
        .append(colors.C.blue)
        .append(colors.V.blue)
        .append(colors.B.blue)
        .fill("0", 128)
        .build("hex");
    packets[3] = new BufferBuilder("a203003c")
        .append(colors.N.blue)
        .append(colors.LCtrl.blue)
        .append("0000")
        .append(colors.Meta.blue)
        .append(colors.LAlt.blue)
        .append("00")
        .append(colors.Space.blue)
        .append("00000000")
        .append(colors.f8.green)
        .append(colors.f9.green)
        .append(colors.f10.green)
        .append(colors.f11.green)
        .append(colors.f12.green)
        .append(colors.PrtScreen.green)
        .append("0000")
        .append(colors.ScrLock.green)
        .append(colors.PauseBreak.green)
        .append(colors.Nine.green)
        .append(colors.Zero.green)
        .append(colors.Minus.green)
        .append(colors.Equals.green)
        .append("0000")
        .append(colors.f8.red)
        .append(colors.f9.red)
        .append(colors.f10.red)
        .append(colors.f11.red)
        .append(colors.f12.red)
        .append(colors.PrtScreen.red)
        .append("0000")
        .append(colors.ScrLock.red)
        .append(colors.PauseBreak.red)
        .append(colors.Nine.red)
        .append(colors.Zero.red)
        .append(colors.Minus.red)
        .append(colors.Equals.red)
        .append("0000")
        .append(colors.f8.blue)
        .append(colors.f9.blue)
        .append(colors.f10.blue)
        .append(colors.f11.blue)
        .append(colors.f12.blue)
        .append(colors.PrtScreen.blue)
        .append("0000")
        .append(colors.ScrLock.blue)
        .append(colors.PauseBreak.blue)
        .append(colors.Nine.blue)
        .append(colors.Zero.blue)
        .append(colors.Minus.blue)
        .append(colors.Equals.blue)
        .append("0000")
        .fill("0", 128)
        .build("hex");
    packets[4] = new BufferBuilder("a204003c")
        .append(colors.Backspace.green)
        .append(colors.Insert.green)
        .append(colors.Home.green)
        .append(colors.PgUp.green)
        .append(colors.I.green)
        .append(colors.O.green)
        .append("0000")
        .append(colors.P.green)
        .append(colors.LBracket.green)
        .append(colors.RBracket.green)
        .append(colors.Backslash.green)
        .append(colors.Delete.green)
        .append(colors.End.green)
        .append("0000")
        .append(colors.Backspace.red)
        .append(colors.Insert.red)
        .append(colors.Home.red)
        .append(colors.PgUp.red)
        .append(colors.I.red)
        .append(colors.O.red)
        .append("0000")
        .append(colors.P.red)
        .append(colors.LBracket.red)
        .append(colors.RBracket.red)
        .append(colors.Backslash.red)
        .append(colors.Delete.red)
        .append(colors.End.red)
        .append("0000")
        .append(colors.Backspace.blue)
        .append(colors.Insert.blue)
        .append(colors.Home.blue)
        .append(colors.PgUp.blue)
        .append(colors.I.blue)
        .append(colors.O.blue)
        .append("0000")
        .append(colors.P.blue)
        .append(colors.LBracket.blue)
        .append(colors.RBracket.blue)
        .append(colors.Backslash.blue)
        .append(colors.Delete.blue)
        .append(colors.End.blue)
        .append("0000")
        .append(colors.PgDn.green)
        .append(colors.K.green)
        .append(colors.L.green)
        .append(colors.SemiColon.green)
        .append(colors.Apostrophe.green)
        .append("000000")
        .append(colors.Enter.green)
        .append(colors.M.green)
        .append(colors.Comma.green)
        .append(colors.Period.green)
        .fill("0", 128)
        .build("hex");
    packets[5] = new BufferBuilder("a205003c")
        .append(colors.Slash.green)
        .append("000000")
        .append(colors.PgDn.red)
        .append(colors.K.red)
        .append(colors.L.red)
        .append(colors.SemiColon.red)
        .append(colors.Apostrophe.red)
        .append("000000")
        .append(colors.Enter.red)
        .append(colors.M.red)
        .append(colors.Comma.red)
        .append(colors.Period.red)
        .append(colors.Slash.red)
        .append("000000")
        .append(colors.PgDn.blue)
        .append(colors.K.blue)
        .append(colors.L.blue)
        .append(colors.SemiColon.blue)
        .append(colors.Apostrophe.blue)
        .append("000000")
        .append(colors.Enter.blue)
        .append(colors.M.blue)
        .append(colors.Comma.blue)
        .append(colors.Period.blue)
        .append(colors.Slash.blue)
        .append("000000")
        .append(colors.RShift.green)
        .append(colors.Up.green)
        .append(colors.RAlt.green)
        .append(colors.Fn.green)
        .append(colors.Menu.green)
        .append(colors.RCtrl.green)
        .append("0000")
        .append(colors.Left.green)
        .append(colors.Down.green)
        .append(colors.Right.green)
        .append("0000000000")
        .append(colors.RShift.red)
        .append(colors.Up.red)
        .append(colors.RAlt.red)
        .append(colors.Fn.red)
        .append(colors.Menu.red)
        .append(colors.RCtrl.red)
        .append("0000")
        .fill("0", 128)
        .build("hex");
    packets[6] = new BufferBuilder("a2060014")
        .append(colors.Left.red)
        .append(colors.Down.red)
        .append(colors.Right.red)
        .append("0000000000")
        .append(colors.RShift.blue)
        .append(colors.Up.blue)
        .append(colors.RAlt.blue)
        .append(colors.Fn.blue)
        .append(colors.Menu.blue)
        .append(colors.RCtrl.blue)
        .append("0000")
        .append(colors.Left.blue)
        .append(colors.Down.blue)
        .append(colors.Right.blue)
        .fill("0", 128)
        .build("hex");

    return packets;
};

let colors: KeyColors = {
    esc: Colors.WHITE,
    f1: Colors.WHITE,
    f2: Colors.WHITE,
    f3: Colors.WHITE,
    f4: Colors.WHITE,
    f5: Colors.WHITE,
    f6: Colors.WHITE,
    f7: Colors.WHITE,
    f8: Colors.WHITE,
    f9: Colors.WHITE,
    f10: Colors.WHITE,
    f11: Colors.WHITE,
    f12: Colors.WHITE,
    PrtScreen: Colors.WHITE,
    ScrLock: Colors.WHITE,
    PauseBreak: Colors.WHITE,
    Grave: Colors.WHITE,
    One: Colors.WHITE,
    Two: Colors.WHITE,
    Three: Colors.WHITE,
    Four: Colors.WHITE,
    Five: Colors.WHITE,
    Six: Colors.WHITE,
    Seven: Colors.WHITE,
    Eight: Colors.WHITE,
    Nine: Colors.WHITE,
    Zero: Colors.WHITE,
    Minus: Colors.WHITE,
    Equals: Colors.WHITE,
    Backspace: Colors.WHITE,
    Insert: Colors.WHITE,
    Home: Colors.WHITE,
    PgUp: Colors.WHITE,
    Tab: Colors.WHITE,
    Q: Colors.WHITE,
    W: Colors.WHITE,
    E: Colors.WHITE,
    R: Colors.WHITE,
    T: Colors.WHITE,
    Y: Colors.WHITE,
    U: Colors.WHITE,
    I: Colors.WHITE,
    O: Colors.WHITE,
    P: Colors.WHITE,
    LBracket: Colors.WHITE,
    RBracket: Colors.WHITE,
    Backslash: Colors.WHITE,
    Delete: Colors.WHITE,
    End: Colors.WHITE,
    PgDn: Colors.WHITE,
    Caps: Colors.WHITE,
    A: Colors.WHITE,
    S: Colors.WHITE,
    D: Colors.WHITE,
    F: Colors.WHITE,
    G: Colors.WHITE,
    H: Colors.WHITE,
    J: Colors.WHITE,
    K: Colors.WHITE,
    L: Colors.WHITE,
    SemiColon: Colors.WHITE,
    Apostrophe: Colors.WHITE,
    Enter: Colors.WHITE,
    LShift: Colors.WHITE,
    Z: Colors.WHITE,
    X: Colors.WHITE,
    C: Colors.WHITE,
    V: Colors.WHITE,
    B: Colors.WHITE,
    N: Colors.WHITE,
    M: Colors.WHITE,
    Comma: Colors.WHITE,
    Period: Colors.WHITE,
    Slash: Colors.WHITE,
    RShift: Colors.WHITE,
    Up: Colors.WHITE,
    LCtrl: Colors.WHITE,
    Meta: Colors.WHITE,
    LAlt: Colors.WHITE,
    Space: Colors.WHITE,
    RAlt: Colors.WHITE,
    Fn: Colors.WHITE,
    Menu: Colors.WHITE,
    RCtrl: Colors.WHITE,
    Left: Colors.WHITE,
    Down: Colors.WHITE,
    Right: Colors.WHITE,
};

const transfer = promisify(out_endpoint.transfer).bind(out_endpoint);

export async function update() {
    const keyboard_data = builder(colors);
    for(const color of keyboard_data) {
        try {
            await transfer(color);
        } catch(e) {
            return console.error(e);
        }
    }
}

export function setKey(key: string, color: KeyColor) {
    colors[key] = color;
}

export function getKey(key: string): KeyColor {
    return colors[key];
}

export function setData(data: KeyColors) {
    colors = data;
}

export function getData(): KeyColors {
    return colors;
}

export function dataFromFile(file): void {
    fs.readFile(file, {encoding:"utf-8"}, (err, data) => {
        if(err) return console.error(err);
        let json = JSON.parse(data) as KeyColors;
        let dataToSet = {};
        for (const key in json) {
            if (Object.prototype.hasOwnProperty.call(json, key)) {
                const color = json[key];
                dataToSet[key] = Colors.rgb(color.red, color.green, color.blue);
            }
        }
        setData(dataToSet as KeyColors);
    });
}

export function setRow(row: Rows, color: KeyColor) {
    let data = getData();
    if(row == Rows.FUNCTION) {
        data[KeyNames.ESC] = color;
        data[KeyNames.F1] = color;
        data[KeyNames.F2] = color;
        data[KeyNames.F3] = color;
        data[KeyNames.F4] = color;
        data[KeyNames.F5] = color;
        data[KeyNames.F6] = color;
        data[KeyNames.F7] = color;
        data[KeyNames.F8] = color;
        data[KeyNames.F9] = color;
        data[KeyNames.F10] = color;
        data[KeyNames.F11] = color;
        data[KeyNames.F12] = color;
        data[KeyNames.PRINT_SCREEN] = color;
        data[KeyNames.SCROLL_LOCK] = color;
        data[KeyNames.PAUSE_BREAK] = color;
    } else if(row == Rows.NUMBERS) {
        data[KeyNames.GRAVE] = color;
        data[KeyNames.ONE] = color;
        data[KeyNames.TWO] = color;
        data[KeyNames.THREE] = color;
        data[KeyNames.FOUR] = color;
        data[KeyNames.FIVE] = color;
        data[KeyNames.SIX] = color;
        data[KeyNames.SEVEN] = color;
        data[KeyNames.EIGHT] = color;
        data[KeyNames.NINE] = color;
        data[KeyNames.ZERO] = color;
        data[KeyNames.MINUS] = color;
        data[KeyNames.EQUALS] = color;
        data[KeyNames.BACKSPACE] = color;
        data[KeyNames.INSERT] = color;
        data[KeyNames.HOME] = color;
        data[KeyNames.PAGE_UP] = color;
    } else if(row == Rows.TOP) {
        data[KeyNames.TAB] = color;
        data[KeyNames.Q] = color;
        data[KeyNames.W] = color;
        data[KeyNames.E] = color;
        data[KeyNames.R] = color;
        data[KeyNames.T] = color;
        data[KeyNames.Y] = color;
        data[KeyNames.U] = color;
        data[KeyNames.I] = color;
        data[KeyNames.O] = color;
        data[KeyNames.P] = color;
        data[KeyNames.LEFT_BRACKET] = color;
        data[KeyNames.RIGHT_BRACKET] = color;
        data[KeyNames.BACKSLASH] = color;
        data[KeyNames.DELETE] = color;
        data[KeyNames.END] = color;
        data[KeyNames.PAGE_DOWN] = color;
    } else if(row == Rows.MIDDLE) {
        data[KeyNames.CAPS_LOCK] = color;
        data[KeyNames.A] = color;
        data[KeyNames.S] = color;
        data[KeyNames.D] = color;
        data[KeyNames.F] = color;
        data[KeyNames.G] = color;
        data[KeyNames.H] = color;
        data[KeyNames.J] = color;
        data[KeyNames.K] = color;
        data[KeyNames.L] = color;
        data[KeyNames.SEMI_COLON] = color;
        data[KeyNames.APOSTROPHE] = color;
        data[KeyNames.ENTER] = color;
    } else if(row == Rows.BOTTOM) {
        data[KeyNames.LEFT_SHIFT] = color;
        data[KeyNames.Z] = color;
        data[KeyNames.X] = color;
        data[KeyNames.C] = color;
        data[KeyNames.V] = color;
        data[KeyNames.B] = color;
        data[KeyNames.N] = color;
        data[KeyNames.M] = color;
        data[KeyNames.COMMA] = color;
        data[KeyNames.PERIOD] = color;
        data[KeyNames.SLASH] = color;
        data[KeyNames.RIGHT_SHIFT] = color;
        data[KeyNames.UP_ARROW] = color;
    } else if(row == Rows.META) {
        data[KeyNames.LEFT_CONTROL] = color;
        data[KeyNames.META] = color;
        data[KeyNames.LEFT_ALT] = color;
        data[KeyNames.SPACE] = color;
        data[KeyNames.RIGHT_ALT] = color;
        data[KeyNames.FUNCTION] = color;
        data[KeyNames.MENU] = color;
        data[KeyNames.RIGHT_CONTROL] = color;
        data[KeyNames.LEFT_ARROW] = color;
        data[KeyNames.DOWN_ARROW] = color;
        data[KeyNames.RIGHT_ARROW] = color;
    }
    setData(data);
}

export function setGroup(group: KeyNames[], color: KeyColor) {
    group.forEach(key => {
        setKey(key, color);
    });
}

export function setAllKeys(color: KeyColor) {
    for(const key in KeyNames) {
        colors[KeyNames[key]] = color;
    }
}