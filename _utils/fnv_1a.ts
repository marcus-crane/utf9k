//
// fnv32
//
// Version: 0.0.1
// Author: Mark W. B. Ashcroft (mark [at] fluidecho [dot] com)
// License: MIT or Apache 2.0.
//
// Copyright (c) 2017 Mark W. B. Ashcroft.
// Copyright (c) 2017 FluidEcho.
//
// Imported directly from https://github.com/fluidecho/fnv32/blob/master/lib/fnv32.js
// to save an NPM import
import { Buffer } from "https://deno.land/std@0.139.0/node/buffer.ts";

export const fnv_1a = function (data: any) {

    if (typeof data === 'string') {
        data = new Buffer(data);
    }

    if (!Buffer.isBuffer(data)) {
        throw new Error('fnv32 input must be a String or Buffer.');
    }

    let hashint = 2166136261; // offset basis

    for (let i = 0; i < data.length; i++) {
        hashint = hashint ^ data[i];
        hashint += (hashint << 1) + (hashint << 4) + (hashint << 7) + (hashint << 8) + (hashint << 24);
    }

    return hashint >>> 0;    // unsigned 32 bit integer.

};