"use strict";
var fs = require('fs');
var tools = require('../../tools.js');
const cl = tools.cl;
const ansi = tools.ansi_codes;

cl('\t\t\tAoC: Day 3 (2/2)', ansi.fg.yellow);

let diagnostics = fs.readFileSync(
    'day3_input.txt').toString().split('\r\n');
if (diagnostics) {
    cl(diagnostics);

    // THIS MUST BE REFACTORED SO THESE ARE RECALCULATED
    // FOR EACH ITERATION OF factor().
    let code_length = diagnostics[0].length;
    let positive_bits = [];
    for (let i = 0; i < code_length; ++i) {
        positive_bits.push(0);
    }
    for (let i = 0; i < diagnostics.length; ++i) {
        for (let bit = 0; bit < code_length; ++bit) {
            if (diagnostics[i][bit] === '1') {
                positive_bits[bit] += 1;
            }
        }
    }
    cl(`\nPositive-bit totals:\n\t${positive_bits}`);
    let gamma_rate = positive_bits.map( ones => {
        // Composes a binary string consisting of the most
        // common bit for each index-position.
        if (ones >= diagnostics.length - ones) {
            return 1;
        }
        return 0;
    });
    let epsilon_rate = gamma_rate.map( bit => {
        // Inverts the gamma rate.
        if (bit === 1) {
            return 0;
        }
        return 1;
    });
    cl(`\tγ-rate: ${gamma_rate.join('')}`, ansi.fg.cyan);
    cl(`\tε-rate: ${epsilon_rate.join('')}`, ansi.fg.magenta);
    // END REFACTOR BLOCK




    function filter(logs, bit_criteria, i=0) {
        if (logs.length > 1 && i < bit_criteria.length) {
            let filtered_logs = [];
            for (const log of logs) {
                if (log[i] == bit_criteria[i]) {
                    filtered_logs.push(log);
                }
            }
            cl(
                '--=='.repeat(20),
                ansi.fg.yellow,
                `Bit-Criteria: ${bit_criteria.join('')} Current index: ${i}`,
                ansi.fg.cyan,
                (filtered_logs.length > 10) ? 
                    `Remaining logs: ${filtered_logs.length}` :
                    `${filtered_logs.join(', ')}`
            );
            // GAMMA AND EPSILON RATES TO BE CALCULATED AROUND HERE.
            return filter(filtered_logs, bit_criteria, i+1);
        }
        else {
            // Base case is met:
            return logs[0];
        }
    }

    const oxygen_generator_rating = Number.parseInt(
        filter(diagnostics, gamma_rate), 2
    );
    const co2_scrubber_rating = Number.parseInt(
        filter(diagnostics, epsilon_rate), 2
    );
    const life_support_rating = oxygen_generator_rating * 
                                co2_scrubber_rating;

    cl(`
        O₂-generator rating: ${oxygen_generator_rating} (${
            oxygen_generator_rating.toString(2)})
        CO₂-scrubber rating: ${co2_scrubber_rating} (${
            co2_scrubber_rating.toString(2)})
        LIFE SUPPORT RATING: ${life_support_rating}`,
        ansi.fg.green
        );
}
else {
    cl('No diagnostics have been read.')
}