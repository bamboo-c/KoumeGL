/*-----------------------------------------------------
* Sprites
-----------------------------------------------------*/
var Sprites = function() {

  this._texture;
  this._animation;
  this._modelLength

  this._run.apply( this );

}
Sprites.prototype = {

  //-------------------------------------------------
  // initialize
  //-------------------------------------------------
  _init : function() {

    // テクスチャを指定
    Texture.fromImage("kotori.jpg");

    this.update();

  },

  //-------------------------------------------------
  // draw
  //-------------------------------------------------
  update : function( i_num ) {

    MatrixIdentity.matrix.identity(MatrixIdentity.mMatrix);

    MatrixIdentity.matrix.rotate( MatrixIdentity.mMatrix, this._rad, this._position[i_num].val[this._count2], MatrixIdentity.mMatrix);

    MatrixIdentity.matrix.translate( MatrixIdentity.mMatrix, this._position[i_num].val[this._count2], MatrixIdentity.mMatrix);

    MatrixIdentity.matrix.multiply(MatrixIdentity.vpMatrix,MatrixIdentity.mMatrix, MatrixIdentity.mvpMatrix);
    MatrixIdentity.matrix.inverse(MatrixIdentity.mMatrix, MatrixIdentity.invMatrix);

  },

  //-------------------------------------------------
  // add model
  //-------------------------------------------------
  add : function() {

  },

  //-------------------------------------------------
  // remove model
  //-------------------------------------------------
  remove : function() {

  }

}

/*-----------------------------------------------------
* Sprites
-----------------------------------------------------*/
