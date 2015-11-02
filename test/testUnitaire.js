/**
 * Created by bbrimeux on 01/10/15.
 */


MonTestCase = TestCase("MonTestCase");
var x;
MonTestCase.prototype.test_premiereHistoire = function () {

    x = new Engine();
};



MonTestCase.prototype.test_deuxiemeHistoire = function () {
    var line, column;
    x.new_game("white", 2, false);
    for (line = 0; line < 6; line++) {
        for (column = 0; column < 6; column++) {
            assertTrue(x.get_board(line, column) === undefined);
        }
    }
    assertTrue(x.get_nb_marbles() === 0);
    assertTrue(x.get_current_player() === "white");
};


MonTestCase.prototype.test_troisiemeHistoire = function () {
    x.play_stroke("a1", "white");
    assertEquals(x.get_board(0, 0), "white");
};

MonTestCase.prototype.test_quatriemeHistoire = function () {
   assertTrue(x.get_nb_marbles() === 1);
};


MonTestCase.prototype.test_cinquiemeHistoire = function () {
    x.rotation(0, 0, true);
    assertEquals(x.get_board(0, 2), "white");
    assertEquals(x.get_board(0, 0), undefined);
};

MonTestCase.prototype.test_sixiemeHistoire = function () {
    assertEquals(x.get_current_player(), "black");
};

// TP2

MonTestCase.prototype.test_septiemeHistoire = function () {
    x.play_stroke("a1", "black");
    assertEquals(x.get_nb_marbles(), 2);
};

MonTestCase.prototype.test_huitiemeHistoire = function () {
    x.rotation(0, 0, false);
    assertEquals(x.get_nb_marbles(), 2);
    assertEquals(x.get_board(0, 0), "white");
    assertEquals(x.get_board(2, 0), "black");
    assertEquals(x.get_board(0, 2), undefined);
};

MonTestCase.prototype.test_neuviemeHistoire = function () {
    assertException(function () {
        x.play_stroke("a1", "white");
    }, "Exception, pierre deja presente");
    assertEquals(x.get_board(0, 0), "white");
    assertEquals(x.get_board(2, 0), "black");
    assertEquals(x.get_board(0, 2), undefined);
    assertEquals(x.get_current_player(), "white");
};

MonTestCase.prototype.test_dixiemeHistoire = function () {
    x.play_stroke("b1", "white");
    x.rotation(0, 0, true);
    x.play_stroke("a2", "black");
    x.rotation(0, 0, false);
    x.play_stroke("c1", "white");
    x.rotation(0, 0, true);
    x.play_stroke("a3", "black");
    x.rotation(0, 0, false);
    x.play_stroke("d1", "white");
    x.rotation(0, 1, false);
    x.play_stroke("f3", "black");
    x.rotation(0, 1, true);

    assertEquals(x.get_nb_marbles(), 8);
    assertEquals(x.get_board(0, 0), "white");
    assertEquals(x.get_board(0, 1), "white");
    assertEquals(x.get_board(0, 2), "white");
    assertEquals(x.get_board(0, 3), "white");

    assertEquals(x.get_board(2, 0), "black");
    assertEquals(x.get_board(2, 1), "black");
    assertEquals(x.get_board(2, 2), "black");
    assertEquals(x.get_board(2, 3), "black");

};

MonTestCase.prototype.test_OnziemeHistoire = function () {
    var x = new Engine();
    x.new_game("white", 2, false);
    x.play_stroke("a1",  "white");
    x.rotation(0, 0, true);
    x.play_stroke("a1", "black");
    x.rotation(0, 0, false);
    x.play_stroke("b1",  "white");
    x.rotation(0, 0, true);
    x.play_stroke("a2", "black");
    x.rotation(0, 0, false);
    x.play_stroke("c1",  "white");
    x.rotation(0, 0, true);
    x.play_stroke("a3", "black");
    x.rotation(0, 0, false);
    x.play_stroke("d1",  "white");
    x.rotation(0, 1, false);
    x.play_stroke("f3", "black");
    x.rotation(0, 1, true);
    assertEquals(x.get_win(), false);
    x.play_stroke("e1",  "white");
    assertEquals(x.get_win(), true);

};

MonTestCase.prototype.test_douziemeHistoire = function () {
    var x = new Engine();
    x.new_game("white", 2, false);
    x.play_strokes("c4cbl ;d4abr ;c3ctl ;c3ctl ;c4cbl ;e5cbr ;b1ctl ;b2ctr ;c4cbl ;c3");
    assertEquals(x.get_board(0, 0), "black");
    assertEquals(x.get_board(1, 1), "black");
    assertEquals(x.get_board(2, 2), "black");
    assertEquals(x.get_board(3, 3), "black");
    assertEquals(x.get_board(4, 4), "black");
    assertEquals(x.get_win(), true);
    assertEquals(x.get_current_player(), "black");

};

MonTestCase.prototype.test_treziemeHistoire = function () {
    var x = new Engine();
    assertEquals(x.get_win(), undefined);
    assertEquals(x.get_current_player(), undefined);
    assertEquals(x.get_nb_marbles(), undefined);
};

MonTestCase.prototype.test_quatorziemeHistoire = function () {
    x = new Engine();
    x.new_game("white", 2, false);
    x.play_strokes("a1cbl ;d1cbr ;b1cbl ;e1cbr ;c1cbl ;f1cbr");
    x.play_strokes("a2cbl ;d2cbr ;b2cbl ;e2cbr ;c2cbl ;f2cbr");
    x.play_strokes("a3cbl ;d3cbr ;b3cbl ;e3cbr ;c3cbl ;f3cbr");
    x.play_strokes("b5ctl ;a4ctr ;e4ctl ;b4ctr ;f4ctl ;d4ctr");
    x.play_strokes("d5ctl ;a5ctr ;f5ctl ;c4ctr ;a6ctl ;c5ctr");
    x.play_strokes("b6ctl ;e5ctr ;d6ctl ;c6ctr ;f6ctl ;e6ctr");
    assertEquals(x.get_win(), false);
    assertEquals(x.get_drawn(), true);
};

MonTestCase.prototype.test_quinziemeHistoire = function () {
    x = new Engine();
    x.new_game("white", 2, false);
    assertException(function () {
        x.play_stroke("a1", "black");
    }, "Exception, couleur non valide");
};

MonTestCase.prototype.test_quinziemeHistoire = function () {
    x = new Engine();
    x.new_game("red", 4, true);
};

MonTestCase.prototype.test_dix_septiemeHistoire = function () {
    assertEquals(x.get_current_player(), "red");
    x.play_stroke("a1", "red");
    x.rotation(0, 0, true);
    assertEquals(x.get_current_player(), "yellow");
    x.play_stroke("a2", "yellow");
    x.rotation(0, 0, true);
    assertEquals(x.get_current_player(), "green");
    x.play_stroke("a3", "green");
    x.rotation(0, 0, true);
    assertEquals(x.get_current_player(), "blue");

};

MonTestCase.prototype.test_dix_huitiemeHistoire = function () {
    x = new Engine();
    x.new_game("red", 3, true);
    x.push_joueur("green", 2);
    x.push_joueur("yellow", 3);

};