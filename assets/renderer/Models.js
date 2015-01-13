/*-----------------------------------------------------
* Models
-----------------------------------------------------*/
var Models = function() {

  this._texture;
  this._animation;

  this._run.apply( this );

}
Models.prototype = {

  //-------------------------------------------------
  // initialize
  //-------------------------------------------------
  _init : function() {

    // 適用するテクスチャ
    this._texture = {
      data : "hoge.jpg",
      type : "video"
    };

    // 適用するアニメーション
    this._animation = {
      rotate : [0,0,0],
      translate : [0,0,0],
      rotate : [0,0,0],
      scale : [0,0,0]
    };

    this.update( this._texture, this._animation );

  },

  //-------------------------------------------------
  // texture
  //-------------------------------------------------
  _texture : function() {

    var constant = 33984;
    var tex = KoumeGL.gl.createTexture();

    KoumeGL.gl.activeTexture( constant );

    KoumeGL.gl.bindTexture( KoumeGL.gl.TEXTURE_2D, tex );

    // テクスチャを適用
    KoumeGL.gl.pixelStorei( KoumeGL.gl.UNPACK_FLIP_Y_WEBGL, true );
    KoumeGL.gl.texImage2D( KoumeGL.gl.TEXTURE_2D, 0, KoumeGL.gl.RGBA, KoumeGL.gl.RGBA,KoumeGL.gl.UNSIGNED_BYTE, video );

    KoumeGL.gl.texParameteri( KoumeGL.gl.TEXTURE_2D, KoumeGL.gl.TEXTURE_MAG_FILTER, KoumeGL.gl.LINEAR );
    KoumeGL.gl.texParameteri( KoumeGL.gl.TEXTURE_2D, KoumeGL.gl.TEXTURE_MIN_FILTER, KoumeGL.gl.LINEAR_MIPMAP_NEAREST );
    KoumeGL.gl.generateMipmap( KoumeGL.gl.TEXTURE_2D );
    KoumeGL.gl.bindTexture( KoumeGL.gl.TEXTURE_2D, null );

  },

  //-------------------------------------------------
  // draw
  //-------------------------------------------------
  update : function( i_tex, i_anim ) {

    MatrixIdentity.matrix.identity(MatrixIdentity.mMatrix);

    MatrixIdentity.matrix.rotate( MatrixIdentity.mMatrix, this._rad, this._position[i_num].val[this._count2], MatrixIdentity.mMatrix);

    MatrixIdentity.matrix.translate( MatrixIdentity.mMatrix, this._position[i_num].val[this._count2], MatrixIdentity.mMatrix);

    MatrixIdentity.matrix.multiply(MatrixIdentity.vpMatrix,MatrixIdentity.mMatrix, MatrixIdentity.mvpMatrix);
    MatrixIdentity.matrix.inverse(MatrixIdentity.mMatrix, MatrixIdentity.invMatrix);

  },

  //-------------------------------------------------
  // add model
  //-------------------------------------------------
  add : function() {

  },

  //-------------------------------------------------
  // remove model
  //-------------------------------------------------
  remove : function() {

  }

}

/*-----------------------------------------------------
* Models
-----------------------------------------------------*/
