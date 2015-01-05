/*-----------------------------------------------------
* BufferAttribute
-----------------------------------------------------*/
var BufferAttribute = function() {

  this._attLocation;
  this._attStride;
  this.uniLocation
  this._vbo
  this._ibo

  this._getAttribute;
  this._getUniform;
  this._setAttribute;
  this._createVbo;
  this._createIbo;
  this._bindVbo;
  this._bindIbo;

  this._init.apply( this );

}
BufferAttribute.prototype = {

  //-------------------------------------------------
  // initialize
  //-------------------------------------------------
  _init : function() {

    this._getAttribute();
    this._getUniform();
    this._bindVbo();
    this._bindIbo();

  },

  //-------------------------------------------------
  // get AttributeLocation
  //-------------------------------------------------
  _getAttribute : function() {

    // attributeLocationの取得
    this._attLocation = [];

    this._attLocation[0] = KoumeGL.gl.getAttribLocation(KoumeGL.shader.prg, "position");
    this._attLocation[1] = KoumeGL.gl.getAttribLocation(KoumeGL.shader.prg, "normal");
    this._attLocation[2] = KoumeGL.gl.getAttribLocation(KoumeGL.shader.prg, "color");
    this._attLocation[3] = KoumeGL.gl.getAttribLocation(KoumeGL.shader.prg, "texCoord");

    // attributeの要素数
    this._attStride = [];
    this._attStride[0] = 3;
    this._attStride[1] = 3;
    this._attStride[2] = 4;
    this._attStride[3] = 2;

  },

  //-------------------------------------------------
  // get uniformLocation
  //-------------------------------------------------
  _getUniform : function() {

    // uniformLocationの取得
    this.uniLocation = [];
    this.uniLocation[0] = KoumeGL.gl.getUniformLocation(KoumeGL.shader.prg, "mvpMatrix");
    this.uniLocation[1] = KoumeGL.gl.getUniformLocation(KoumeGL.shader.prg, "invMatrix");
    this.uniLocation[2] = KoumeGL.gl.getUniformLocation(KoumeGL.shader.prg, "lightPosition");
    this.uniLocation[3] = KoumeGL.gl.getUniformLocation(KoumeGL.shader.prg, "ambientColor");
    this.uniLocation[4] = KoumeGL.gl.getUniformLocation(KoumeGL.shader.prg, "eyePosition");
    this.uniLocation[5] = KoumeGL.gl.getUniformLocation(KoumeGL.shader.prg, "centerPoint");
    this.uniLocation[6] = KoumeGL.gl.getUniformLocation(KoumeGL.shader.prg, "mMatrix");
    this.uniLocation[7] = KoumeGL.gl.getUniformLocation(KoumeGL.shader.prg, "textureUnit");

  },

  //-------------------------------------------------
  // set AttributeLocation
  //-------------------------------------------------
  _setAttribute : function( i_vbo, i_attL, i_attS ) {

    // 引数として受け取った配列を処理する
    for( var i in i_vbo ){
      // バッファをバインドする
      KoumeGL.gl.bindBuffer( KoumeGL.gl.ARRAY_BUFFER, i_vbo[i] );

      // attributeLocationを有効にする
      KoumeGL.gl.enableVertexAttribArray( i_attL[i] );

      // attributeLocationを通知し登録する
      KoumeGL.gl.vertexAttribPointer( i_attL[i], i_attS[i], KoumeGL.gl.FLOAT, false, 0, 0 );
    }

  },

  //-------------------------------------------
  // create vbo
  //-------------------------------------------
  _createVbo : function( i_data ) {

    // バッファオブジェクトの生成
    this._vbo = KoumeGL.gl.createBuffer();

    // バッファをバインドする
    KoumeGL.gl.bindBuffer( KoumeGL.gl.ARRAY_BUFFER, this._vbo );

    // バッファにデータをセット
    KoumeGL.gl.bufferData( KoumeGL.gl.ARRAY_BUFFER, new Float32Array( i_data ), KoumeGL.gl.STATIC_DRAW );

    // バッファのバインドを無効化
    KoumeGL.gl.bindBuffer( KoumeGL.gl.ARRAY_BUFFER, null );

    // 生成した VBO を返して終了
    return this._vbo;

  },

  //-------------------------------------------
  // create ibo
  //-------------------------------------------
  _createIbo : function( i_data ){

    // バッファオブジェクトの生成
    this._ibo = KoumeGL.gl.createBuffer();

    // バッファをバインドする
    KoumeGL.gl.bindBuffer( KoumeGL.gl.ELEMENT_ARRAY_BUFFER, this._ibo );

    // バッファにデータをセット
    KoumeGL.gl.bufferData( KoumeGL.gl.ELEMENT_ARRAY_BUFFER, new Int16Array( i_data ), KoumeGL.gl.STATIC_DRAW );

    // バッファのバインドを無効化
    KoumeGL.gl.bindBuffer( KoumeGL.gl.ELEMENT_ARRAY_BUFFER, null );

    // 生成したIBOを返して終了
    return this._ibo;

  },

  //-------------------------------------------------
  // bind VBO
  //-------------------------------------------------
  _bindVbo : function() {

    this._attVBO = [];
    this._attVBO[0] = this._createVbo( MatrixIdentity.vPosition );
    this._attVBO[1] = this._createVbo( MatrixIdentity.vNormal );
    this._attVBO[2] = this._createVbo( MatrixIdentity.vColor );
    this._attVBO[3] = this._createVbo( MatrixIdentity.vTexCoord );

    // VBOのバインドと登録
    this._setAttribute( this._attVBO, this._attLocation, this._attStride);

    // VBOの生成
    this._vbo = this._createVbo( MatrixIdentity.index );

    // VBOをバインド
    KoumeGL.gl.bindBuffer( KoumeGL.gl.ELEMENT_ARRAY_BUFFER, this._ibo );

  },

  //-------------------------------------------------
  // bind IBO
  //-------------------------------------------------
  _bindIbo : function() {

    // IBOの生成
    this._ibo = this._createIbo( MatrixIdentity.index );

    // IBOをバインド
    KoumeGL.gl.bindBuffer( KoumeGL.gl.ELEMENT_ARRAY_BUFFER, this._ibo );

  }

}
