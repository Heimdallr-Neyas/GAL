/**
 * Created by benoit brimeux on 01/10/15.
 */


function Exception() {
    this.name = "Exception";
}

var Engine = function () {
    var board, n_marbles, current_player, win, drawn;
    this.new_game = function (player) {
        var line;
        board = new Array(6);
        for (line = 0; line < 6; line++) {
            board[line] = new Array(6);
        }
        n_marbles = 0;
        current_player = player;
        win = false;
    };

    this.get_drawn = function () {
        return drawn;
    };

    this.get_board = function (line, column) {
        return board[line][column];
    };

    this.get_nb_marbles = function () {
        return n_marbles;
    };

    this.get_current_player = function () {
        return current_player;
    };

    this.get_win = function () {
        return win;
    };

    this.play_stroke = function (stroke) {
        var column = stroke.charCodeAt(0) - 97, line = stroke.charCodeAt(1) - 49;

        if (column <= 5 && column >= 0 && line >= 0 &&
                line <= 5 && (board[line][column] === undefined)) {
            board[line][column] = current_player;
            n_marbles++;
        } else {
            throw new Exception();
        }

        this.check_win(stroke);
        this.check_drawn();
    };

    this.get_nb_stroke = function (line, column, increment_line, increment_column) {
        var tmp_line = line, tmp_column = column, cpt = 1;
        while ((tmp_column + increment_column) >= 0 && (tmp_column + increment_column) <= 5 &&
                (tmp_line + increment_line) >= 0 && (tmp_line + increment_line) <= 5 &&
                board[tmp_line][tmp_column] ===
                board[tmp_line + increment_line][tmp_column + increment_column]) {
            cpt++;
            tmp_column = tmp_column + increment_column;
            tmp_line = tmp_line + increment_line;
        }

        return cpt;
    };

    this.check_colum_win = function (line, column) {
        return (this.get_nb_stroke(line, column, 0, -1) +
            this.get_nb_stroke(line, column, 0, 1) - 1 >= 5);
    };

    this.check_line_win = function (line, column) {
        return (this.get_nb_stroke(line, column, -1, 0) +
            this.get_nb_stroke(line, column, 1, 0) - 1 >= 5);
    };

    this.check_diagonal_win = function (line, column) {
        return (this.get_nb_stroke(line, column, -1, -1) +
            this.get_nb_stroke(line, column, 1, 1) - 1 >= 5) ||
            (this.get_nb_stroke(line, column, 1, -1) +
            this.get_nb_stroke(line, column, -1, 1) - 1 >= 5);
    };

    this.check_win = function (stroke) {
        var column = stroke.charCodeAt(0) - 97, line = stroke.charCodeAt(1) - 49;
        win = (this.check_colum_win(line, column) ||
        this.check_line_win(line, column) ||
        this.check_diagonal_win(line, column));
    };

    this.rotation_array = function (tempory_array, tempory_array2, direction) {
        var variable;
        for (variable = 0; variable < 3; variable++) {
            if (direction) {
                tempory_array2[variable][0] = tempory_array[2][variable];
                tempory_array2[variable][1] = tempory_array[1][variable];
                tempory_array2[variable][2] = tempory_array[0][variable];
            } else {
                tempory_array2[variable][0] = tempory_array[0][2 - variable];
                tempory_array2[variable][1] = tempory_array[1][2 - variable];
                tempory_array2[variable][2] = tempory_array[2][2 - variable];
            }
        }
    };

    this.copy_array = function (array1, array2, increment1, increment2) {
        var line, column;
        for (line = 0; line < 3; line++) {
            for (column = 0; column < 3; column++) {
                array1[line + increment1][column + increment2] = array2[line][column];
            }
        }
    };

    this.rotation = function (vertical, horizontal, direction) {
        var tempory_array = new Array(3), tempory_array2 = new Array(3), line, column;

        for (line = 0; line < 3; line++) {
            tempory_array[line] = new Array(3);
            tempory_array2[line] = new Array(3);
            for (column = 0; column < 3; column++) {
                tempory_array[line][column] =
                    board[line + (vertical * 3)][column + (horizontal * 3)];
            }
        }
        this.rotation_array(tempory_array, tempory_array2, direction);
        this.copy_array(board, tempory_array2, (vertical * 3), (horizontal * 3));
        this.change_player();
    };


    this.change_player = function () {
        if (current_player === "white") {
            current_player = "black";
        } else {
            current_player = "white";
        }
    };

    this.rotation_text = function (text) {
        var cycle, top, left;
        cycle = (text[0] === 'c');
        if (text[1] === 't') { top = 0;
            } else { top = 1; }
        if (text[2] === 'l') { left = 0;
            } else { left = 1; }
        this.rotation(top, left, cycle);
    };

    this.play_strokes = function (string_stroke) {
        //"c4cbl ;d4abr ;c3ctl ;c3ctl ;c4cbl ;e5cbr ;b1ctl ;b2ctr ;c4cbl ;c3")
        var array = string_stroke.split(new RegExp(" ;", "g")), i, stroke, rotation;
        for (i = 0; i < array.length; i++) {
            if (array[i].length === 5) {
                stroke = array[i][0].concat(array[i][1]);
                this.play_stroke(stroke);
                rotation = (array[i][2].concat(array[i][3])).concat(array[i][4]);
                this.rotation_text(rotation);
            } else {
                stroke = array[i][0].concat(array[i][1]);
                this.play_stroke(stroke);
            }
        }

    };

    this.check_drawn = function () {
        var line, column;
        drawn = true;
        for (line = 0; line < 6; line++) {
            for (column = 0; column < 6; column++) {
                drawn = drawn && (board[line][column] !== undefined);
            }
        }
    };

};