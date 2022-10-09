"use strict";
var fs = require('fs');
var tools = require('../../tools.js');
const cl = tools.cl;

cl('AoC: Day 1 (1/2)');

// Reading from a text file (plain readFile() requires callback to use data.)
let data = fs.readFileSync('day1_input.txt').toString().split("\n");
if (data) {
    cl(`Data read successfully; ${data.length} items.`);
    for (let i = 0; i < data.length; ++i) {
        data[i] = Number(data[i]);
    }

    let previous = data[0], increases = 0;
    for (const measurement of data) {
        cl(`Current: ${measurement} Previous: ${previous}`);
        if (measurement > previous) {
            ++increases;
            cl(`Increase! (Total: ${increases})`);
        }
        previous = measurement;
    }
    cl(`Increases: ${increases}`);



}
else {
    cl('No data has been read.')
}

