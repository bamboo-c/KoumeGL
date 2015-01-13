/*-----------------------------------------------------
* Textures
-----------------------------------------------------*/
var Textures = function() {

  this._init.apply( this );

}
Textures.prototype = {

  //-------------------------------------------------
  // initialize
  //-------------------------------------------------
  _init : function() {

  },

  //-------------------------------------------------
  // image texture
  //-------------------------------------------------
  fromImage : function( i_data ) {

    var tex = KoumeGL.gl.createTexture();
    var img = new Image();

    img.src = i_data;

    KoumeGL.gl.activeTexture( KoumeGL.gl.TEXTURE0 );
    // テクスチャをバインドする
    KoumeGL.gl.bindTexture( KoumeGL.gl.TEXTURE_2D, tex );

    // テクスチャへイメージを適用
    KoumeGL.gl.texImage2D( KoumeGL.gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img );

    // ミップマップを生成
    KoumeGL.gl.generateMipmap( KoumeGL.gl.TEXTURE_2D );

    // テクスチャのバインドを無効化
    KoumeGL.gl.bindTexture( KoumeGL.gl.TEXTURE_2D, null );

    return tex;

  }

}
