/*-----------------------------------------------------
* Shader
-----------------------------------------------------*/
var Shader = function() {

  this.prg;

  this._fragmentSharder;
  this._vertexSharder;
  this._generateShader;

  this._vShader;
  this._fShader;

  this._init.apply( this );

}
Shader.prototype = {

  //-------------------------------------------------
  // initialize
  //-------------------------------------------------
  _init : function() {

    this._vShader = document.getElementById("vertexShader").textContent;
    this._fShader = document.getElementById("flagmentShader").textContent;

    this._vShader = this._createShader( this._vShader, KoumeGL.gl.VERTEX_SHADER );
    this._fShader = this._createShader( this._fShader, KoumeGL.gl.FRAGMENT_SHADER );

    this.prg = this._createProgram( this._vShader, this._fShader );

  },

  //-------------------------------------------------
  // create shader
  //-------------------------------------------------
  _createShader : function( i_src, i_type ) {

    // シェーダの生成
    this._shader = KoumeGL.gl.createShader( i_type );

    // 生成されたシェーダにソースを割り当てる
    KoumeGL.gl.shaderSource( this._shader, i_src );

    // シェーダをコンパイルする
    KoumeGL.gl.compileShader( this._shader );

    // シェーダが正しくコンパイルされたかチェック
    if( KoumeGL.gl.getShaderParameter( this._shader, KoumeGL.gl.COMPILE_STATUS )) {

      return this._shader;

    } else {

      // 失敗していたらエラーログをアラートする
      console.log( KoumeGL.gl.getShaderInfoLog( this._shader ) );

      // null を返して終了
      return null;
    }

  },

  //-------------------------------------------------
  // createprogram
  //-------------------------------------------------
  _createProgram : function( i_vs, i_fs ) {

    this._program = KoumeGL.gl.createProgram();

    // プログラムオブジェクトにシェーダを割り当てる
    KoumeGL.gl.attachShader( this._program, i_vs );
    KoumeGL.gl.attachShader( this._program, i_fs );

    // シェーダをリンク
    KoumeGL.gl.linkProgram(this._program );

    // シェーダのリンクが正しく行なわれたかチェック
    if( KoumeGL.gl.getProgramParameter(this._program, KoumeGL.gl.LINK_STATUS )){

      // 成功していたらプログラムオブジェクトを有効にする
      KoumeGL.gl.useProgram( this._program );

      // プログラムオブジェクトを返して終了
      return this._program;

    } else {

      // 失敗していたらエラーログをアラートする
      console.log( KoumeGL.gl.getProgramInfoLog( this._program ));

      // null を返して終了
      return null;
    }

  }


}
