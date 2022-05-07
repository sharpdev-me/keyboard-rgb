import * as RGB from "../../connections/keyboard"
import { KeyColor, KeyNames, round, Rows } from "../../libs/colors";
import Gradient from "../../libs/gradients";

export default function(start: KeyColor, end: KeyColor, horizontal?: boolean) {
    if(horizontal) {
        const gradient = Gradient(start, end, 18);

        RGB.setKey(KeyNames.ESC, gradient[0]);
        RGB.setKey(KeyNames.F1, gradient[2]);
        RGB.setKey(KeyNames.F2, gradient[3]);
        RGB.setKey(KeyNames.F3, gradient[4]);
        RGB.setKey(KeyNames.F4, gradient[5]);
        RGB.setKey(KeyNames.F5, gradient[6]);
        RGB.setKey(KeyNames.F6, gradient[7]);
        RGB.setKey(KeyNames.F7, gradient[8]);
        RGB.setKey(KeyNames.F8, gradient[9]);
        RGB.setKey(KeyNames.F9, gradient[11]);
        RGB.setKey(KeyNames.F10, gradient[12]);
        RGB.setKey(KeyNames.F11, gradient[13]);
        RGB.setKey(KeyNames.F12, gradient[14]);
        RGB.setKey(KeyNames.PRINT_SCREEN, gradient[15]);
        RGB.setKey(KeyNames.SCROLL_LOCK, gradient[16]);
        RGB.setKey(KeyNames.PAUSE_BREAK, gradient[17]);

        RGB.setKey(KeyNames.GRAVE, gradient[0]);
        RGB.setKey(KeyNames.ONE, gradient[1]);
        RGB.setKey(KeyNames.TWO, gradient[2]);
        RGB.setKey(KeyNames.THREE, gradient[3]);
        RGB.setKey(KeyNames.FOUR, gradient[4]);
        RGB.setKey(KeyNames.FIVE, gradient[5]);
        RGB.setKey(KeyNames.SIX, gradient[6]);
        RGB.setKey(KeyNames.SEVEN, gradient[7]);
        RGB.setKey(KeyNames.EIGHT, gradient[8]);
        RGB.setKey(KeyNames.NINE, gradient[9]);
        RGB.setKey(KeyNames.ZERO, gradient[10]);
        RGB.setKey(KeyNames.MINUS, gradient[11]);
        RGB.setKey(KeyNames.EQUALS, gradient[12]);
        RGB.setKey(KeyNames.BACKSPACE, gradient[14]);
        RGB.setKey(KeyNames.INSERT, gradient[15]);
        RGB.setKey(KeyNames.HOME, gradient[16]);
        RGB.setKey(KeyNames.PAGE_UP, gradient[17]);

        RGB.setKey(KeyNames.TAB, gradient[0]);
        RGB.setKey(KeyNames.Q, gradient[2]);
        RGB.setKey(KeyNames.W, gradient[3]);
        RGB.setKey(KeyNames.E, gradient[4]);
        RGB.setKey(KeyNames.R, gradient[5]);
        RGB.setKey(KeyNames.T, gradient[6]);
        RGB.setKey(KeyNames.Y, gradient[7]);
        RGB.setKey(KeyNames.U, gradient[8]);
        RGB.setKey(KeyNames.I, gradient[9]);
        RGB.setKey(KeyNames.O, gradient[10]);
        RGB.setKey(KeyNames.P, gradient[11]);
        RGB.setKey(KeyNames.LEFT_BRACKET, gradient[12]);
        RGB.setKey(KeyNames.RIGHT_BRACKET, gradient[14]);
        RGB.setKey(KeyNames.BACKSLASH, gradient[14]);
        RGB.setKey(KeyNames.DELETE, gradient[15]);
        RGB.setKey(KeyNames.END, gradient[16]);
        RGB.setKey(KeyNames.PAGE_DOWN, gradient[17]);

        RGB.setKey(KeyNames.CAPS_LOCK, gradient[0]);
        RGB.setKey(KeyNames.A, gradient[3]);
        RGB.setKey(KeyNames.S, gradient[4]);
        RGB.setKey(KeyNames.D, gradient[5]);
        RGB.setKey(KeyNames.F, gradient[6]);
        RGB.setKey(KeyNames.G, gradient[7]);
        RGB.setKey(KeyNames.H, gradient[8]);
        RGB.setKey(KeyNames.J, gradient[9]);
        RGB.setKey(KeyNames.K, gradient[10]);
        RGB.setKey(KeyNames.L, gradient[11]);
        RGB.setKey(KeyNames.SEMI_COLON, gradient[12]);
        RGB.setKey(KeyNames.APOSTROPHE, gradient[13]);
        RGB.setKey(KeyNames.ENTER, gradient[14]);

        RGB.setKey(KeyNames.LEFT_SHIFT, gradient[0]);
        RGB.setKey(KeyNames.Z, gradient[3]);
        RGB.setKey(KeyNames.X, gradient[4]);
        RGB.setKey(KeyNames.C, gradient[5]);
        RGB.setKey(KeyNames.V, gradient[6]);
        RGB.setKey(KeyNames.B, gradient[7]);
        RGB.setKey(KeyNames.N, gradient[8]);
        RGB.setKey(KeyNames.M, gradient[9]);
        RGB.setKey(KeyNames.COMMA, gradient[10]);
        RGB.setKey(KeyNames.PERIOD, gradient[11]);
        RGB.setKey(KeyNames.SLASH, gradient[12]);
        RGB.setKey(KeyNames.RIGHT_SHIFT, gradient[13]);
        RGB.setKey(KeyNames.UP_ARROW, gradient[16]);

        let l_alt = gradient[3];
        let r_alt = gradient[12];

        RGB.setKey(KeyNames.LEFT_CONTROL, gradient[0]);
        RGB.setKey(KeyNames.META, gradient[0]);
        RGB.setKey(KeyNames.LEFT_ALT, l_alt);
        RGB.setKey(KeyNames.SPACE, round({
            red: Math.sqrt((Math.pow(l_alt.red, 2) + Math.pow(r_alt.red, 2)) / 2),
            green: Math.sqrt((Math.pow(l_alt.green, 2) + Math.pow(r_alt.green, 2)) / 2),
            blue: Math.sqrt((Math.pow(l_alt.blue, 2) + Math.pow(r_alt.blue, 2)) / 2)
        }));
        RGB.setKey(KeyNames.RIGHT_ALT, r_alt);
        RGB.setKey(KeyNames.FUNCTION, gradient[13]);
        RGB.setKey(KeyNames.MENU, gradient[14]);
        RGB.setKey(KeyNames.RIGHT_CONTROL, gradient[14]);


        RGB.setKey(KeyNames.LEFT_ARROW, gradient[15]);
        RGB.setKey(KeyNames.DOWN_ARROW, gradient[16]);
        RGB.setKey(KeyNames.RIGHT_ARROW, gradient[17]);


        setInterval(() => {
            RGB.update();
        }, 40);

        return;
    }
    const gradient = Gradient(start, end, 6);

    setInterval(() => {
        RGB.setRow(Rows.FUNCTION, gradient[0]);
        RGB.setRow(Rows.NUMBERS, gradient[1]);
        RGB.setRow(Rows.TOP, gradient[2]);
        RGB.setRow(Rows.MIDDLE, gradient[3]);
        RGB.setRow(Rows.BOTTOM, gradient[4]);
        RGB.setRow(Rows.META, gradient[5]);
        RGB.update();
    }, 40);
}