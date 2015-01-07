window.PI = Math.PI / 180;

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

    // 描画するモデルの数を配列で指定する
    KoumeGL.modelLength = 9;

    // 行列の初期化とか
    MatrixIdentity.init();


    // シェーダ
    KoumeGL.shader = new Shader();
    // Buffer
    KoumeGL.buffer = new BufferAttribute();


    // stage の設定
    KoumeGL._stage();

    // camera の設定
    KoumeGL._camera();

    // light の設定
    KoumeGL._lighting();

    // テクスチャの設定
    KoumeGL._texture();

    // 描画
    run = true;
    KoumeGL._render();

  },

  //-------------------------------------------
  // stage setting
  //-------------------------------------------
  _stage : function() {

    // canvas の色の初期化
    var clearColor = [0.0, 0.0, 0.0, 1.0];

    // canvas の深度値の初期化
    var clearDepth = 1.0;

    KoumeGL.stage = new Stage( clearColor, clearDepth )

  },

  //-------------------------------------------
  // camera setting
  //-------------------------------------------
  _camera : function() {

    // カメラの位置
    var eyeX = 0.0;
    var eyeY = 0.0;
    var eyeZ = 0.0;

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

    // 視野角
    var angle = 45;

    // 視点の距離の最小値
    var viewMin = 0.1;

    // 視点の距離の最大値
    var viewMax = 50.0;

    KoumeGL.camera = new Camera( eye, center, up, angle, viewMin, viewMax );

  },

  //-------------------------------------------
  // light setting
  //-------------------------------------------
  _lighting : function() {

    // ライトの位置
    var lightPosition = [0.0, 0.0, 0.0];

    KoumeGL.lighting = new Lighting( lightPosition );

  },

  //-------------------------------------------
  // texture setting
  //-------------------------------------------
  _texture : function() {

    var texLength = 1;

    // 指定したいテクスチャを指定する
    // テクスチャを適用したいモデルを配列でキーに入れとく
    var tex = {
      0 : video,
      1 : video,
      2 : video,
      3 : video,
      4 : video,
      5 : video,
      6 : video,
      7 : video,
      8 : video
    };

    KoumeGL.texture = new Textures( tex, texLength );

  },

  //-------------------------------------------
  // render setting
  //-------------------------------------------
  _render : function() {

    // 目線
    var eyePositionX = 0.0;
    var eyePositionY = 0.0;
    var eyePositionZ = 5.0;

    var eyePosition = [eyePositionX, eyePositionY, eyePositionZ];

    // 原点
    var centerPointX = 0.0;
    var centerPointY = 0.0;
    var centerPointZ = 0.0;
    var centerPoint = [centerPointX, centerPointY, centerPointZ];

    // 環境色
    var ambientColor = [0.1, 0.1, 0.1];

    // モデルを描画する場所とかアニメーションの位置とか
    var renderSet = {

      0 : {
        // 実行したいプロセスの数
        digit : 3,
        // 実行したいプロセス
        process : ["rotate", "translate", "rotate"],
        // プロセスの値
        val : [[1.0, 1.0, 2.0], [-2.0, -1.0, -1.0], [1.0, 2.0, -1.0]]
      },
      1 : {
        digit : 3,
        process : ["rotate", "translate", "rotate"],
        val : [[1.0, 1.0, 0.0], [8.0, 0.0, -3.0], [10.0, 0.0, 1.0]]
      },
      2 : {
        digit : 3,
        process : ["rotate", "translate", "rotate"],
        val : [[0.0, 1.0, 0.0], [2.0, -8.0, 0.0], [2.0, 0.0, -2.0]]
      },
      3 : {
        digit : 3,
        process : ["rotate", "translate", "rotate"],
        val : [[10.0, 1.0, 2.0], [2.0, 0.0, -1.0], [2.0, 0.0, -2.0]]
      },
      4 : {
        digit : 3,
        process : ["rotate", "translate", "rotate"],
        val : [[3.0, 1.0, 0.0], [2.0, 0.0, 12.0], [0.0, -2.0, 0.0]]
      },
      5 : {
        digit : 3,
        process : ["rotate", "translate", "rotate"],
        val : [[8.0, 1.0, 5.0], [-2.0, -3.0, -3.0], [1.0, 2.0, -1.0]]
      },
      6 : {
        digit : 3,
        process : ["rotate", "translate", "rotate"],
        val : [[10.0, 1.0, -2.0], [2.0, 6.0, -3.0], [10.0, 5.0, 4.0]]
      },
      7 : {
        digit : 3,
        process : ["rotate", "translate", "rotate"],
        val : [[3.0, 1.0, 0.0], [2.0, 2.0, -2.0], [1.0, 1.0, 5.0]]
      },
      8 : {
        digit : 3,
        process : ["rotate", "translate", "rotate"],
        val : [[3.0, 1.0, 0.0], [1.0, 2.0, -10.0], [3.0, 1.0, 5.0]]
      }

    }

    KoumeGL.render = new Render( ambientColor, eyePosition, centerPoint, renderSet );

  }

}
