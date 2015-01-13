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

    // 描画するモデルの数を指定する
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

    // 描画
    run = true;
    KoumeGL._render();

    // debug
    ctx = WebGLDebugUtils.makeDebugContext(canvas.getContext("webgl"));

  },

  //-------------------------------------------
  // stage setting
  //-------------------------------------------
  _stage : function() {

    // canvas の色の初期化
    var clearColor = [0.0, 0.0, 0.0, 1];

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

  },

  // エラー
  throwOnGLError : function( err, funcName, args ) {

     throw WebGLDebugUtils.glEnumToString(err) + " was caused by call to: " + funcName;

  }

}

// ------------------------------------------------------------------------------------------------
// minMatrix.js
// version 0.0.3
// ------------------------------------------------------------------------------------------------

function matIV(){
	this.create = function(){
		return new Float32Array(16);
	};
	this.identity = function(dest){
		dest[0]  = 1; dest[1]  = 0; dest[2]  = 0; dest[3]  = 0;
		dest[4]  = 0; dest[5]  = 1; dest[6]  = 0; dest[7]  = 0;
		dest[8]  = 0; dest[9]  = 0; dest[10] = 1; dest[11] = 0;
		dest[12] = 0; dest[13] = 0; dest[14] = 0; dest[15] = 1;
		return dest;
	};
	this.multiply = function(mat1, mat2, dest){
		var a = mat1[0],  b = mat1[1],  c = mat1[2],  d = mat1[3],
			e = mat1[4],  f = mat1[5],  g = mat1[6],  h = mat1[7],
			i = mat1[8],  j = mat1[9],  k = mat1[10], l = mat1[11],
			m = mat1[12], n = mat1[13], o = mat1[14], p = mat1[15],
			A = mat2[0],  B = mat2[1],  C = mat2[2],  D = mat2[3],
			E = mat2[4],  F = mat2[5],  G = mat2[6],  H = mat2[7],
			I = mat2[8],  J = mat2[9],  K = mat2[10], L = mat2[11],
			M = mat2[12], N = mat2[13], O = mat2[14], P = mat2[15];
		dest[0] = A * a + B * e + C * i + D * m;
		dest[1] = A * b + B * f + C * j + D * n;
		dest[2] = A * c + B * g + C * k + D * o;
		dest[3] = A * d + B * h + C * l + D * p;
		dest[4] = E * a + F * e + G * i + H * m;
		dest[5] = E * b + F * f + G * j + H * n;
		dest[6] = E * c + F * g + G * k + H * o;
		dest[7] = E * d + F * h + G * l + H * p;
		dest[8] = I * a + J * e + K * i + L * m;
		dest[9] = I * b + J * f + K * j + L * n;
		dest[10] = I * c + J * g + K * k + L * o;
		dest[11] = I * d + J * h + K * l + L * p;
		dest[12] = M * a + N * e + O * i + P * m;
		dest[13] = M * b + N * f + O * j + P * n;
		dest[14] = M * c + N * g + O * k + P * o;
		dest[15] = M * d + N * h + O * l + P * p;
		return dest;
	};
	this.scale = function(mat, vec, dest){
		dest[0]  = mat[0]  * vec[0];
		dest[1]  = mat[1]  * vec[0];
		dest[2]  = mat[2]  * vec[0];
		dest[3]  = mat[3]  * vec[0];
		dest[4]  = mat[4]  * vec[1];
		dest[5]  = mat[5]  * vec[1];
		dest[6]  = mat[6]  * vec[1];
		dest[7]  = mat[7]  * vec[1];
		dest[8]  = mat[8]  * vec[2];
		dest[9]  = mat[9]  * vec[2];
		dest[10] = mat[10] * vec[2];
		dest[11] = mat[11] * vec[2];
		dest[12] = mat[12];
		dest[13] = mat[13];
		dest[14] = mat[14];
		dest[15] = mat[15];
		return dest;
	};
	this.translate = function(mat, vec, dest){
		dest[0] = mat[0]; dest[1] = mat[1]; dest[2]  = mat[2];  dest[3]  = mat[3];
		dest[4] = mat[4]; dest[5] = mat[5]; dest[6]  = mat[6];  dest[7]  = mat[7];
		dest[8] = mat[8]; dest[9] = mat[9]; dest[10] = mat[10]; dest[11] = mat[11];
		dest[12] = mat[0] * vec[0] + mat[4] * vec[1] + mat[8]  * vec[2] + mat[12];
		dest[13] = mat[1] * vec[0] + mat[5] * vec[1] + mat[9]  * vec[2] + mat[13];
		dest[14] = mat[2] * vec[0] + mat[6] * vec[1] + mat[10] * vec[2] + mat[14];
		dest[15] = mat[3] * vec[0] + mat[7] * vec[1] + mat[11] * vec[2] + mat[15];
		return dest;
	};
	this.rotate = function(mat, angle, axis, dest){
		var sq = Math.sqrt(axis[0] * axis[0] + axis[1] * axis[1] + axis[2] * axis[2]);
		if(!sq){return null;}
		var a = axis[0], b = axis[1], c = axis[2];
		if(sq != 1){sq = 1 / sq; a *= sq; b *= sq; c *= sq;}
		var d = Math.sin(angle), e = Math.cos(angle), f = 1 - e,
			g = mat[0],  h = mat[1], i = mat[2],  j = mat[3],
			k = mat[4],  l = mat[5], m = mat[6],  n = mat[7],
			o = mat[8],  p = mat[9], q = mat[10], r = mat[11],
			s = a * a * f + e,
			t = b * a * f + c * d,
			u = c * a * f - b * d,
			v = a * b * f - c * d,
			w = b * b * f + e,
			x = c * b * f + a * d,
			y = a * c * f + b * d,
			z = b * c * f - a * d,
			A = c * c * f + e;
		if(angle){
			if(mat != dest){
				dest[12] = mat[12]; dest[13] = mat[13];
				dest[14] = mat[14]; dest[15] = mat[15];
			}
		} else {
			dest = mat;
		}
		dest[0]  = g * s + k * t + o * u;
		dest[1]  = h * s + l * t + p * u;
		dest[2]  = i * s + m * t + q * u;
		dest[3]  = j * s + n * t + r * u;
		dest[4]  = g * v + k * w + o * x;
		dest[5]  = h * v + l * w + p * x;
		dest[6]  = i * v + m * w + q * x;
		dest[7]  = j * v + n * w + r * x;
		dest[8]  = g * y + k * z + o * A;
		dest[9]  = h * y + l * z + p * A;
		dest[10] = i * y + m * z + q * A;
		dest[11] = j * y + n * z + r * A;
		return dest;
	};
	this.lookAt = function(eye, center, up, dest){
		var eyeX    = eye[0],    eyeY    = eye[1],    eyeZ    = eye[2],
			upX     = up[0],     upY     = up[1],     upZ     = up[2],
			centerX = center[0], centerY = center[1], centerZ = center[2];
		if(eyeX == centerX && eyeY == centerY && eyeZ == centerZ){return this.identity(dest);}
		var x0, x1, x2, y0, y1, y2, z0, z1, z2, l;
		z0 = eyeX - center[0]; z1 = eyeY - center[1]; z2 = eyeZ - center[2];
		l = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
		z0 *= l; z1 *= l; z2 *= l;
		x0 = upY * z2 - upZ * z1;
		x1 = upZ * z0 - upX * z2;
		x2 = upX * z1 - upY * z0;
		l = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
		if(!l){
			x0 = 0; x1 = 0; x2 = 0;
		} else {
			l = 1 / l;
			x0 *= l; x1 *= l; x2 *= l;
		}
		y0 = z1 * x2 - z2 * x1; y1 = z2 * x0 - z0 * x2; y2 = z0 * x1 - z1 * x0;
		l = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
		if(!l){
			y0 = 0; y1 = 0; y2 = 0;
		} else {
			l = 1 / l;
			y0 *= l; y1 *= l; y2 *= l;
		}
		dest[0] = x0; dest[1] = y0; dest[2]  = z0; dest[3]  = 0;
		dest[4] = x1; dest[5] = y1; dest[6]  = z1; dest[7]  = 0;
		dest[8] = x2; dest[9] = y2; dest[10] = z2; dest[11] = 0;
		dest[12] = -(x0 * eyeX + x1 * eyeY + x2 * eyeZ);
		dest[13] = -(y0 * eyeX + y1 * eyeY + y2 * eyeZ);
		dest[14] = -(z0 * eyeX + z1 * eyeY + z2 * eyeZ);
		dest[15] = 1;
		return dest;
	};
	this.perspective = function(fovy, aspect, near, far, dest){
		var t = near * Math.tan(fovy * Math.PI / 360);
		var r = t * aspect;
		var a = r * 2, b = t * 2, c = far - near;
		dest[0]  = near * 2 / a;
		dest[1]  = 0;
		dest[2]  = 0;
		dest[3]  = 0;
		dest[4]  = 0;
		dest[5]  = near * 2 / b;
		dest[6]  = 0;
		dest[7]  = 0;
		dest[8]  = 0;
		dest[9]  = 0;
		dest[10] = -(far + near) / c;
		dest[11] = -1;
		dest[12] = 0;
		dest[13] = 0;
		dest[14] = -(far * near * 2) / c;
		dest[15] = 0;
		return dest;
	};
	this.ortho = function(left, right, top, bottom, near, far, dest) {
		var h = (right - left);
		var v = (top - bottom);
		var d = (far - near);
		dest[0]  = 2 / h;
		dest[1]  = 0;
		dest[2]  = 0;
		dest[3]  = 0;
		dest[4]  = 0;
		dest[5]  = 2 / v;
		dest[6]  = 0;
		dest[7]  = 0;
		dest[8]  = 0;
		dest[9]  = 0;
		dest[10] = -2 / d;
		dest[11] = 0;
		dest[12] = -(left + right) / h;
		dest[13] = -(top + bottom) / v;
		dest[14] = -(far + near) / d;
		dest[15] = 1;
		return dest;
	};
	this.transpose = function(mat, dest){
		dest[0]  = mat[0];  dest[1]  = mat[4];
		dest[2]  = mat[8];  dest[3]  = mat[12];
		dest[4]  = mat[1];  dest[5]  = mat[5];
		dest[6]  = mat[9];  dest[7]  = mat[13];
		dest[8]  = mat[2];  dest[9]  = mat[6];
		dest[10] = mat[10]; dest[11] = mat[14];
		dest[12] = mat[3];  dest[13] = mat[7];
		dest[14] = mat[11]; dest[15] = mat[15];
		return dest;
	};
	this.inverse = function(mat, dest){
		var a = mat[0],  b = mat[1],  c = mat[2],  d = mat[3],
			e = mat[4],  f = mat[5],  g = mat[6],  h = mat[7],
			i = mat[8],  j = mat[9],  k = mat[10], l = mat[11],
			m = mat[12], n = mat[13], o = mat[14], p = mat[15],
			q = a * f - b * e, r = a * g - c * e,
			s = a * h - d * e, t = b * g - c * f,
			u = b * h - d * f, v = c * h - d * g,
			w = i * n - j * m, x = i * o - k * m,
			y = i * p - l * m, z = j * o - k * n,
			A = j * p - l * n, B = k * p - l * o,
			ivd = 1 / (q * B - r * A + s * z + t * y - u * x + v * w);
		dest[0]  = ( f * B - g * A + h * z) * ivd;
		dest[1]  = (-b * B + c * A - d * z) * ivd;
		dest[2]  = ( n * v - o * u + p * t) * ivd;
		dest[3]  = (-j * v + k * u - l * t) * ivd;
		dest[4]  = (-e * B + g * y - h * x) * ivd;
		dest[5]  = ( a * B - c * y + d * x) * ivd;
		dest[6]  = (-m * v + o * s - p * r) * ivd;
		dest[7]  = ( i * v - k * s + l * r) * ivd;
		dest[8]  = ( e * A - f * y + h * w) * ivd;
		dest[9]  = (-a * A + b * y - d * w) * ivd;
		dest[10] = ( m * u - n * s + p * q) * ivd;
		dest[11] = (-i * u + j * s - l * q) * ivd;
		dest[12] = (-e * z + f * x - g * w) * ivd;
		dest[13] = ( a * z - b * x + c * w) * ivd;
		dest[14] = (-m * t + n * r - o * q) * ivd;
		dest[15] = ( i * t - j * r + k * q) * ivd;
		return dest;
	};
}

