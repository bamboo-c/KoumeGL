/*-----------------------------------------------------
* Stage
-----------------------------------------------------*/
var Stage = {

  //-------------------------------------------------
  // initialize
  //-------------------------------------------------
  init : function( i_color, i_depth, i_ambient, i_position, i_center ) {


    // viewport の設定
    KoumeGL.gl.viewport(0, 0, KoumeGL.canvas.width, KoumeGL.canvas.height);

    // 設定を有効化する
    KoumeGL.gl.enable( KoumeGL.gl.DEPTH_TEST );
    KoumeGL.gl.depthFunc( KoumeGL.gl.LEQUAL );
    KoumeGL.gl.enable( KoumeGL.gl.CULL_FACE );

    KoumeGL.gl.clearColor( i_color[0], i_color[1], i_color[2], i_color[3] );
    KoumeGL.gl.clearDepth( i_depth );

    this.ambientColor = i_ambient;
    this.eyePosition  = i_position;
    this.centerPoint  = i_center;

    // プロジェクション座標変換行列
    MatrixIdentity.matrix.perspective(45, KoumeGL.canvas.width / KoumeGL.canvas.height, 0.1, 50.0, MatrixIdentity.pMatrix);

    // 各行列を掛け合わせ座標変換行列
    MatrixIdentity.matrix.multiply( MatrixIdentity.pMatrix, MatrixIdentity.vMatrix, MatrixIdentity.vpMatrix );

  }

}
