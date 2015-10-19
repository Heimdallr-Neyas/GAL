/**
 * Created by bbrimeux on 01/10/15.
 */


MonTestCase=TestCase("MonTestCase");
MonTestCase.prototype.testConstructeur=function(){

    var x = new Engine();
    x.newGame();

    for(i=0;i<6; i++){
        for(j=0;j<6; j++){
            assertTrue(x.getterPlateau(i, j) == undefined);
        }
    }
    assertTrue(x.getterNbPiece() == 0);
};

MonTestCase.prototype.testPremierJoueur=function(){
    var x = new Engine();
    x.newGame();

    assertTrue(x.getterJoueurCourant() == "blanc");
};


MonTestCase.prototype.testPremierCoup = function(){
    var x = new Engine();
    x.newGame();
    x.jouerCoup("a1");

    assertEquals(x.getterPlateau(0,0), "blanc");
};

MonTestCase.prototype.testNbPiece = function(){
    var x = new Engine();
    x.newGame();
    x.jouerCoup("a1");
    assertTrue(x.getterNbPiece()==1);
  };


MonTestCase.prototype.testPremiereRotation = function(){
    var x = new Engine();
    x.newGame();
    x.jouerCoup("a1");
    x.rotation("hg", true);
    assertEquals(x.getterPlateau(0,2), "blanc");
    assertEquals(x.getterPlateau(0,0), undefined);
};

MonTestCase.prototype.testDeuxiemeJoueur = function(){
    var x = new Engine();
    x.newGame();
    x.jouerCoup("a1");
    x.rotation("hg", true);
    assertEquals(x.getterJoueurCourant(), "noir");
};