"use strict";
var fs = require('fs');
var tools = require('../../tools.js');
const cl = tools.cl;
const ansi = tools.ansi_codes;
cl(`\t\t\tAoC: Day 4 (1/2)`,
    ansi.bg.blue,
    ansi.fg.cyan
);
//------------------------------------------------------------------------------

function remove_falsy(array) {
    const filtered_array = array.filter(
        element => (element == false && element !== '0') ? false : true
    );
    return filtered_array;
}

function cleanup_data(raw_data) {
    raw_data = raw_data.split('\r\n');

    let clean_data = {
        calls: [],
        boards: [],
    };

    clean_data.calls = raw_data.shift().split(',').map( 
        call => {
            return Number.parseInt(call);
        }
    );

    let clean_rows = remove_falsy(raw_data).map(
        element => remove_falsy(element.split(' ')).map(n => {
                return Number.parseInt(n);
            }
        )
    );
    while (clean_rows.length >= 1) {
        let clean_board = [];
        for (let i = 0; i < 5; ++i) {
            let clean_row = clean_rows.shift();
            clean_board.push(clean_row);
        }
        clean_data.boards.push(clean_board);
    }

    return clean_data;
}

function check_boards(call) {
    // Checks a given call against all boards in play,
    // then marks each matching spot by turning the number
    // in the spot into a string representation. This allows
    // marking while preserving data.
}







//------------------------------------------------------------------------------
let game_data = fs.readFileSync(
    'day4_input.txt').toString();
if (game_data) {

    cl(game_data, ansi.fg.red);
    game_data = cleanup_data(game_data);
    cl(game_data.boards, game_data.calls);
    
}
else {
    cl('No game_data have been read.')
}