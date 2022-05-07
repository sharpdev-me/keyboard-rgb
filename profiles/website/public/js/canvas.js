import { getData, setKey } from "./connection.js";
import { KeyNames, Colors, Rows, Groups, KeySymbols } from "./colors.js";

const key_width = 64;

let selected_keys = {};
const key_positions = {};

let pickr_ready = false;
let pickr_open = false;

const pickr = new Pickr({
    el: ".color_picker",
    theme: "classic",
    useAsButton: true,

    components: {
        preview: true,
        opacity: false,
        hue: true,

        interaction: {
            hex: true,
            rgba: true,
            save: true,
            input: true
        }
    }
});

pickr.on("init", instance => {
    pickr_ready = true;
}).on("change", color => {
    for (const key in selected_keys) {
        if (Object.hasOwnProperty.call(selected_keys, key)) {
            setKey(key, hsvaToTransfer(color));
        }
    }
}).on("save", (color, instance) => {
    let dataString = `data:application/json;charset=utf-8,${encodeURIComponent(JSON.stringify(getData()))}`;
    let anchor = document.createElement("a");
    anchor.setAttribute("href", dataString);
    anchor.setAttribute("download", "keyboard.json");
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
}).on("hide", () => {
    pickr_open = false;
})

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("main_canvas");
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;
    canvas.addEventListener("click", onClick, false);
    canvas.oncontextmenu = (e) => {
        e.preventDefault();
        if(!pickr_ready) return;
        if(pickr_open) {
            pickr.hide();
            pickr_open = false;
        } else {
            pickr.show();
            pickr_open = true;
        }
    };
    const ctx = canvas.getContext("2d");
    setInterval(draw, 20, ctx, canvas);
});

/**
 * 
 * @param {CanvasRenderingContext2D} ctx 
 * @param {HTMLCanvasElement} canvas 
 */
function draw(ctx, canvas) {
    let data = getData();
    if(data != {}) {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        draw_keyboard(ctx, canvas);
    }
}

/**
 * 
 * @param {CanvasRenderingContext2D} ctx
 * @param {HTMLCanvasElement} canvas
 */
