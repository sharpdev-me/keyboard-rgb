import * as RGB from "../../connections/keyboard";
import { KeyColor } from "../../libs/colors";

export default function(color: KeyColor) {
    RGB.setAllKeys(color);
    setInterval(() => {
        RGB.update();
    }, 20);
}