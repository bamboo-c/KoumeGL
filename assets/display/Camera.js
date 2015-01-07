/*-----------------------------------------------------
* Camera
-----------------------------------------------------*/
var Camera = function( i_eye, i_center, i_up, i_angle, i_viewMin, i_viewMax ) {

  this._eye = i_eye;
  this._center = i_center;
  this._up = i_up;
  this._angle = i_angle;
  this._viewMin = i_viewMin;
  this._viewMax = i_viewMax;


  this._init.apply( this );

}
Camera.prototype = {

  //-------------------------------------------------
  // initialize
  //-------------------------------------------------
  _init : function() {

    // ビュー座標変換行列
    MatrixIdentity.matrix.lookAt( this._eye, this._center, this._up, MatrixIdentity.vMatrix);

    // プロジェクション座標変換行列
    MatrixIdentity.matrix.perspective( this._angle, KoumeGL.canvas.width / KoumeGL.canvas.height, this._viewMin, this._viewMax, MatrixIdentity.pMatrix );

    // 各行列を掛け合わせ座標変換行列
    MatrixIdentity.matrix.multiply( MatrixIdentity.pMatrix, MatrixIdentity.vMatrix, MatrixIdentity.vpMatrix );

  },

}