function draw_keyboard(ctx, canvas) {
    draw_key(ctx, canvas, KeyNames.ESC, 0, 0);

    draw_key(ctx, canvas, KeyNames.F1, 2, 0);
    draw_key(ctx, canvas, KeyNames.F2, 3, 0);
    draw_key(ctx, canvas, KeyNames.F3, 4, 0);
    draw_key(ctx, canvas, KeyNames.F4, 5, 0);

    draw_key(ctx, canvas, KeyNames.F5, 6.5, 0);
    draw_key(ctx, canvas, KeyNames.F6, 7.5, 0);
    draw_key(ctx, canvas, KeyNames.F7, 8.5, 0);
    draw_key(ctx, canvas, KeyNames.F8, 9.5, 0);

    draw_key(ctx, canvas, KeyNames.F9, 11, 0);
    draw_key(ctx, canvas, KeyNames.F10, 12, 0);
    draw_key(ctx, canvas, KeyNames.F11, 13, 0);
    draw_key(ctx, canvas, KeyNames.F12, 14, 0);

    draw_key(ctx, canvas, KeyNames.PRINT_SCREEN, 15.5, 0);
    draw_key(ctx, canvas, KeyNames.SCROLL_LOCK, 16.5, 0);
    draw_key(ctx, canvas, KeyNames.PAUSE_BREAK, 17.5, 0);


    draw_key(ctx, canvas, KeyNames.GRAVE, 0, 1.5);
    draw_key(ctx, canvas, KeyNames.ONE, 1, 1.5);
    draw_key(ctx, canvas, KeyNames.TWO, 2, 1.5);
    draw_key(ctx, canvas, KeyNames.THREE, 3, 1.5);
    draw_key(ctx, canvas, KeyNames.FOUR, 4, 1.5);
    draw_key(ctx, canvas, KeyNames.FIVE, 5, 1.5);
    draw_key(ctx, canvas, KeyNames.SIX, 6, 1.5);
    draw_key(ctx, canvas, KeyNames.SEVEN, 7, 1.5);
    draw_key(ctx, canvas, KeyNames.EIGHT, 8, 1.5);
    draw_key(ctx, canvas, KeyNames.NINE, 9, 1.5);
    draw_key(ctx, canvas, KeyNames.ZERO, 10, 1.5);
    draw_key(ctx, canvas, KeyNames.MINUS, 11, 1.5);
    draw_key(ctx, canvas, KeyNames.EQUALS, 12, 1.5);
    draw_key(ctx, canvas, KeyNames.BACKSPACE, 13, 1.5, 2);

    draw_key(ctx, canvas, KeyNames.INSERT, 15.5, 1.5);
    draw_key(ctx, canvas, KeyNames.HOME, 16.5, 1.5);
    draw_key(ctx, canvas, KeyNames.PAGE_UP, 17.5, 1.5);


    draw_key(ctx, canvas, KeyNames.TAB, 0, 2.5, 1.5);
    draw_key(ctx, canvas, KeyNames.Q, 1.5, 2.5);
    draw_key(ctx, canvas, KeyNames.W, 2.5, 2.5);
    draw_key(ctx, canvas, KeyNames.E, 3.5, 2.5);
    draw_key(ctx, canvas, KeyNames.R, 4.5, 2.5);
    draw_key(ctx, canvas, KeyNames.T, 5.5, 2.5);
    draw_key(ctx, canvas, KeyNames.Y, 6.5, 2.5);
    draw_key(ctx, canvas, KeyNames.U, 7.5, 2.5);
    draw_key(ctx, canvas, KeyNames.I, 8.5, 2.5);
    draw_key(ctx, canvas, KeyNames.O, 9.5, 2.5);
    draw_key(ctx, canvas, KeyNames.P, 10.5, 2.5);
    draw_key(ctx, canvas, KeyNames.LEFT_BRACKET, 11.5, 2.5);
    draw_key(ctx, canvas, KeyNames.RIGHT_BRACKET, 12.5, 2.5);
    draw_key(ctx, canvas, KeyNames.BACKSLASH, 13.5, 2.5, 1.5);

    draw_key(ctx, canvas, KeyNames.DELETE, 15.5, 2.5);
    draw_key(ctx, canvas, KeyNames.END, 16.5, 2.5);
    draw_key(ctx, canvas, KeyNames.PAGE_DOWN, 17.5, 2.5);


    draw_key(ctx, canvas, KeyNames.CAPS_LOCK, 0, 3.5, 1.66);
    draw_key(ctx, canvas, KeyNames.A, 1.66, 3.5, 1);
    draw_key(ctx, canvas, KeyNames.S, 2.66, 3.5, 1);
    draw_key(ctx, canvas, KeyNames.D, 3.66, 3.5, 1);
    draw_key(ctx, canvas, KeyNames.F, 4.66, 3.5, 1);
    draw_key(ctx, canvas, KeyNames.G, 5.66, 3.5, 1);
    draw_key(ctx, canvas, KeyNames.H, 6.66, 3.5, 1);
    draw_key(ctx, canvas, KeyNames.J, 7.66, 3.5, 1);
    draw_key(ctx, canvas, KeyNames.K, 8.66, 3.5, 1);
    draw_key(ctx, canvas, KeyNames.L, 9.66, 3.5, 1);
    draw_key(ctx, canvas, KeyNames.SEMI_COLON, 10.66, 3.5, 1);
    draw_key(ctx, canvas, KeyNames.APOSTROPHE, 11.66, 3.5, 1);
    draw_key(ctx, canvas, KeyNames.ENTER, 12.66, 3.5, 2.34);


    draw_key(ctx, canvas, KeyNames.LEFT_SHIFT, 0, 4.5, 2);
    draw_key(ctx, canvas, KeyNames.Z, 2, 4.5);
    draw_key(ctx, canvas, KeyNames.X, 3, 4.5);
    draw_key(ctx, canvas, KeyNames.C, 4, 4.5);
    draw_key(ctx, canvas, KeyNames.V, 5, 4.5);
    draw_key(ctx, canvas, KeyNames.B, 6, 4.5);
    draw_key(ctx, canvas, KeyNames.N, 7, 4.5);
    draw_key(ctx, canvas, KeyNames.M, 8, 4.5);
    draw_key(ctx, canvas, KeyNames.COMMA, 9, 4.5);
    draw_key(ctx, canvas, KeyNames.PERIOD, 10, 4.5);
    draw_key(ctx, canvas, KeyNames.SLASH, 11, 4.5);
    draw_key(ctx, canvas, KeyNames.RIGHT_SHIFT, 12, 4.5, 3);

    draw_key(ctx, canvas, KeyNames.UP_ARROW, 16.5, 4.5);


    draw_key(ctx, canvas, KeyNames.LEFT_CONTROL, 0, 5.5, 1.1);
    draw_key(ctx, canvas, KeyNames.META, 1.1, 5.5, 1.1);
    draw_key(ctx, canvas, KeyNames.LEFT_ALT, 2.2, 5.5, 1.1);
    draw_key(ctx, canvas, KeyNames.SPACE, 3.3, 5.5, 6.6);
    draw_key(ctx, canvas, KeyNames.RIGHT_ALT, 9.9, 5.5, 1.1);
    draw_key(ctx, canvas, KeyNames.FUNCTION, 11, 5.5, 1.2);
    draw_key(ctx, canvas, KeyNames.MENU, 12.2, 5.5, 1.4);
    draw_key(ctx, canvas, KeyNames.RIGHT_CONTROL, 13.6, 5.5, 1.4);

    draw_key(ctx, canvas, KeyNames.LEFT_ARROW, 15.5, 5.5);
    draw_key(ctx, canvas, KeyNames.DOWN_ARROW, 16.5, 5.5);
    draw_key(ctx, canvas, KeyNames.RIGHT_ARROW, 17.5, 5.5);
}

