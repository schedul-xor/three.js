goog.provide('THREE.OrthographicCamera');

goog.require('THREE.Camera');



/**
 * @constructor
 * @extends {!THREE.Camera}
 * @param {number} left
 * @param {number} right
 * @param {number} top
 * @param {number} bottom
 * @param {number} near
 * @param {number} far
 * @author alteredq / http://alteredqualia.com/
 */
THREE.OrthographicCamera = function ( left, right, top, bottom, near, far ) {
    goog.base(this);

	this.left = left;
	this.right = right;
	this.top = top;
	this.bottom = bottom;

	this.near = ( near !== undefined ) ? near : 0.1;
	this.far = ( far !== undefined ) ? far : 2000;

	this.updateProjectionMatrix();
};
goog.inherits(THREE.OrthographicCamera,THREE.Camera);


/**
 *
 */
THREE.OrthographicCamera.prototype.updateProjectionMatrix = function () {
	this.projectionMatrix.makeOrthographic( this.left, this.right, this.top, this.bottom, this.near, this.far );
};


/**
 *
 */
THREE.OrthographicCamera.prototype.clone = function () {
	var camera = new THREE.OrthographicCamera();

	THREE.Camera.prototype.clone.call( this, camera );

	camera.left = this.left;
	camera.right = this.right;
	camera.top = this.top;
	camera.bottom = this.bottom;
	
	camera.near = this.near;
	camera.far = this.far;

	return camera;
};
