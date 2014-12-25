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
