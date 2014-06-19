goog.provide('THREE.Fog');

goog.require('THREE.Color');



/**
 * @constructor
 * @param {!THREE.Color} color
 * @param {!number} near
 * @param {!number} far
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */
THREE.Fog = function ( color, near, far ) {
	this.name = '';

	this.color = new THREE.Color( color );

	this.near = ( near !== undefined ) ? near : 1;
	this.far = ( far !== undefined ) ? far : 1000;
};


/**
 * @return {!THREE.Fog}
 */
THREE.Fog.prototype.clone = function () {
	return new THREE.Fog( this.color.getHex(), this.near, this.far );
};
