/**
 * Created by bbrimeux on 01/10/15.
 */


MonTestCase = TestCase("MonTestCase");
MonTestCase.prototype.testConstructeur = function () {

    var x = new Engine(), line, column;
    x.new_game();

    for (line = 0; line < 6; line++) {
        for (column = 0; column < 6; column++) {
            assertTrue(x.get_board(line, column) === undefined);
        }
    }
    assertTrue(x.get_nb_marbles() === 0);
};

MonTestCase.prototype.testPremierJoueur = function () {
    var x = new Engine();
    x.new_game();

    assertTrue(x.get_current_player() === "white");
};


MonTestCase.prototype.testPremierCoup = function () {
    var x = new Engine();
    x.new_game();
    x.play_stroke("a1");

    assertEquals(x.get_board(0, 0), "white");
};

MonTestCase.prototype.testNbPiece = function () {
    var x = new Engine();
    x.new_game();
    x.play_stroke("a1");
    assertTrue(x.get_nb_marbles() === 1);
};


MonTestCase.prototype.testPremiereRotation = function () {
    var x = new Engine();
    x.new_game();
    x.play_stroke("a1");
    x.rotation(0, 0, true);
    assertEquals(x.get_board(0, 2), "white");
    assertEquals(x.get_board(0, 0), undefined);
};

MonTestCase.prototype.testDeuxiemeJoueur = function () {
    var x = new Engine();
    x.new_game();
    x.play_stroke("a1");
    x.rotation(0, 0, true);
    assertEquals(x.get_current_player(), "black");
};

MonTestCase.prototype.testDeuxiemeCoup = function () {
    var x = new Engine();
    x.new_game();
    x.play_stroke("a1");
    x.rotation(0, 0, true);
    x.play_stroke("a1");
    assertEquals(x.get_nb_marbles(), 2);
};

MonTestCase.prototype.testDeuxiemeRotation = function () {
    var x = new Engine();
    x.new_game();
    x.play_stroke("a1");
    x.rotation(0, 0, true);
    x.play_stroke("a1");
    x.rotation(0, 0, false);
    assertEquals(x.get_nb_marbles(), 2);
    assertEquals(x.get_board(0, 0), "white");
    assertEquals(x.get_board(2, 0), "black");
    assertEquals(x.get_board(0, 2), undefined);
};

MonTestCase.prototype.testPremiereException = function () {
    var x = new Engine();
    x.new_game();
    x.play_stroke("a1");
    x.rotation(0, 0, true);
    x.play_stroke("a1");
    x.rotation(0, 0, false);
    assertException(function () {
        x.play_stroke("a1");
    }, "Exception");
    assertEquals(x.get_current_player(), "white");
};

MonTestCase.prototype.testPremierJeu = function () {
    var x = new Engine();
    x.new_game();
    x.play_stroke("a1");
    x.rotation(0, 0, true);
    x.play_stroke("a1");
    x.rotation(0, 0, false);
    x.play_stroke("b1");
    x.rotation(0, 0, true);
    x.play_stroke("a2");
    x.rotation(0, 0, false);
    x.play_stroke("c1");
    x.rotation(0, 0, true);
    x.play_stroke("a3");
    x.rotation(0, 0, false);
    x.play_stroke("d1");
    x.rotation(0, 1, false);
    x.play_stroke("f3");
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

MonTestCase.prototype.testDeuxiemeJeu = function () {
    var x = new Engine();
    x.new_game();
    x.play_stroke("a1");
    x.rotation(0, 0, true);
    x.play_stroke("a1");
    x.rotation(0, 0, false);
    x.play_stroke("b1");
    x.rotation(0, 0, true);
    x.play_stroke("a2");
    x.rotation(0, 0, false);
    x.play_stroke("c1");
    x.rotation(0, 0, true);
    x.play_stroke("a3");
    x.rotation(0, 0, false);
    x.play_stroke("d1");
    x.rotation(0, 1, false);
    x.play_stroke("f3");
    x.rotation(0, 1, true);
    assertEquals(x.get_win(), false);
    x.play_stroke("e1");
    assertEquals(x.get_win(), true);

};