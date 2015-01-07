/*-----------------------------------------------------
* Textures
-----------------------------------------------------*/
var Textures = function( i_data, i_length ) {

  this._src = i_data;
  this._length = i_length;

  this._init.apply( this );

}
Textures.prototype = {

  //-------------------------------------------------
  // initialize
  //-------------------------------------------------
  _init : function() {

    this._createTex();

  },

  //-------------------------------------------------
  // create texture
  //-------------------------------------------------
  _createTex : function() {

    var constant = 33984;
    var tex = KoumeGL.gl.createTexture();

    // テクスチャをアクティブにする
    for( var i = this._length - 1; i >= 0; i-- ) {

      KoumeGL.gl.activeTexture( constant + i );

    }

    // テクスチャをバインドする
    for( var i = KoumeGL.modelLength -1; i >= 0; i-- ) {

      KoumeGL.gl.bindTexture( KoumeGL.gl.TEXTURE_2D, tex );

    }

    // テクスチャを適用
    KoumeGL.gl.pixelStorei( KoumeGL.gl.UNPACK_FLIP_Y_WEBGL, true );
    KoumeGL.gl.texImage2D( KoumeGL.gl.TEXTURE_2D, 0, KoumeGL.gl.RGBA, KoumeGL.gl.RGBA,KoumeGL.gl.UNSIGNED_BYTE, video );

    KoumeGL.gl.texParameteri( KoumeGL.gl.TEXTURE_2D, KoumeGL.gl.TEXTURE_MAG_FILTER, KoumeGL.gl.LINEAR );
    KoumeGL.gl.texParameteri( KoumeGL.gl.TEXTURE_2D, KoumeGL.gl.TEXTURE_MIN_FILTER, KoumeGL.gl.LINEAR_MIPMAP_NEAREST );
    KoumeGL.gl.generateMipmap( KoumeGL.gl.TEXTURE_2D );
    KoumeGL.gl.bindTexture( KoumeGL.gl.TEXTURE_2D, null );

  }

}
