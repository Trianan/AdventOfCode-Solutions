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
        this.tallies = [[0,0,0,0,0],[0,0,0,0,0]];
    }
    check_board(call) {
        // Markes a called number and updates tallies, then
        // returns true if and only if the board is a winner. 
        for (let row = 0; row < this.grid.length; ++row) {
            for (let column = 0; column < this.grid[row].length; ++column) {
                // Spot matches call? Mark it and save coordinates.
                if (this.grid[row][column] === call) {
                    this.grid[row][column] = call.toString(10);
                    this.update_tallies(row, column);

                    // Shows all marked grids.
                    cl(this.grid);

                    // Checks if winner only if a marked position is
                    // found to cut down on number of is_winner() calls.
                    if (this.is_winner()) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    update_tallies(row, column) {
        // Updates the tallies of marked positions for each row and column
        // position.
        ++this.tallies[0][row];
        ++this.tallies[1][column];
    }
    is_winner() {
        // Returns a boolean if a row/column in tallies has a complete row.
        for (const row_column of this.tallies) {
            for (const tally of row_column) {
                if (tally === 5) {
                    return true;
                }
            }
        }
        return false;
    }
    calculate_score(winning_call) {
        let score = 0;
        for (let row = 0; row < this.grid.length; ++row) {
            for (let column = 0; column < this.grid[row].length; ++column) {
                if (typeof this.grid[row][column] === 'number') {
                    score += this.grid[row][column];
                }
            }
        }
        score *= winning_call;
        return score;
    }
}

class Game {
    constructor(raw_data) {
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
        // Uses the next call to mark spots and check for winners.
        // The first winning board and winning call is returned.
        const call = this.calls.shift();
        cl(`
            Current call: ${call}
            Remaining calls: ${this.calls.length}`,
            ansi.fg.cyan
        );


        let winning_data = [];
        for (let board of this.boards) {
            if (board.check_board(call)) {
                // Winning board; return it and the winning call!
                winning_data.push([board, call]);
            }
        }
        return winning_data;
    }
    play_game() {
        // No winning board yet...
        let last_winners;
        cl(`
            # of boards: ${this.boards.length}
            # of calls:  ${this.calls.length}`,
            ansi.fg.green);

        while (this.calls.length > 0) {
            let winners = this.play_round();
            if (winners.length > 0) {
                last_winners = winners;
                for (const win of last_winners) {
                    cl(`Winning board found (winning call: ${win[1]})`,
                        ansi.fg.yellow
                    );
                    cl(win[0]);
                    this.boards = this.boards.filter( board => {
                        const b = board.grid.toString();
                        const wb = win[0].grid.toString();
                        return b !== wb;
                    });
                    cl(`# remaining boards: ${this.boards.length}`,
                        ansi.fg.yellow
                    );
                }
            }
        }
        return last_winners;
    }

}







//------------------------------------------------------------------------------
let game_data = fs.readFileSync(
    'day4_input.txt').toString();
if (game_data) {

    let game = new Game(game_data);
    cl("\n\n\n\t\t\tPLAY!\n\n", ansi.fg.magenta);
    const last_winner = game.play_game().pop();
    cl(`The last winning board (winning call: ${last_winner[1]})`,
            ansi.fg.green
        );
        cl(last_winner[0].grid);
        cl(`
            Score:
            ${last_winner[0].calculate_score(last_winner[1])}`,
            ansi.fg.green
        );

    
}
else {
    cl('No game_data have been read.')
}