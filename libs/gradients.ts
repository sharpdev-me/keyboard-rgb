import { KeyColor } from "./colors";

export default function(start: KeyColor, end: KeyColor, steps: number = 10): KeyColor[] {
    let result: KeyColor[] = [];
    for(let i = 0; i < steps; i++) {
        result.push(gradientColor(start, end, i / (steps - 1)));
    }

    /*for(let i = 0; i < colors.length - 1; i++) {
        for(let j = 0; j < steps / colors.length; j++) {
            
        }
    }*/

    return result;
}

function gradientColor(start: KeyColor, end: KeyColor, percent: number): KeyColor {
    let r_diff = end.red - start.red;
    let b_diff = end.blue - start.blue;
    let g_diff = end.green - start.green;

    return {
        red: Math.round((r_diff * percent) + start.red),
        blue: Math.round((b_diff * percent) + start.blue),
        green: Math.round((g_diff * percent) + start.green)
    };
}