function qtnIV(){
	this.create = function(){
		return new Float32Array(4);
	};
	this.identity = function(dest){
		dest[0] = 0; dest[1] = 0; dest[2] = 0; dest[3] = 1;
		return dest;
	};
	this.inverse = function(qtn, dest){
		dest[0] = -qtn[0];
		dest[1] = -qtn[1];
		dest[2] = -qtn[2];
		dest[3] =  qtn[3];
		return dest;
	};
	this.normalize = function(dest){
		var x = dest[0], y = dest[1], z = dest[2], w = dest[3];
		var l = Math.sqrt(x * x + y * y + z * z + w * w);
		if(l === 0){
			dest[0] = 0;
			dest[1] = 0;
			dest[2] = 0;
			dest[3] = 0;
		}else{
			l = 1 / l;
			dest[0] = x * l;
			dest[1] = y * l;
			dest[2] = z * l;
			dest[3] = w * l;
		}
		return dest;
	};
	this.multiply = function(qtn1, qtn2, dest){
		var ax = qtn1[0], ay = qtn1[1], az = qtn1[2], aw = qtn1[3];
		var bx = qtn2[0], by = qtn2[1], bz = qtn2[2], bw = qtn2[3];
		dest[0] = ax * bw + aw * bx + ay * bz - az * by;
		dest[1] = ay * bw + aw * by + az * bx - ax * bz;
		dest[2] = az * bw + aw * bz + ax * by - ay * bx;
		dest[3] = aw * bw - ax * bx - ay * by - az * bz;
		return dest;
	};
	this.rotate = function(angle, axis, dest){
		var sq = Math.sqrt(axis[0] * axis[0] + axis[1] * axis[1] + axis[2] * axis[2]);
		if(!sq){return null;}
		var a = axis[0], b = axis[1], c = axis[2];
		if(sq != 1){sq = 1 / sq; a *= sq; b *= sq; c *= sq;}
		var s = Math.sin(angle * 0.5);
		dest[0] = a * s;
		dest[1] = b * s;
		dest[2] = c * s;
		dest[3] = Math.cos(angle * 0.5);
		return dest;
	};
	this.toVecIII = function(vec, qtn, dest){
		var qp = this.create();
		var qq = this.create();
		var qr = this.create();
		this.inverse(qtn, qr);
		qp[0] = vec[0];
		qp[1] = vec[1];
		qp[2] = vec[2];
		this.multiply(qr, qp, qq);
		this.multiply(qq, qtn, qr);
		dest[0] = qr[0];
		dest[1] = qr[1];
		dest[2] = qr[2];
		return dest;
	};
	this.toMatIV = function(qtn, dest){
		var x = qtn[0], y = qtn[1], z = qtn[2], w = qtn[3];
		var x2 = x + x, y2 = y + y, z2 = z + z;
		var xx = x * x2, xy = x * y2, xz = x * z2;
		var yy = y * y2, yz = y * z2, zz = z * z2;
		var wx = w * x2, wy = w * y2, wz = w * z2;
		dest[0]  = 1 - (yy + zz);
		dest[1]  = xy - wz;
		dest[2]  = xz + wy;
		dest[3]  = 0;
		dest[4]  = xy + wz;
		dest[5]  = 1 - (xx + zz);
		dest[6]  = yz - wx;
		dest[7]  = 0;
		dest[8]  = xz - wy;
		dest[9]  = yz + wx;
		dest[10] = 1 - (xx + yy);
		dest[11] = 0;
		dest[12] = 0;
		dest[13] = 0;
		dest[14] = 0;
		dest[15] = 1;
		return dest;
	};
	this.slerp = function(qtn1, qtn2, time, dest){
		var ht = qtn1[0] * qtn2[0] + qtn1[1] * qtn2[1] + qtn1[2] * qtn2[2] + qtn1[3] * qtn2[3];
		var hs = 1.0 - ht * ht;
		if(hs <= 0.0){
			dest[0] = qtn1[0];
			dest[1] = qtn1[1];
			dest[2] = qtn1[2];
			dest[3] = qtn1[3];
		}else{
			hs = Math.sqrt(hs);
			if(Math.abs(hs) < 0.0001){
				dest[0] = (qtn1[0] * 0.5 + qtn2[0] * 0.5);
				dest[1] = (qtn1[1] * 0.5 + qtn2[1] * 0.5);
				dest[2] = (qtn1[2] * 0.5 + qtn2[2] * 0.5);
				dest[3] = (qtn1[3] * 0.5 + qtn2[3] * 0.5);
			}else{
				var ph = Math.acos(ht);
				var pt = ph * time;
				var t0 = Math.sin(ph - pt) / hs;
				var t1 = Math.sin(pt) / hs;
				dest[0] = qtn1[0] * t0 + qtn2[0] * t1;
				dest[1] = qtn1[1] * t0 + qtn2[1] * t1;
				dest[2] = qtn1[2] * t0 + qtn2[2] * t1;
				dest[3] = qtn1[3] * t0 + qtn2[3] * t1;
			}
		}
		return dest;
	};
}

