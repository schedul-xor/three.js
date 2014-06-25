goog.provide('THREE.Camera');

goog.require('THREE.Matrix4');
goog.require('THREE.Object3D');



/**
 * @constructor
 * @author mrdoob / http://mrdoob.com/
 * @author mikael emtinger / http://gomo.se/
 * @author WestLangley / http://github.com/WestLangley
*/
THREE.Camera = function () {
    goog.base(this);
	this.matrixWorldInverse = new THREE.Matrix4();
	this.projectionMatrix = new THREE.Matrix4();
};
goog.inherits(THREE.Camera,THREE.Object3D);



/**
 *
 */
THREE.Camera.prototype.lookAt = function () {
	// This routine does not support cameras with rotated and/or translated parent(s)

	var m1 = new THREE.Matrix4();

	return function ( vector ) {

		m1.lookAt( this.position, vector, this.up );

		this.quaternion.setFromRotationMatrix( m1 );

	};
}();


/**
 * @param {!THREE.Camera} camera
 */
THREE.Camera.prototype.clone = function (camera) {
	if ( camera === undefined ) camera = new THREE.Camera();

	THREE.Object3D.prototype.clone.call( this, camera );

	camera.matrixWorldInverse.copy( this.matrixWorldInverse );
	camera.projectionMatrix.copy( this.projectionMatrix );

	return camera;
};
