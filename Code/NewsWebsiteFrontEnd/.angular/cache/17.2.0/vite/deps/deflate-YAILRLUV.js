import {
  inflate_1
} from "./chunk-Q6MCOF6F.js";
import {
  BaseDecoder
} from "./chunk-JCX666RU.js";
import "./chunk-CPNXOV62.js";

// node_modules/geotiff/dist-module/compression/deflate.js
var DeflateDecoder = class extends BaseDecoder {
  decodeBlock(buffer) {
    return inflate_1(new Uint8Array(buffer)).buffer;
  }
};
export {
  DeflateDecoder as default
};
//# sourceMappingURL=deflate-YAILRLUV.js.map
