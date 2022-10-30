"use strict";
var fs = require('fs');
var tools = require('../../tools.js');
const cl = tools.cl;
const ansi = tools.ansi_codes;

cl('\t\t\tAoC: Day 3 (1/2)', ansi.fg.yellow);

let diagnostics = fs.readFileSync(
    'day3_input.txt').toString().split('\r\n');
if (diagnostics) {
    cl(diagnostics);
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
    cl(`\nPositive bit totals:\n\t${positive_bits}`);


    let gamma_rate = positive_bits.map( ones => {
        if (ones >= diagnostics.length - ones) {
            return 1;
        }
        return 0;
    });

    let epsilon_rate = gamma_rate.map( bit => {
        if (bit === 1) {
            return 0;
        }
        return 1;
    }).join('');
    gamma_rate = gamma_rate.join('');

    cl(`\tγ rate: ${gamma_rate}`, ansi.fg.cyan);
    cl(`\tε rate: ${epsilon_rate}`, ansi.fg.magenta);
    cl(`\t\tPower consumption: ${
        Number.parseInt(gamma_rate, 2) *
        Number.parseInt(epsilon_rate, 2)
        }`, 
        ansi.fg.green
    );
}
else {
    cl('No diagnostics have been read.')
}