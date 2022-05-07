import { KeyColor, round } from "./colors";

export default function(index: number, frequency: number = 0.3): KeyColor {
    return round({
        red: Math.sin(frequency*index + 0) * 127 + 128,
        green: Math.sin(frequency*index + phase(2)) * 127 + 128,
        blue: Math.sin(frequency*index + phase(4)) * 127 + 128
    });
}

function phase(index: number) {
    return index * (Math.PI / 3)
}