import * as RGB from "../../connections/keyboard";

export default function(path: string) {
    RGB.dataFromFile(path);
    setInterval(() => {
        RGB.update();
    }, 20);
}