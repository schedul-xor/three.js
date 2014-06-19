goog.provide('THREE.FogExp2');

goog.require('THREE.Color');



/**
 * @constructor
 * @param {!THREE.Color} color
 * @param {!number} density
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */
THREE.FogExp2 = function ( color, density ) {
	this.name = '';

	this.color = new THREE.Color( color );
	this.density = ( density !== undefined ) ? density : 0.00025;
};


/**
 * @return {!THREE.FogExp2}
 */
THREE.FogExp2.prototype.clone = function () {
	return new THREE.FogExp2( this.color.getHex(), this.density );
};
