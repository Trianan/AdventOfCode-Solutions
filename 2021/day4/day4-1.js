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

class Board {
    constructor(array_2d) {
        this.grid = array_2d;
    }
    mark_board(call) {
        for (let row = 0; row < this.grid.length; ++row) {
            for (let column = 0; column < this.grid[row].length; ++column) {
                if (this.grid[row][column] === call) {
                    this.grid[row][column] = call.toString(10);
                }
            }
        }
        return;
    }
    is_winner() {
        // Check if all elements in row/column are strings.
        // Return true if that's the case.

        return false;
    }
}

class Game {
    constructor(raw_data){
        // Data parsed, cleaned, calls and boards are separated
        // and stored as member arrays.
        raw_data = raw_data.split('\r\n');
        this.calls = raw_data.shift().split(',').map( 
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
        this.boards = [];
        while (clean_rows.length >= 1) {
            let clean_board = [];
            for (let i = 0; i < 5; ++i) {
                let clean_row = clean_rows.shift();
                clean_board.push(clean_row);
            }
            this.boards.push(new Board(clean_board));
        }
    }
    play_round() {
        // Gets next call, marks all matching spots on boards,
        // then checks if each board is a winner.
        const current_call = this.calls.shift();
        cl(`Current call: ${current_call}`, ansi.fg.cyan);
        for (let board of this.boards) {
            board.mark_board(current_call);
            if (board.is_winner()) {
                cl(`Winning call: ${current_call}`, ansi.fg.green);
                return board;
            }
        }
        return null;
    }
    play_game() {
        let winning_board = null;
        while (!winning_board) {
            winning_board = this.play_round();
        }
    }
    calculate_score(winning_call) {
        // Sums unmarked numbers on winning board, then multiplies the sum
        // by the winning call.
        return;
    }
}







//------------------------------------------------------------------------------
let game_data = fs.readFileSync(
    'day4_input.txt').toString();
if (game_data) {
    cl("\n\t\t\tRAW GAME DATA:", ansi.fg.red);
    cl(game_data, ansi.fg.red);

    let game = new Game(game_data);
    cl("\n\t\t\tBINGO CALLS:", ansi.fg.yellow);
    cl(game.calls);
    cl("\n\t\t\tBOARDS:", ansi.fg.yellow);
    game.boards.forEach( board => cl(board.grid));


    cl("\t\t\tTEST", ansi.fg.cyan);
    for (let i = 0; i < 4; ++i) {
        game.play_round();
    }
    game.boards.forEach( board => cl(board.grid));

    
}
else {
    cl('No game_data have been read.')
}