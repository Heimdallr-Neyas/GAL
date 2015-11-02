/**
 * Created by benoit brimeux on 01/10/15.
 */


function Exception() {
    this.name = "Exception, pierre deja presente";
}

function Exception2() {
    this.name = "Exception, couleur non valide";
}




var Engine = function () {
    var board, n_marbles, current_player, win, drawn, nb_player, size_board, colorList;
    this.new_game = function (player, nb_player1, xl1) {
        nb_player = nb_player1;
        this.color(nb_player1, player);
        if (xl1) {
            size_board = 9;
        } else { size_board = 6; }
        var line;
        board = new Array(size_board);
        for (line = 0; line < size_board; line++) {
            board[line] = new Array(size_board);
        }
        n_marbles = 0;
        current_player = player;
        win = false;
    };

    this.color = function (nb_player1, player) {
        if (nb_player1 === 2) {
            colorList = new Array(2);
            colorList[0] = "white";
            colorList[1] = "black";
        } else if (nb_player1 === 4) {
            colorList = new Array(4);
            colorList[0] = "red";
            colorList[1] = "yellow";
            colorList[2] = "green";
            colorList[3] = "blue";
        } else if (nb_player1 === 3) {
            colorList = new Array(3);
            colorList[0] = player;
        }
    };

    this.push_joueur = function (color, num) {
        colorList[num - 1] = color;
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

    this.play_stroke = function (stroke, color) {
        var column = stroke.charCodeAt(0) - 97, line = stroke.charCodeAt(1) - 49;

        if (column <= (size_board - 1) && column >= 0 && line >= 0 &&
                line <= (size_board - 1) && (board[line][column] === undefined)) {
            if (color === current_player) {
                board[line][column] = current_player;
                n_marbles++;
            } else {
                throw new Exception2();
            }
        } else {
            throw new Exception();
        }

        this.check_win();
        this.check_drawn();
    };

    this.check_equals = function (line, column, value) {
        if (board[line][column] === current_player) {
            return (value + 1);
        }
        if (value >= 5) {
            return value;
        }
        return 0;
    };

    this.max = function (value1, value2) {
        if (value1 > value2) {
            return value1;
        }
        return value2;
    };

    this.check_colums_win = function () {
        var column;
        for (column = 0; column < size_board; column++) {
            if (this.check_column_win(column) >= 5) {
                return true;
            }
        }
        return false;
    };

    this.check_column_win = function (column) {
        var line, cpt = 0;
        for (line = 0; line < size_board; line++) {
            cpt = this.check_equals(line, column, cpt);
        }
        return cpt;
    };
    this.check_lines_win = function () {
        var line;
        for (line = 0; line < size_board; line++) {
            if (this.check_line_win(line) >= 5) {
                return true;
            }
        }
        return false;
    };

    this.check_line_win = function (line) {
        var column, cpt = 0;
        for (column = 0; column < size_board; column++) {
            cpt = this.check_equals(line, column, cpt);
        }
        return cpt;
    };

    this.check_diagonals_win = function () { // a faire modifiction pour plateau 9*9
        var line, cpt1 = 0, cpt2 = 0, cpt3 = 0, cpt4 = 0, cpt5 = 0, cpt6 = 0;
        for (line = 0; line < size_board; line++) {
            cpt1 = this.check_equals(line, line, cpt1);
            cpt2 = this.check_equals((size_board - 1 - line), line, cpt2);
            if (line < (size_board - 1)) {
                cpt3 = this.check_equals(line, (line + 1), cpt3);
                cpt4 = this.check_equals((line + 1), line, cpt4);
                cpt5 = this.check_equals((size_board - 1 - line), (line + 1), cpt5);
                cpt6 = this.check_equals((size_board - 2 - line), line, cpt6);
            }
        }
        return (this.max(this.max(this.max(this.max(this.max(cpt1, cpt2), cpt3), cpt4),
            cpt5), cpt6) >= 5);
    };




    this.check_win = function () {
        win = (this.check_colums_win() ||
        this.check_lines_win() ||
        this.check_diagonals_win());
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
        this.check_win();
        this.change_player();
    };


    this.change_player = function () {
        var position = colorList.indexOf(current_player);

        position++;
        if (position === colorList.length) {
            position = 0;
        }
        current_player = colorList[position];
        this.check_win();
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
                this.play_stroke(stroke, current_player);
                rotation = (array[i][2].concat(array[i][3])).concat(array[i][4]);
                this.rotation_text(rotation);
            } else {
                stroke = array[i][0].concat(array[i][1]);
                this.play_stroke(stroke, current_player);
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