function torus(row, column, irad, orad, color){
	var i, j, tc;
	var pos = new Array(), nor = new Array(),
	    col = new Array(), st  = new Array(), idx = new Array();
	for(i = 0; i <= row; i++){
		var r = Math.PI * 2 / row * i;
		var rr = Math.cos(r);
		var ry = Math.sin(r);
		for(j = 0; j <= column; j++){
			var tr = Math.PI * 2 / column * j;
			var tx = (rr * irad + orad) * Math.cos(tr);
			var ty = ry * irad;
			var tz = (rr * irad + orad) * Math.sin(tr);
			var rx = rr * Math.cos(tr);
			var rz = rr * Math.sin(tr);
			if(color){
				tc = color;
			}else{
				tc = hsva(360 / column * j, 1, 1, 1);
			}
			var rs = 1 / column * j;
			var rt = 1 / row * i + 0.5;
			if(rt > 1.0){rt -= 1.0;}
			rt = 1.0 - rt;
			pos.push(tx, ty, tz);
			nor.push(rx, ry, rz);
			col.push(tc[0], tc[1], tc[2], tc[3]);
			st.push(rs, rt);
		}
	}
	for(i = 0; i < row; i++){
		for(j = 0; j < column; j++){
			r = (column + 1) * i + j;
			idx.push(r, r + column + 1, r + 1);
			idx.push(r + column + 1, r + column + 2, r + 1);
		}
	}
	return {p : pos, n : nor, c : col, t : st, i : idx};
}