/**
 * 
 * @param {CanvasRenderingContext2D} ctx
 * @param {HTMLCanvasElement} canvas
 */
function draw_key(ctx, canvas, key, x, y, width_multiplier) {
    if(!width_multiplier) width_multiplier = 1;
    let width = key_width * width_multiplier;
    const data = getData();
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.strokeStyle = selected_keys[key] === true ? "blue" : "white";
    ctx.lineWidth = 2;

    key_positions[key] = {
        x: 2 + (key_width * x),
        y: 2 + (key_width * y),
        width: width
    };
    ctx.rect(2 + (key_width * x), 2 + (key_width * y), width, key_width);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.fillStyle = `rgb(${data[key].toString()})`;
    ctx.lineWidth = 2;
    let text_split = KeySymbols[key].symbol.split("\n");
    for(let i = 0; i < text_split.length; i++) {
        let text = text_split[i];
        let text_metrics = ctx.measureText(text);
        let text_width = text_metrics.width;
        let text_height = text_metrics.actualBoundingBoxAscent + text_metrics.actualBoundingBoxDescent;
        ctx.fillText(text, 2 + (key_width * x) + (width / 2) - (text_width / 2), 2 + (key_width * y) + (key_width / 2) + (i * text_height * 1.5));
    }
}


/**
 * 
 * @param {MouseEvent} e 
 * @this {HTMLCanvasElement}
 */
function onClick(e) {
    for (const key in key_positions) {
        if (Object.hasOwnProperty.call(key_positions, key)) {
            const position = key_positions[key];
            if(e.x >= position.x && e.x <= position.x + position.width) {
                if(e.y >= position.y && e.y <= position.y + key_width) {
                    if(!e.ctrlKey) {
                        if(selected_keys[key] === true) {
                            selected_keys = {};
                            selected_keys[key] = false;
                        } else {
                            selected_keys = {};
                            selected_keys[key] = true;
                        }
                    } else {
                        selected_keys[key] = selected_keys[key] !== true ? true : false;
                    }
                    return;
                }
            }
        }
    }
}

function hsvaToTransfer(hsva) {
    let c = hsva.toRGBA();
    return Colors.rgb(c[0], c[1], c[2]);
}