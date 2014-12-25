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

    Textures.texture = [];

    // テクスチャ画像の指定
    this._createTexture('kotori.jpg', 0);
    this._createTexture('kotori.jpg', 1);
    this._createTexture('kotori.jpg', 2);
    this._createTexture('kotori.jpg', 3);
    this._createTexture('kotori.jpg', 4);
    this._createTexture('kotori.jpg', 5);
    this._createTexture('kotori.jpg', 6);
    this._createTexture('kotori.jpg', 7);
    this._createTexture('kotori.jpg', 8);

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
