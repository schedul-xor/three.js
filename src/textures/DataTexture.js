goog.provide('Three.DataTexture');

goog.require('Three.Texture');



/**
 * @constructor
 * @extends {THREE.Texture}
 * @author alteredq / http://alteredqualia.com/
 */
THREE.DataTexture = function ( data, width, height, format, type, mapping, wrapS, wrapT, magFilter, minFilter, anisotropy ) {
	goog.base( this, null, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy );

	this.image = { data: data, width: width, height: height };
};
goog.inherits(THREE.DataTexture,THREE.Texture);


/**
 * @return {!THREE.Texture}
 */
THREE.DataTexture.prototype.clone = function () {
	var texture = new THREE.DataTexture();

	THREE.Texture.prototype.clone.call( this, texture );

	return texture;
};
