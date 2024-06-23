import {
  inflate_1
} from "./chunk-Q6MCOF6F.js";
import {
  BaseDecoder
} from "./chunk-QJEPB4DJ.js";
import "./chunk-EHLZM3EC.js";

// node_modules/geotiff/dist-module/compression/deflate.js
var DeflateDecoder = class extends BaseDecoder {
  decodeBlock(buffer) {
    return inflate_1(new Uint8Array(buffer)).buffer;
  }
};
export {
  DeflateDecoder as default
};
//# sourceMappingURL=deflate-JOHWFDG3.js.map
