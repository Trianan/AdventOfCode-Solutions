"use strict";
var fs = require('fs');
var tools = require('../../tools.js');
const cl = tools.cl;

cl('AoC: Day 1 (2/2)');

function get_window_sums(data, window_offset=2) {
    let sums = [];

    for (let i = 0; i < data.length; ++i) {
        let window_sum = 0;

        if (i + window_offset < data.length) {
            for (let j = i; j <= i + window_offset; ++j) {
                window_sum += data[j];
            }
            sums.push(window_sum);
        }
        else { 
            cl('Not enough data for another window calculation.')
        }

    }
    return sums;    
}

let data = fs.readFileSync('day1_input.txt').toString().split("\n");
if (data) {
    cl(`Data read successfully; ${data.length} items.`);
    for (let i = 0; i < data.length; ++i) {
        data[i] = Number(data[i]);
    }

    const sums = get_window_sums(data);

    let previous = sums[0], increases = 0;
    for (const sum of sums) {
        cl(`Current: ${sum} Previous: ${previous}`);
        if (sum > previous) {
            ++increases;
            cl(`Increase! (Total: ${increases})`);
        }
        previous = sum;
    }
    cl(`Increases: ${increases}`);
}
else {
    cl('No data has been read.')
}