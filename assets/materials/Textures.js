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

    this.texture = [];
    var constant = 33984;


    // テクスチャをアクティブにしてバインド、生成
    for( var i = this._length - 1; i >= 0; i-- ) {

      KoumeGL.gl.activeTexture( constant + i );
      KoumeGL.gl.bindTexture( KoumeGL.gl.TEXTURE_2D, this.texture[i] );
      this._createTexture( this._src[i] , i );

    }

  },

  //-------------------------------------------------
  // create texture
  //-------------------------------------------------
  _createTexture : function( i_src, i_num ){

    var img = new Image();

    // データのオンロードをトリガーにする
    img.onload = function(){
      // テクスチャオブジェクトの生成
      var tex = KoumeGL.gl.createTexture();

      // テクスチャをバインドする
      KoumeGL.gl.bindTexture( KoumeGL.gl.TEXTURE_2D, tex );
      KoumeGL.gl.texParameteri(gl.TEXTURE_2D, KoumeGL.gl.TEXTURE_WRAP_S, KoumeGL.gl.CLAMP_TO_EDGE);
      KoumeGL.gl.texParameteri(gl.TEXTURE_2D, KoumeGL.gl.TEXTURE_WRAP_T, KoumeGL.gl.CLAMP_TO_EDGE);
      KoumeGL.gl.texParameteri(gl.TEXTURE_2D, KoumeGL.gl.TEXTURE_MIN_FILTER, KoumeGL.gl.NEAREST);
      KoumeGL.gl.texParameteri(gl.TEXTURE_2D, KoumeGL.gl.TEXTURE_MAG_FILTER, KoumeGL.gl.NEAREST);
      KoumeGL.gl.bindTexture(gl.TEXTURE_2D, null);

      KoumeGL.gl.bindTexture(gl.TEXTURE_2D, texture);
      KoumeGL.gl.texImage2D(gl.TEXTURE_2D, 0, KoumeGL.gl.RGBA, KoumeGL.gl.RGBA, KoumeGL.gl.UNSIGNED_BYTE, video);

      // テクスチャへイメージを適用
      KoumeGL.gl.texImage2D( KoumeGL.gl.TEXTURE_2D, 0, KoumeGL.gl.RGBA, KoumeGL.gl.RGBA, KoumeGL.gl.UNSIGNED_BYTE, img );

      // ミップマップを生成
      KoumeGL.gl.generateMipmap( KoumeGL.gl.TEXTURE_2D );

      // テクスチャのバインドを無効化
      KoumeGL.gl.bindTexture( KoumeGL.gl.TEXTURE_2D, null );

      // 生成したテクスチャを変数に代入
      Textures.texture[i_num] = tex;
    };

    // イメージオブジェクトのソースを指定
    img.src = i_src;

  }

}
