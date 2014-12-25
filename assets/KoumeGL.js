window.onload = function() { KoumeGL.init() };

var KoumeGL = {

  //-------------------------------------------
  // initialize
  //-------------------------------------------
  init : function() {

    window.addEventListener( "keydown", function( i_event ){ run = i_event.keyCode !== 27;}, true );

    // canvas の取得
    KoumeGL.canvas = document.getElementById( "canvas" );
    // canvas のサイズを設定
    KoumeGL.canvas.width = window.innerWidth;
    KoumeGL.canvas.height = window.innerHeight;

    // webglコンテキストを取得
    KoumeGL.gl = KoumeGL.canvas.getContext("webgl") || KoumeGL.canvas.getContext("experimental-webgl");

    // 行列の初期化とか
    MatrixIdentity.init();

    // シェーダ
    KoumeGL._shader = new Shader();

    // stage の設定
    KoumeGL._stage();

    // camera の設定
    KoumeGL._camera();

    // light の設定
    KoumeGL._lighting();

    // テクスチャの設定
    KoumeGL._texture = new Textures();

    // 描画
    KoumeGL.render = new Render();

  },

  //-------------------------------------------
  // stage setting
  //-------------------------------------------
  _stage : function() {

    // canvas の色の初期化
    var clearColor = [0.0, 0.0, 0.0, 1.0];

    // canvas の深度値の初期化
    var clearDepth = 1.0;

    // 環境色
    var ambientColor = [0.1, 0.1, 0.1];

    // 目線
    var eyePositionX = 0.0;
    var eyePositionY = 0.0;
    var eyePositionZ = 10.0;

    var eyePosition = [eyePositionX, eyePositionY, eyePositionZ];

    // 原点
    var centerPointX = 0.0;
    var centerPointY = 0.0;
    var centerPointZ = 0.0;
    var centerPoint = [centerPointX, centerPointY, centerPointZ];

    Stage.init( clearColor, clearDepth, ambientColor, eyePosition, centerPoint );

  },

  //-------------------------------------------
  // camera setting
  //-------------------------------------------
  _camera : function() {

    // カメラの位置
    var eyeX = 0.0;
    var eyeY = 0.0;
    var eyeZ = 20.0;

    var eye = [ eyeX, eyeY, eyeZ ];

    // 注視点
    var centerX = 0.0;
    var centerY = 0.0;
    var centerZ = 0.0;

    var center = [ centerX, centerY, centerZ ];

    // カメラの上方向
    var upX = 0.0;
    var upY = 1.0;
    var upZ = 0.0;

    var up = [ upX, upY, upZ ];

    KoumeGL.camera = new Camera( eye, center, up );

  },

  //-------------------------------------------
  // light setting
  //-------------------------------------------
  _lighting : function() {

    // ライトの位置
    var lightPosition = [0.0, 0.0, 0.0];

    KoumeGL.lighting = new Lighting( lightPosition );

  }


}
