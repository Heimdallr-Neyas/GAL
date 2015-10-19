/**
 * Created by benoit brimeux on 01/10/15.
 */

var Engine = function () {
    var plateau;
    var nbPiece;
    var joueurCourant;

    this.newGame = function () {
        plateau = new Array(6);
        for (i = 0; i < 6; i++) {
            plateau[i] = new Array(6);
        }
        nbPiece = 0;
        joueurCourant = "blanc"
    };

    this.getterPlateau = function (x, y) {
        return plateau[x][y];
    };

    this.getterNbPiece = function () {
        return nbPiece;
    };

    this.getterJoueurCourant = function(){
        return joueurCourant;
    };

    this.jouerCoup = function(x){
        var colonne = x.charCodeAt(0) - 97;
        var ligne = x.charCodeAt(1) - 49;

       if(colonne<=5 && colonne>=0 && ligne>=0 && ligne <=5 && (plateau[colonne][ligne] == undefined)){
            plateau[colonne][ligne]=joueurCourant;
            nbPiece++;
       }

    };

    var multiplicationMatrice = function(x,y){
        var m = new Array(3);
        for (var r = 0; r < 3; ++r) {
            m[r] = new Array(3);
            for (var c = 0; c < 3; ++c) {
                m[r][c] = 0;
                for (var i = 0; i < 3; ++i) {
                    m[r][c] += x[r][i] * y[i][c];
                }
            }
        }
        return m;
    };


    this.rotation = function(x, sens) {
        var v = x.charCodeAt(0);
        var h = x.charCodeAt(1);
        if(v == 104){
            v = 0;
        }
        else{
            v = 1;
        }
        if(h == 103){
            h = 0;
        }
        else{
            h = 1;
        }

        var tab = new Array(3);
        var matriceRotation =new Array(3);


        for(i=0; i<3;i++){
            tab[i] = new Array(3);
            matriceRotation[i] = new Array(3);
            for(j=0; j<3; j++){
                if(plateau[i+(v*3)][j+(h*3)] === "blanc"){
                    tab[i][j]=1;
                }
                else if(plateau[i+(v*3)][j+(h*3)] === "noir"){
                    tab[i][j]=2;
                }
                else{
                    tab[i][j]=0;
                }
                matriceRotation[i][j]=0;


            }
        }


        matriceRotation[1][1] = 1;
        if(sens){
            matriceRotation[0][2]= 1;
            matriceRotation[2][0] = 1;
        }
        else{
            matriceRotation[0][2]= 1;
            matriceRotation[2][0] = 1;
        }


        var tmp = multiplicationMatrice(tab, matriceRotation);


        for(i=0; i<3 ; i++){
            for(j=0; j<3; j++){
                if(tmp[i][j] == 1){

                    plateau[i+(v*3)][j+(h*3)]="blanc";
                }
                else if(tmp[i][j] == 2){
                    plateau[i+(v*3)][j+(h*3)]= "noir";
                }
                else{
                    plateau[i+(v*3)][j+(h*3)]=undefined;
                }
            }
        }

        this.changerJoueur();
    };



    this.changerJoueur = function(){
        if(joueurCourant === "blanc" ){
            joueurCourant = "noir";
        }
        else{
            joueurCourant = "blanc";
        }
    }

};