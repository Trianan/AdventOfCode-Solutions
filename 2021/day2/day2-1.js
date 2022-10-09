"use strict";
var fs = require('fs');
var tools = require('../../tools.js');
const cl = tools.cl;

cl('AoC: Day 2 (1/2)');

let instructions = fs.readFileSync('day2_input.txt').toString().split("\n");
if (instructions) {

    // Turn raw data into direction-distance pairs:
    let formatted_instructions = [];
    for (let instruction of instructions) {
        instruction = instruction.split(' ');

        // Convert direction-instruction to simplify later depth calculation:
        if (instruction[0] === 'up') {
            instruction[0] = -1;
        } else if (instruction[0] === 'down') {
            instruction[0] = 1;
        } else {
            instruction[0] = 0; // Forward is 0 depth change.
        }
        instruction[1] = Number(instruction[1]);
        formatted_instructions.push(instruction);
    }

    instructions = formatted_instructions;
    for (const instruction of instructions) {
        cl(`
            ${instruction[0]} (${typeof instruction[0]}),
            ${instruction[1]} (${typeof instruction[1]})`)
    }

    // Finally sum depth and horizontal changes:
    let depth = 0, horizontal_position = 0;
    for (const instruction of instructions) {
        if (instruction[0] === 0) {
            horizontal_position += instruction[1];
        } else {
            depth += (instruction[1] * instruction[0]);
        }
    }
    cl(`
        Number of instructions: ${instructions.length}
        Final depth: ${depth}
        Final horizontal position: ${horizontal_position}
        PRODUCT: ${depth * horizontal_position}`);
}
else {
    cl('No instructions have been read.')
}