function sphere(row, column, rad, color){
	var i, j, tc;
	var pos = new Array(), nor = new Array(),
	    col = new Array(), st  = new Array(), idx = new Array();
	for(i = 0; i <= row; i++){
		var r = Math.PI / row * i;
		var ry = Math.cos(r);
		var rr = Math.sin(r);
		for(j = 0; j <= column; j++){
			var tr = Math.PI * 2 / column * j;
			var tx = rr * rad * Math.cos(tr);
			var ty = ry * rad;
			var tz = rr * rad * Math.sin(tr);
			var rx = rr * Math.cos(tr);
			var rz = rr * Math.sin(tr);
			if(color){
				tc = color;
			}else{
				tc = hsva(360 / row * i, 1, 1, 1);
			}
			pos.push(tx, ty, tz);
			nor.push(rx, ry, rz);
			col.push(tc[0], tc[1], tc[2], tc[3]);
			st.push(1 - 1 / column * j, 1 / row * i);
		}
	}
	r = 0;
	for(i = 0; i < row; i++){
		for(j = 0; j < column; j++){
			r = (column + 1) * i + j;
			idx.push(r, r + 1, r + column + 2);
			idx.push(r, r + column + 2, r + column + 1);
		}
	}
	return {p : pos, n : nor, c : col, t : st, i : idx};
}

