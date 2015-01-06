/*-----------------------------------------------------
* Stage
-----------------------------------------------------*/
var Stage = function( i_color, i_depth, i_ambient, i_position, i_center ) {

  this._color = i_color;
  this._depth = i_depth;

  this.ambientColor = i_ambient;
  this.eyePosition = i_position;
  this.centerPoint = i_center;

  this._init.apply( this );
}
Stage.prototype = {
  //-------------------------------------------------
  // initialize
  //-------------------------------------------------
  _init : function() {

    // viewport の設定
    KoumeGL.gl.viewport(0, 0, KoumeGL.canvas.width, KoumeGL.canvas.height);

    // 設定を有効化する
    KoumeGL.gl.enable( KoumeGL.gl.DEPTH_TEST );
    KoumeGL.gl.depthFunc( KoumeGL.gl.LEQUAL );
    KoumeGL.gl.enable( KoumeGL.gl.CULL_FACE );

    KoumeGL.gl.clearColor( this._color[0], this._color[1], this._color[2], this._color[3] );
    KoumeGL.gl.clearDepth( this._depth );

    KoumeGL.gl.uniform3fv(KoumeGL.buffer.uniLocation[3], this.ambientColor);
    KoumeGL.gl.uniform3fv(KoumeGL.buffer.uniLocation[4], this.eyePosition);
    KoumeGL.gl.uniform3fv(KoumeGL.buffer.uniLocation[5], this.centerPoint);


    // プロジェクション座標変換行列
    MatrixIdentity.matrix.perspective(45, KoumeGL.canvas.width / KoumeGL.canvas.height, 0.1, 50.0, MatrixIdentity.pMatrix);

    // 各行列を掛け合わせ座標変換行列
    MatrixIdentity.matrix.multiply( MatrixIdentity.pMatrix, MatrixIdentity.vMatrix, MatrixIdentity.vpMatrix );

  }

}
