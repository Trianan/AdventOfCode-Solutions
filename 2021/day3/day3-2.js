"use strict";
var fs = require('fs');
var tools = require('../../tools.js');
const cl = tools.cl;
const ansi = tools.ansi_codes;
cl(`\t\t\tAoC: Day 3 (2/2)`,
    ansi.bg.blue,
    ansi.fg.cyan
);
//------------------------------------------------------------------------------

function get_criteria_bit(logs, bit_position, invert=false) {
    // Returns the most common bit in a given position from a list of logs.
    // Returns the opposite if inverted.
    let positive_bits = 0;
    for (const log of logs) {
        if (log[bit_position] === '1') {
            ++positive_bits;
        }
    }
    if (positive_bits >= logs.length - positive_bits) {
        if (invert) { return '0' };
        return '1';
    }
    if (invert) { return '1' };
    return '0';
}

function filter(logs, invert=false, current_bit=0) {
    if (logs.length <= 1 || current_bit >= logs[0].length) {
        const result = Number.parseInt(logs.pop(), 2);
        cl(`
            Result: ${result} ${(invert)?'(epsilon)':'(gamma)'}`, 
            ansi.fg.magenta
        );
        return result;
    }
    else {
        let filtered_logs = [];
        const criteria_bit = get_criteria_bit(logs, current_bit, invert);

        cl(criteria_bit, ansi.fg.yellow);

        for (const log of logs) {
            if (log[current_bit] === criteria_bit) {
                filtered_logs.push(log);
            }
        }

        cl('\n***', filtered_logs);

        return filter(filtered_logs, invert, ++current_bit);
    }
}

//------------------------------------------------------------------------------
let diagnostics = fs.readFileSync(
    'day3_input.txt').toString().split('\r\n');
if (diagnostics) {
    cl(diagnostics);

    cl(`Test: ${filter(diagnostics)}`, ansi.fg.red);

    const o2_generator_rating = filter(diagnostics);
    const co2_scrubber_rating = filter(diagnostics, true);
    const life_support_rating = o2_generator_rating * co2_scrubber_rating;

    cl(`
        O₂-generator rating: ${o2_generator_rating}
        CO₂-scrubber rating: ${co2_scrubber_rating}
        LIFE SUPPORT RATING: ${life_support_rating}`,
        ansi.fg.cyan
    );
}
else {
    cl('No diagnostics have been read.')
}