function cube(side, color){
	var tc, hs = side * 0.5;
	var pos = [
		-hs, -hs,  hs,  hs, -hs,  hs,  hs,  hs,  hs, -hs,  hs,  hs,
		-hs, -hs, -hs, -hs,  hs, -hs,  hs,  hs, -hs,  hs, -hs, -hs,
		-hs,  hs, -hs, -hs,  hs,  hs,  hs,  hs,  hs,  hs,  hs, -hs,
		-hs, -hs, -hs,  hs, -hs, -hs,  hs, -hs,  hs, -hs, -hs,  hs,
		 hs, -hs, -hs,  hs,  hs, -hs,  hs,  hs,  hs,  hs, -hs,  hs,
		-hs, -hs, -hs, -hs, -hs,  hs, -hs,  hs,  hs, -hs,  hs, -hs
	];
	var nor = [
		-1.0, -1.0,  1.0,  1.0, -1.0,  1.0,  1.0,  1.0,  1.0, -1.0,  1.0,  1.0,
		-1.0, -1.0, -1.0, -1.0,  1.0, -1.0,  1.0,  1.0, -1.0,  1.0, -1.0, -1.0,
		-1.0,  1.0, -1.0, -1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0, -1.0,
		-1.0, -1.0, -1.0,  1.0, -1.0, -1.0,  1.0, -1.0,  1.0, -1.0, -1.0,  1.0,
		 1.0, -1.0, -1.0,  1.0,  1.0, -1.0,  1.0,  1.0,  1.0,  1.0, -1.0,  1.0,
		-1.0, -1.0, -1.0, -1.0, -1.0,  1.0, -1.0,  1.0,  1.0, -1.0,  1.0, -1.0
	];
	var col = new Array();
	for(var i = 0; i < pos.length / 3; i++){
		if(color){
			tc = color;
		}else{
			tc = hsva(360 / pos.length / 3 * i, 1, 1, 1);
		}
		col.push(tc[0], tc[1], tc[2], tc[3]);
	}
	var st = [
		0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
		0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
		0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
		0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
		0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
		0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0
	];
	var idx = [
		 0,  1,  2,  0,  2,  3,
		 4,  5,  6,  4,  6,  7,
		 8,  9, 10,  8, 10, 11,
		12, 13, 14, 12, 14, 15,
		16, 17, 18, 16, 18, 19,
		20, 21, 22, 20, 22, 23
	];
	return {p : pos, n : nor, c : col, t : st, i : idx};
}

