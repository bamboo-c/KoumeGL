/*-----------------------------------------------------
* Sprites
-----------------------------------------------------*/
var Sprites = function() {

  this._texture;
  this._animation;
  this._modelLength

  this._init.apply( this );

}
Sprites.prototype = {

  //-------------------------------------------------
  // initialize
  //-------------------------------------------------
  _init : function() {

    // テクスチャを指定
    KoumeGL.textures.fromImage("lenna.jpg");
    this.update();

  },

  //-------------------------------------------------
  // update
  //-------------------------------------------------
  update : function() {

    MatrixIdentity.matrix.identity(MatrixIdentity.mMatrix);
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

  },

  //-------------------------------------------------
  // model state
  //-------------------------------------------------
  state : {

    rotate : function() {

    },
    translate : function() {

    },
    scale : function() {

    }

  }


}

/*-----------------------------------------------------
* Sprites
-----------------------------------------------------*/
