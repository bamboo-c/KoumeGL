/*-----------------------------------------------------
* Camera
-----------------------------------------------------*/
var Camera = function( i_eye, i_center, i_up ) {

  this._eye = i_eye;
  this._center = i_center;
  this._up = i_up;

  this._init.apply( this );

}
Camera.prototype = {

  //-------------------------------------------------
  // initialize
  //-------------------------------------------------
  _init : function() {

    // ビュー座標変換行列
    MatrixIdentity.matrix.lookAt( this._eye, this._center, this._up, MatrixIdentity.vMatrix);

  },

}