function hsva(h, s, v, a){
	if(s > 1 || v > 1 || a > 1){return;}
	var th = h % 360;
	var i = Math.floor(th / 60);
	var f = th / 60 - i;
	var m = v * (1 - s);
	var n = v * (1 - s * f);
	var k = v * (1 - s * (1 - f));
	var color = new Array();
	if(!s > 0 && !s < 0){
		color.push(v, v, v, a); 
	} else {
		var r = new Array(v, n, m, m, k, v);
		var g = new Array(k, v, v, n, m, m);
		var b = new Array(m, m, k, v, v, n);
		color.push(r[i], g[i], b[i], a);
	}
	return color;
}
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


/*-----------------------------------------------------
* Stage
-----------------------------------------------------*/
var Lighting = function( i_position ) {

  Lighting._position = i_position

  this._init.apply( this );

}
Lighting.prototype = {

  //-------------------------------------------------
  // initialize
  //-------------------------------------------------
  _init : function() {

    lightPosition = Lighting._position;

  }

}



/*-----------------------------------------------------
* Camera
-----------------------------------------------------*/
var Camera = function( i_eye, i_center, i_up, i_angle, i_viewMin, i_viewMax ) {

  this._eye = i_eye;
  this._center = i_center;
  this._up = i_up;
  this._angle = i_angle;
  this._viewMin = i_viewMin;
  this._viewMax = i_viewMax;


  this._init.apply( this );

}
Camera.prototype = {

  //-------------------------------------------------
  // initialize
  //-------------------------------------------------
  _init : function() {

    // ビュー座標変換行列
    MatrixIdentity.matrix.lookAt( this._eye, this._center, this._up, MatrixIdentity.vMatrix);

    // プロジェクション座標変換行列
    MatrixIdentity.matrix.perspective( this._angle, KoumeGL.canvas.width / KoumeGL.canvas.height, this._viewMin, this._viewMax, MatrixIdentity.pMatrix );

    // 各行列を掛け合わせ座標変換行列
    MatrixIdentity.matrix.multiply( MatrixIdentity.pMatrix, MatrixIdentity.vMatrix, MatrixIdentity.vpMatrix );

  },

}

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

  },

  //-------------------------------------------------
  // image texture
  //-------------------------------------------------
  fromImage : function( i_data ) {

    var tex = KoumeGL.gl.createTexture();
    var img = new Image();

    img.src = i_data;

    KoumeGL.gl.activeTexture( KoumeGL.gl.TEXTURE0 );
    // テクスチャをバインドする
    KoumeGL.gl.bindTexture( KoumeGL.gl.TEXTURE_2D, tex );

    // テクスチャへイメージを適用
    KoumeGL.gl.texImage2D( KoumeGL.gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img );

    // ミップマップを生成
    KoumeGL.gl.generateMipmap( KoumeGL.gl.TEXTURE_2D );

    // テクスチャのバインドを無効化
    KoumeGL.gl.bindTexture( KoumeGL.gl.TEXTURE_2D, null );

    return tex;

  }

}

