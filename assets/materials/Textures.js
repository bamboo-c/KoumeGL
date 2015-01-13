/*-----------------------------------------------------
* Textures
-----------------------------------------------------*/
var Textures = function( i_data, i_length ) {

  this._src = i_data;
  this._length = i_length;

  this._init.apply( this );

}
Textures.prototype = {

  //-------------------------------------------------
  // initialize
  //-------------------------------------------------
  _init : function() {

    this._createTex();

  },

  //-------------------------------------------------
  // create texture
  //-------------------------------------------------
  _createTex : function() {


}
