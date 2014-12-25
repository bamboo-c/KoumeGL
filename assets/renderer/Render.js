/*-----------------------------------------------------
* Render
-----------------------------------------------------*/
var Render = function() {

  count = 0;
  this._init.apply( this );


}
Render.prototype = {

  //-------------------------------------------------
  // initialize
  //-------------------------------------------------
  _init : function() {

    // カウンタのインクリメント
    count++;

    // アニメーション用にカウンタからラジアンを計算
    var rad = (count % 360) * Math.PI / 180;

    // canvas の色と深度値を初期化
    KoumeGL.gl.clear( KoumeGL.gl.COLOR_BUFFER_BIT | KoumeGL.gl.DEPTH_BUFFER_BIT );

    // 画像 を 1 番目のユニットにバインドする
    KoumeGL.gl.activeTexture(KoumeGL.gl.TEXTURE0);
    KoumeGL.gl.bindTexture(KoumeGL.gl.TEXTURE_2D, Textures.texture[0]);

    // 画像 を 2 番目のユニットにバインドする
    KoumeGL.gl.activeTexture(KoumeGL.gl.TEXTURE1);
    KoumeGL.gl.bindTexture(KoumeGL.gl.TEXTURE_2D, Textures.texture[0]);

    // 画像 を 3 番目のユニットにバインドする
    KoumeGL.gl.activeTexture(KoumeGL.gl.TEXTURE2);
    KoumeGL.gl.bindTexture(KoumeGL.gl.TEXTURE_2D, Textures.texture[0]);

    // 画像 を 4 番目のユニットにバインドする
    KoumeGL.gl.activeTexture(KoumeGL.gl.TEXTURE3);
    KoumeGL.gl.bindTexture(KoumeGL.gl.TEXTURE_2D, Textures.texture[0]);

    // 画像 を 5 番目のユニットにバインドする
    KoumeGL.gl.activeTexture(KoumeGL.gl.TEXTURE4);
    KoumeGL.gl.bindTexture(KoumeGL.gl.TEXTURE_2D, Textures.texture[0]);

    // 画像 を 6 番目のユニットにバインドする
    KoumeGL.gl.activeTexture(KoumeGL.gl.TEXTURE5);
    KoumeGL.gl.bindTexture(KoumeGL.gl.TEXTURE_2D, Textures.texture[0]);

    // 画像 を 7 番目のユニットにバインドする
    KoumeGL.gl.activeTexture(KoumeGL.gl.TEXTURE6);
    KoumeGL.gl.bindTexture(KoumeGL.gl.TEXTURE_2D, Textures.texture[0]);

    // 画像 を 8 番目のユニットにバインドする
    KoumeGL.gl.activeTexture(KoumeGL.gl.TEXTURE7);
    KoumeGL.gl.bindTexture(KoumeGL.gl.TEXTURE_2D, Textures.texture[0]);

    // 画像 を 9 番目のユニットにバインドする
    KoumeGL.gl.activeTexture(KoumeGL.gl.TEXTURE8);
    KoumeGL.gl.bindTexture(KoumeGL.gl.TEXTURE_2D, Textures.texture[0]);

    // 第一のモデル
    MatrixIdentity.matrix.identity(MatrixIdentity.mMatrix);
    MatrixIdentity.matrix.rotate(MatrixIdentity.mMatrix, rad, [1.0, 1.0, 2.0], MatrixIdentity.mMatrix);
    MatrixIdentity.matrix.translate(MatrixIdentity.mMatrix, [-2.0, -1.0, -1.0], MatrixIdentity.mMatrix);
    MatrixIdentity.matrix.rotate(MatrixIdentity.mMatrix, rad, [1.0, 2.0, -1.0], MatrixIdentity.mMatrix);
    MatrixIdentity.matrix.multiply(MatrixIdentity.vpMatrix,MatrixIdentity.mMatrix, MatrixIdentity.mvpMatrix);
    MatrixIdentity.matrix.inverse(MatrixIdentity.mMatrix, MatrixIdentity.invMatrix);

    // uniformLocationへ座標変換行列を登録
    KoumeGL.gl.uniformMatrix4fv(uniLocation[0], false, MatrixIdentity.mvpMatrix);
    KoumeGL.gl.uniformMatrix4fv(uniLocation[1], false, MatrixIdentity.invMatrix);
    KoumeGL.gl.uniform3fv(uniLocation[2], lightPosition);
    KoumeGL.gl.uniform3fv(uniLocation[3], ambientColor);
    KoumeGL.gl.uniform3fv(uniLocation[4], eyePosition);
    KoumeGL.gl.uniform3fv(uniLocation[5], centerPoint);
    KoumeGL.gl.uniformMatrix4fv(uniLocation[6], false, MatrixIdentity.mMatrix);
    KoumeGL.gl.uniform1i(uniLocation[7], 0);

    // モデルの描画
    KoumeGL.gl.drawElements(KoumeGL.gl.TRIANGLES, index.length, KoumeGL.gl.UNSIGNED_SHORT, 0);

    // 第二のモデル
    MatrixIdentity.matrix.identity(MatrixIdentity.mMatrix);
    MatrixIdentity.matrix.rotate(MatrixIdentity.mMatrix, rad, [1.0, 1.0, 0.0], MatrixIdentity.mMatrix);
    MatrixIdentity.matrix.translate(MatrixIdentity.mMatrix, [8.0, 0.0, -3.0], MatrixIdentity.mMatrix);
    MatrixIdentity.matrix.rotate(MatrixIdentity.mMatrix, rad, [10.0, 0.0, 1.0], MatrixIdentity.mMatrix);
    MatrixIdentity.matrix.multiply(MatrixIdentity.vpMatrix,MatrixIdentity.mMatrix, MatrixIdentity.mvpMatrix);
    MatrixIdentity.matrix.inverse(MatrixIdentity.mMatrix, MatrixIdentity.invMatrix);

    // uniformLocationへ座標変換行列を登録
    KoumeGL.gl.uniformMatrix4fv(uniLocation[0], false, MatrixIdentity.mvpMatrix);
    KoumeGL.gl.uniformMatrix4fv(uniLocation[1], false, MatrixIdentity.invMatrix);
    KoumeGL.gl.uniformMatrix4fv(uniLocation[6], false, MatrixIdentity.mMatrix);
    KoumeGL.gl.uniform1i(uniLocation[7], 1);

    // モデルの描画
    KoumeGL.gl.drawElements(KoumeGL.gl.TRIANGLES, index.length, KoumeGL.gl.UNSIGNED_SHORT, 0);

    // 第三のモデル
    MatrixIdentity.matrix.identity(MatrixIdentity.mMatrix);
    MatrixIdentity.matrix.rotate(MatrixIdentity.mMatrix, rad, [0.0, 1.0, 0.0], MatrixIdentity.mMatrix);
    MatrixIdentity.matrix.translate(MatrixIdentity.mMatrix, [2.0, -8.0, 0.0], MatrixIdentity.mMatrix);
    MatrixIdentity.matrix.rotate(MatrixIdentity.mMatrix, rad, [2.0, 0.0, -2.0], MatrixIdentity.mMatrix);
    MatrixIdentity.matrix.multiply(MatrixIdentity.vpMatrix,MatrixIdentity.mMatrix, MatrixIdentity.mvpMatrix);
    MatrixIdentity.matrix.inverse(MatrixIdentity.mMatrix, MatrixIdentity.invMatrix);

    // uniformLocationへ座標変換行列を登録
    KoumeGL.gl.uniformMatrix4fv(uniLocation[0], false, MatrixIdentity.mvpMatrix);
    KoumeGL.gl.uniformMatrix4fv(uniLocation[1], false, MatrixIdentity.invMatrix);
    KoumeGL.gl.uniformMatrix4fv(uniLocation[6], false, MatrixIdentity.mMatrix);
    KoumeGL.gl.uniform1i(uniLocation[7], 2);

    // モデルの描画
    KoumeGL.gl.drawElements(KoumeGL.gl.TRIANGLES, index.length, KoumeGL.gl.UNSIGNED_SHORT, 0);

    // 第四のモデル
    MatrixIdentity.matrix.identity(MatrixIdentity.mMatrix);
    MatrixIdentity.matrix.rotate(MatrixIdentity.mMatrix, rad, [10.0, 1.0, 2.0], MatrixIdentity.mMatrix);
    MatrixIdentity.matrix.translate(MatrixIdentity.mMatrix, [2.0, 0.0, -1.0], MatrixIdentity.mMatrix);
    MatrixIdentity.matrix.rotate(MatrixIdentity.mMatrix, rad, [1.0, 0.0, -12.0], MatrixIdentity.mMatrix);
    MatrixIdentity.matrix.multiply(MatrixIdentity.vpMatrix,MatrixIdentity.mMatrix, MatrixIdentity.mvpMatrix);
    MatrixIdentity.matrix.inverse(MatrixIdentity.mMatrix, MatrixIdentity.invMatrix);

    // uniformLocationへ座標変換行列を登録
    KoumeGL.gl.uniformMatrix4fv(uniLocation[0], false, MatrixIdentity.mvpMatrix);
    KoumeGL.gl.uniformMatrix4fv(uniLocation[1], false, MatrixIdentity.invMatrix);
    KoumeGL.gl.uniformMatrix4fv(uniLocation[6], false, MatrixIdentity.mMatrix);
    KoumeGL.gl.uniform1i(uniLocation[7], 3);

    // モデルの描画
    KoumeGL.gl.drawElements(KoumeGL.gl.TRIANGLES, index.length, KoumeGL.gl.UNSIGNED_SHORT, 0);

    // 第五のモデル
    MatrixIdentity.matrix.identity(MatrixIdentity.mMatrix);
    MatrixIdentity.matrix.rotate(MatrixIdentity.mMatrix, rad, [3.0, 1.0, 0.0], MatrixIdentity.mMatrix);
    MatrixIdentity.matrix.translate(MatrixIdentity.mMatrix, [2.0, 0.0, 12.0], MatrixIdentity.mMatrix);
    MatrixIdentity.matrix.rotate(MatrixIdentity.mMatrix, rad, [0.0, -2.0, 0.0], MatrixIdentity.mMatrix);
    MatrixIdentity.matrix.multiply(MatrixIdentity.vpMatrix,MatrixIdentity.mMatrix, MatrixIdentity.mvpMatrix);
    MatrixIdentity.matrix.inverse(MatrixIdentity.mMatrix, MatrixIdentity.invMatrix);

    // uniformLocationへ座標変換行列を登録
    KoumeGL.gl.uniformMatrix4fv(uniLocation[0], false, MatrixIdentity.mvpMatrix);
    KoumeGL.gl.uniformMatrix4fv(uniLocation[1], false, MatrixIdentity.invMatrix);
    KoumeGL.gl.uniformMatrix4fv(uniLocation[6], false, MatrixIdentity.mMatrix);
    KoumeGL.gl.uniform1i(uniLocation[7], 4);

    // モデルの描画
    KoumeGL.gl.drawElements(KoumeGL.gl.TRIANGLES, index.length, KoumeGL.gl.UNSIGNED_SHORT, 0);

    // 第六のモデル
    MatrixIdentity.matrix.identity(MatrixIdentity.mMatrix);
    MatrixIdentity.matrix.rotate(MatrixIdentity.mMatrix, rad, [8.0, 1.0, 5.0], MatrixIdentity.mMatrix);
    MatrixIdentity.matrix.translate(MatrixIdentity.mMatrix, [-2.0, -3.0, -3.0], MatrixIdentity.mMatrix);
    MatrixIdentity.matrix.rotate(MatrixIdentity.mMatrix, rad, [1.0, 2.0, -1.0], MatrixIdentity.mMatrix);
    MatrixIdentity.matrix.multiply(MatrixIdentity.vpMatrix,MatrixIdentity.mMatrix, MatrixIdentity.mvpMatrix);
    MatrixIdentity.matrix.inverse(MatrixIdentity.mMatrix, MatrixIdentity.invMatrix);

    // uniformLocationへ座標変換行列を登録
    KoumeGL.gl.uniformMatrix4fv(uniLocation[0], false, MatrixIdentity.mvpMatrix);
    KoumeGL.gl.uniformMatrix4fv(uniLocation[1], false, MatrixIdentity.invMatrix);
    KoumeGL.gl.uniformMatrix4fv(uniLocation[6], false, MatrixIdentity.mMatrix);
    KoumeGL.gl.uniform1i(uniLocation[7], 5);

    // モデルの描画
    KoumeGL.gl.drawElements(KoumeGL.gl.TRIANGLES, index.length, KoumeGL.gl.UNSIGNED_SHORT, 0);

    // 第七のモデル
    MatrixIdentity.matrix.identity(MatrixIdentity.mMatrix);
    MatrixIdentity.matrix.rotate(MatrixIdentity.mMatrix, rad, [10.0, 1.0, -2.0], MatrixIdentity.mMatrix);
    MatrixIdentity.matrix.translate(MatrixIdentity.mMatrix, [2.0, 6.0, -3.0], MatrixIdentity.mMatrix);
    MatrixIdentity.matrix.rotate(MatrixIdentity.mMatrix, rad, [10.0, 5.0, 4.0], MatrixIdentity.mMatrix);
    MatrixIdentity.matrix.multiply(MatrixIdentity.vpMatrix,MatrixIdentity.mMatrix, MatrixIdentity.mvpMatrix);
    MatrixIdentity.matrix.inverse(MatrixIdentity.mMatrix, MatrixIdentity.invMatrix);

    // uniformLocationへ座標変換行列を登録
    KoumeGL.gl.uniformMatrix4fv(uniLocation[0], false, MatrixIdentity.mvpMatrix);
    KoumeGL.gl.uniformMatrix4fv(uniLocation[1], false, MatrixIdentity.invMatrix);
    KoumeGL.gl.uniformMatrix4fv(uniLocation[6], false, MatrixIdentity.mMatrix);
    KoumeGL.gl.uniform1i(uniLocation[7], 6);

    // モデルの描画
    KoumeGL.gl.drawElements(KoumeGL.gl.TRIANGLES, index.length, KoumeGL.gl.UNSIGNED_SHORT, 0);

    // 第八のモデル
    MatrixIdentity.matrix.identity(MatrixIdentity.mMatrix);
    MatrixIdentity.matrix.rotate(MatrixIdentity.mMatrix, rad, [3.0, 1.0, 0.0], MatrixIdentity.mMatrix);
    MatrixIdentity.matrix.translate(MatrixIdentity.mMatrix, [2.0, 2.0, -2.0], MatrixIdentity.mMatrix);
    MatrixIdentity.matrix.rotate(MatrixIdentity.mMatrix, rad, [1.0, 1.0, 5.0], MatrixIdentity.mMatrix);
    MatrixIdentity.matrix.multiply(MatrixIdentity.vpMatrix,MatrixIdentity.mMatrix, MatrixIdentity.mvpMatrix);
    MatrixIdentity.matrix.inverse(MatrixIdentity.mMatrix, MatrixIdentity.invMatrix);

    // uniformLocationへ座標変換行列を登録
    KoumeGL.gl.uniformMatrix4fv(uniLocation[0], false, MatrixIdentity.mvpMatrix);
    KoumeGL.gl.uniformMatrix4fv(uniLocation[1], false, MatrixIdentity.invMatrix);
    KoumeGL.gl.uniformMatrix4fv(uniLocation[6], false, MatrixIdentity.mMatrix);
    KoumeGL.gl.uniform1i(uniLocation[7], 7);

    // モデルの描画
    KoumeGL.gl.drawElements(KoumeGL.gl.TRIANGLES, index.length, KoumeGL.gl.UNSIGNED_SHORT, 0);

    // 第九のモデル
    MatrixIdentity.matrix.identity(MatrixIdentity.mMatrix);
    MatrixIdentity.matrix.rotate(MatrixIdentity.mMatrix, rad, [3.0, 1.0, 0.0], MatrixIdentity.mMatrix);
    MatrixIdentity.matrix.translate(MatrixIdentity.mMatrix, [1.0, 2.0, -10.0], MatrixIdentity.mMatrix);
    MatrixIdentity.matrix.rotate(MatrixIdentity.mMatrix, rad, [3.0, 1.0, 5.0], MatrixIdentity.mMatrix);
    MatrixIdentity.matrix.multiply(MatrixIdentity.vpMatrix,MatrixIdentity.mMatrix, MatrixIdentity.mvpMatrix);
    MatrixIdentity.matrix.inverse(MatrixIdentity.mMatrix, MatrixIdentity.invMatrix);

    // uniformLocationへ座標変換行列を登録
    KoumeGL.gl.uniformMatrix4fv(uniLocation[0], false, MatrixIdentity.mvpMatrix);
    KoumeGL.gl.uniformMatrix4fv(uniLocation[1], false, MatrixIdentity.invMatrix);
    KoumeGL.gl.uniformMatrix4fv(uniLocation[6], false, MatrixIdentity.mMatrix);
    KoumeGL.gl.uniform1i(uniLocation[7], 8);

    // モデルの描画
    KoumeGL.gl.drawElements(KoumeGL.gl.TRIANGLES, index.length, KoumeGL.gl.UNSIGNED_SHORT, 0);

    // コンテキストの再描画
    KoumeGL.gl.flush();

    // フラグをチェックしてアニメーション
    if( run ){ requestAnimationFrame( this._render.bind(this) ); }

  }

}
