/*-----------------------------------------------------
* Stage
-----------------------------------------------------*/
var Stage = function( i_color, i_depth ) {

  this._color = i_color;
  this._depth = i_depth;

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

  }

}
