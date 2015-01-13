/*-----------------------------------------------------
* BufferAttribute
-----------------------------------------------------*/
var BufferAttribute = function() {

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

  },

  //-------------------------------------------------
  // get AttributeLocation
  //-------------------------------------------------
  _getAttribute : function() {

    // attributeLocationの取得
    this._attLocationPosition = KoumeGL.gl.getAttribLocation(KoumeGL.shader.prg, "position");
    this._attLocationNormal = KoumeGL.gl.getAttribLocation(KoumeGL.shader.prg, "normal");
    this._attLocationColor = KoumeGL.gl.getAttribLocation(KoumeGL.shader.prg, "color");
    this._attLocationTexCoord = KoumeGL.gl.getAttribLocation(KoumeGL.shader.prg, "texCoord");

    // attributeの要素数
    this._attStridePosition = 3;
    this._attStrideNormal = 3;
    this._attStrideColor = 4;
    this._attStrideTexCoord = 2;

    this._getUniform();

  },

  //-------------------------------------------------
  // get uniformLocation
  //-------------------------------------------------
  _getUniform : function() {

    // uniformLocationの取得
    this.uniLocationMvpMatrix = KoumeGL.gl.getUniformLocation( KoumeGL.shader.prg, "mvpMatrix" );
    this.uniLocationInvMatrix = KoumeGL.gl.getUniformLocation( KoumeGL.shader.prg, "invMatrix" );
    this.uniLocationLightPosition = KoumeGL.gl.getUniformLocation( KoumeGL.shader.prg, "lightPosition" );
    this.uniLocationAmbientColor = KoumeGL.gl.getUniformLocation( KoumeGL.shader.prg, "ambientColor" );
    this.uniLocationEyePosition = KoumeGL.gl.getUniformLocation( KoumeGL.shader.prg, "eyePosition" );
    this.uniLocationCenterPoint = KoumeGL.gl.getUniformLocation( KoumeGL.shader.prg, "centerPoint" );
    this.uniLocationMMatrix = KoumeGL.gl.getUniformLocation( KoumeGL.shader.prg, "mMatrix" );
    this.uniLocationTextureUnit = KoumeGL.gl.getUniformLocation( KoumeGL.shader.prg, "textureUnit" );

    this._bindVbo();
    this._bindIbo();

  },

  //-------------------------------------------------
  // bind VBO
  //-------------------------------------------------
  _bindVbo : function() {

    // VBOのバインドと登録
    this._attVBOvPosition = this._createVbo( MatrixIdentity.vPosition );
    KoumeGL.gl.bindBuffer( KoumeGL.gl.ARRAY_BUFFER, this._attVBOvPosition  );
    KoumeGL.gl.enableVertexAttribArray( this._attLocationPosition );
    KoumeGL.gl.vertexAttribPointer( this._attLocationPosition, this._attStridePosition, KoumeGL.gl.FLOAT, false, 0, 0 );

    this._attVBOvNormal = this._createVbo( MatrixIdentity.vNormal );
    KoumeGL.gl.bindBuffer( KoumeGL.gl.ARRAY_BUFFER, this._attVBOvNormal  );
    KoumeGL.gl.enableVertexAttribArray( this._attLocationNormal );
    KoumeGL.gl.vertexAttribPointer( this._attLocationNormal, this._attStrideNormal, KoumeGL.gl.FLOAT, false, 0, 0 );

    this._attVBOvColor = this._createVbo( MatrixIdentity.vColor );
    KoumeGL.gl.bindBuffer( KoumeGL.gl.ARRAY_BUFFER, this._attVBOvColor  );
    KoumeGL.gl.enableVertexAttribArray( this._attLocationColor );
    KoumeGL.gl.vertexAttribPointer( this._attLocationColor, this._attStrideColor, KoumeGL.gl.FLOAT, false, 0, 0 );

    this._attVBOvTexCoord = this._createVbo( MatrixIdentity.vTexCoord );
    KoumeGL.gl.bindBuffer( KoumeGL.gl.ARRAY_BUFFER, this._attVBOvTexCoord  );
    KoumeGL.gl.enableVertexAttribArray( this._attLocationTexCoord );
    KoumeGL.gl.vertexAttribPointer( this._attLocationTexCoord, this._attStrideTexCoord, KoumeGL.gl.FLOAT, false, 0, 0 );

    // VBOの生成
    this._vbo = this._createVbo( MatrixIdentity.index );

    // VBOをバインド
    KoumeGL.gl.bindBuffer( KoumeGL.gl.ELEMENT_ARRAY_BUFFER, this._ibo );

  },

  //-------------------------------------------
  // create VBO
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

  //-------------------------------------------------
  // bind IBO
  //-------------------------------------------------
  _bindIbo : function() {

    // IBOの生成
    this._ibo = this._createIbo( MatrixIdentity.index );

    // IBOをバインド
    KoumeGL.gl.bindBuffer( KoumeGL.gl.ELEMENT_ARRAY_BUFFER, this._ibo );

  },

  //-------------------------------------------
  // create IBO
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

  }

}