/*-----------------------------------------------------
* Render
-----------------------------------------------------*/
var Render = function( i_ambient, i_position, i_center, i_data ) {

  this._count = 0;
  this._count2 = 0;
  this._rad = 0;

  this._ambientColor = i_ambient;
  this._eyePosition = i_position;
  this._centerPoint = i_center;
  this._position = i_data;

  this._update.apply( this );

}
Render.prototype = {

  //-------------------------------------------------
  // update
  //-------------------------------------------------
  _update : function() {

    // カウンタのインクリメント
    this._count++;

    // アニメーション用にカウンタからラジアンを計算
    this._rad = (this._count % 360) * window.PI;

    // canvas の色と深度値を初期化
    KoumeGL.gl.clear( KoumeGL.gl.COLOR_BUFFER_BIT | KoumeGL.gl.DEPTH_BUFFER_BIT );

    this._bind();

    // コンテキストの再描画
    KoumeGL.gl.flush();

    // フラグをチェックしてアニメーション
    if( run ){ window.requestAnimationFrame( this._update.bind( this ) ); }

  },

  //-------------------------------------------------
  // bind
  //-------------------------------------------------
  _bind : function() {

    // uniformLocationへ座標変換行列を登録
    KoumeGL.gl.uniformMatrix4fv(KoumeGL.buffer.uniLocationMvpMatrix, false, MatrixIdentity.mvpMatrix);
    KoumeGL.gl.uniformMatrix4fv(KoumeGL.buffer.uniLocationInvMatrix, false, MatrixIdentity.invMatrix);
    KoumeGL.gl.uniform3fv(KoumeGL.buffer.uniLocationLightPosition, lightPosition);
    KoumeGL.gl.uniform3fv(KoumeGL.buffer.uniLocationAmbientColor, this._ambientColor);
    KoumeGL.gl.uniform3fv(KoumeGL.buffer.uniLocationEyePosition, this._eyePosition);
    KoumeGL.gl.uniform3fv(KoumeGL.buffer.uniLocationCenterPoint, this._centerPoint);
    KoumeGL.gl.uniformMatrix4fv(KoumeGL.buffer.uniLocationMMatrix, false, MatrixIdentity.mMatrix);
    KoumeGL.gl.uniform1i(KoumeGL.buffer.uniLocationTextureUnit, 0);

    // モデルの描画
    KoumeGL.gl.drawElements(KoumeGL.gl.TRIANGLES, MatrixIdentity.index.length, KoumeGL.gl.UNSIGNED_SHORT, 0);

  }

}

/*-----------------------------------------------------
* Sprites
-----------------------------------------------------*/
var Sprites = function() {

  this._texture;
  this._animation;
  this._modelLength

  this._run.apply( this );

}
Sprites.prototype = {

  //-------------------------------------------------
  // initialize
  //-------------------------------------------------
  _init : function() {

    // テクスチャを指定
    Texture.fromImage("kotori.jpg");

    this.update();

  },

  //-------------------------------------------------
  // draw
  //-------------------------------------------------
  update : function( i_num ) {

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
* Sprites
-----------------------------------------------------*/

/*-----------------------------------------------------
* TractabilityMouse
-----------------------------------------------------*/
var TractabilityMouse = function() {

  this._init.apply( this );

}
TractabilityMouse.prototype = {

  //-------------------------------------------------
  // initialize
  //-------------------------------------------------
  _init : function() {

  }

}
