import * as RGB from "./connections/keyboard";
import { Colors, KeyNames, Rows } from "./libs/colors";
import gradients from "./libs/gradients";

import League from "./profiles/league";
import Gradient from "./profiles/gradient";
import Rainbow from "./profiles/rainbow";
import solid from "./profiles/solid";
import Discord from "./profiles/discord";
import Website from "./profiles/website";
import File from "./profiles/file";

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

// League(Colors.AQUA);
// Gradient(Colors.RED, Colors.ORANGE, true);
// Rainbow();
// solid(Colors.rgb(100, 0, 255));
// Discord(4040);
// Website(8000, 8001);
File("./keyboard.json");