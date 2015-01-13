/*-----------------------------------------------------
* Render
-----------------------------------------------------*/
var Render = function( i_ambient, i_position, i_center, i_data ) {

  this._count = 0;
  this._count2 = 0;
  this._rad = 0;

  this._ambientColor = i_ambient;
  this._eyePosition = i_position;
  this._centerPoint = i_center;
  this._position = i_data;

  this._update.apply( this );

}
Render.prototype = {

  //-------------------------------------------------
  // run
  //-------------------------------------------------
  _update : function() {

    // カウンタのインクリメント
    this._count++;

    // アニメーション用にカウンタからラジアンを計算
    this._rad = (this._count % 360) * window.PI;

    // canvas の色と深度値を初期化
    KoumeGL.gl.clear( KoumeGL.gl.COLOR_BUFFER_BIT | KoumeGL.gl.DEPTH_BUFFER_BIT );

    this._bind(i);

    // コンテキストの再描画
    KoumeGL.gl.flush();

    // フラグをチェックしてアニメーション
    if( run ){ window.requestAnimationFrame( this._update.bind( this ) ); }

  },

  //-------------------------------------------------
  // bind
  //-------------------------------------------------
  _bind : function( i_num ) {

    // uniformLocationへ座標変換行列を登録
    KoumeGL.gl.uniformMatrix4fv(KoumeGL.buffer.uniLocation[0], false, MatrixIdentity.mvpMatrix);
    KoumeGL.gl.uniformMatrix4fv(KoumeGL.buffer.uniLocation[1], false, MatrixIdentity.invMatrix);
    KoumeGL.gl.uniform3fv(KoumeGL.buffer.uniLocation[2], lightPosition);
    KoumeGL.gl.uniform3fv(KoumeGL.buffer.uniLocation[3], this._ambientColor);
    KoumeGL.gl.uniform3fv(KoumeGL.buffer.uniLocation[4], this._eyePosition);
    KoumeGL.gl.uniform3fv(KoumeGL.buffer.uniLocation[5], this._centerPoint);
    KoumeGL.gl.uniformMatrix4fv(KoumeGL.buffer.uniLocation[6], false, MatrixIdentity.mMatrix);
    KoumeGL.gl.uniform1i(KoumeGL.buffer.uniLocation[7], 0);

    // モデルの描画
    KoumeGL.gl.drawElements(KoumeGL.gl.TRIANGLES, MatrixIdentity.index.length, KoumeGL.gl.UNSIGNED_SHORT, 0);

  }

}
