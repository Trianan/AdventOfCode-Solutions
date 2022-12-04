"use strict";
var fs = require('fs');
var tools = require('../../tools.js');
const cl = tools.cl;
const ansi = tools.ansi_codes;
cl(`\t\t\tAoC: Day 5 (1/2)`,
    ansi.bg.blue,
    ansi.fg.cyan
);
//------------------------------------------------------------------------------

 









//------------------------------------------------------------------------------
let cloud_coords = fs.readFileSync(
    'day5_input.txt').toString();
if (cloud_coords) {
    // Parse and format data into array of arrays which each
    // contain the integer endpoints of a line segment.

    // (This does not work correctly on Linux systems currently,
    //  likely due to how different OSs handle newlines.)

    cl(`\n\t\t\tRAW CLOUD COORDINATES:`, ansi.fg.red);
    cl(cloud_coords, ansi.fg.red);

    // Formatting cloud coordinates & getting max dimensions
    // for line-diagram:
    let max_x = 0, max_y = 0;
    cloud_coords = cloud_coords.split('\r\n').map(
        line => {
            let clean_line = line.split(' -> ').map(
                xy => {
                    return xy.split(',').map(
                        n => {
                            return Number(n);
                        }
                    )
                }
            )
            clean_line.forEach(
                // For generating line-diagram with minimal-dimensions.
                coord => {
                    if (coord[0] > max_x) {
                        max_x = coord[0];
                    }
                    if (coord[1] > max_y) {
                        max_y = coord[1];
                    }
                }
            );
            return clean_line;
        }
    );
    cl(`\n\t\t\tCLEAN COORDINATES (${cloud_coords.length} read)
        \t\t\tMax x: ${max_x} Max y: ${max_y}`,
        ansi.fg.yellow
    );
    cl(cloud_coords);









}
else {
    cl('No cloud coordinates have been read.');
}