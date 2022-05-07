import * as RGB from "../../connections/keyboard";
import { KeyColor } from "../../libs/colors";
import rainbow from "../../libs/rainbow";

const zero_color: KeyColor = {
    red: 128,
    green: 238,
    blue: 18
}

// this one has a lot of problems

export default function() {
    let index = 0;
    setInterval(() => {
        let color = rainbow(index, 0.05);
        RGB.setAllKeys(color);
        if(color.red == zero_color.red && color.green == zero_color.green && color.blue == zero_color.blue) index = 0;
        index++;
        RGB.update();
    }, 20);
}