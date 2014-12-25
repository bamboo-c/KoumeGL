/*-----------------------------------------------------
* MatrixIdentity
-----------------------------------------------------*/
var MatrixIdentity = {

  init : function() {

    this.sphereData = sphere(64, 64, 1.0, [1.0, 1.0, 1.0, 1.0]);
    this.vPosition = this.sphereData.p;
    this.vColor    = this.sphereData.c;
    this.vNormal   = this.sphereData.n;
    this.vTexCoord = this.sphereData.t;
    this.index     = this.sphereData.i;

    this.matrix = new matIV();

    // 各種行列の生成と初期化
    this.mMatrix = this.matrix.identity( this.matrix.create() );
    this.vMatrix = this.matrix.identity( this.matrix.create() );
    this.pMatrix = this.matrix.identity( this.matrix.create() );
    this.vpMatrix = this.matrix.identity( this.matrix.create() );
    this.mvpMatrix = this.matrix.identity( this.matrix.create() );
    this.invMatrix = this.matrix.identity( this.matrix.create() );

  }

}
