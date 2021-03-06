/*-----------------------------------------------------
* Render
-----------------------------------------------------*/
var Render = function( i_ambient, i_position, i_center ) {

  this._count = 0;
  this._rad = 0;

  this._ambientColor = i_ambient;
  this._eyePosition = i_position;
  this._centerPoint = i_center;

  this._update.apply( this );

}
Render.prototype = {

  //-------------------------------------------------
  // update
  //-------------------------------------------------
  _update : function() {

    // カウンタのインクリメント
    this._count++;

    // アニメーション用にカウンタからラジアンを計算
    this._rad = (this._count % 360) * window.PI;

    // canvas の色と深度値を初期化
    KoumeGL.gl.clear( KoumeGL.gl.COLOR_BUFFER_BIT | KoumeGL.gl.DEPTH_BUFFER_BIT );

    this.sprites = new Sprites();

    this._bind();

    // コンテキストの再描画
    KoumeGL.gl.flush();

    // フラグをチェックしてアニメーション
    window.requestAnimationFrame( this._update.bind( this ));

  },

  //-------------------------------------------------
  // bind
  //-------------------------------------------------
  _bind : function() {

    // uniformLocationへ座標変換行列を登録
    KoumeGL.gl.uniformMatrix4fv(KoumeGL.buffer.uniLocationMvpMatrix, false, MatrixIdentity.mvpMatrix);
    KoumeGL.gl.uniformMatrix4fv(KoumeGL.buffer.uniLocationInvMatrix, false, MatrixIdentity.invMatrix);
    KoumeGL.gl.uniform3fv(KoumeGL.buffer.uniLocationLightPosition, lightPosition);
    KoumeGL.gl.uniform3fv(KoumeGL.buffer.uniLocationAmbientColor, this._ambientColor);
    KoumeGL.gl.uniform3fv(KoumeGL.buffer.uniLocationEyePosition, this._eyePosition);
    KoumeGL.gl.uniform3fv(KoumeGL.buffer.uniLocationCenterPoint, this._centerPoint);
    KoumeGL.gl.uniformMatrix4fv(KoumeGL.buffer.uniLocationMMatrix, false, MatrixIdentity.mMatrix);
    KoumeGL.gl.uniform1i(KoumeGL.buffer.uniLocationTextureUnit, 0);

    // モデルの描画
    KoumeGL.gl.drawElements(KoumeGL.gl.TRIANGLES, MatrixIdentity.index.length, KoumeGL.gl.UNSIGNED_SHORT, 0);

  }

}
