goog.provide('THREE.Gryoscope');

goog.require('THREE.Object3D');



/**
 * @constructor
 * @extends {THREE.Object3D}
 * @author alteredq / http://alteredqualia.com/
 */
THREE.Gyroscope = function () {
	goog.base(this);
};
goog.inherits(THREE.Gyroscope,THREE.Object3D);


/**
 * @param {!boolean} force
 */
THREE.Gyroscope.prototype.updateMatrixWorld = function ( force ) {
	this.matrixAutoUpdate && this.updateMatrix();

	// update matrixWorld

	if ( this.matrixWorldNeedsUpdate || force ) {

		if ( this.parent ) {

			this.matrixWorld.multiplyMatrices( this.parent.matrixWorld, this.matrix );

			this.matrixWorld.decompose( this.translationWorld, this.quaternionWorld, this.scaleWorld );
			this.matrix.decompose( this.translationObject, this.quaternionObject, this.scaleObject );

			this.matrixWorld.compose( this.translationWorld, this.quaternionObject, this.scaleWorld );


		} else {

			this.matrixWorld.copy( this.matrix );

		}


		this.matrixWorldNeedsUpdate = false;

		force = true;

	}

	// update children

	for ( var i = 0, l = this.children.length; i < l; i ++ ) {

		this.children[ i ].updateMatrixWorld( force );

	}
};


/**
 * @type {!THREE.Vector3}
 */
THREE.Gyroscope.prototype.translationWorld = new THREE.Vector3();


/**
 * @type {!THREE.Vector3}
 */
THREE.Gyroscope.prototype.translationObject = new THREE.Vector3();


/**
 * @type {!THREE.Quaternion}
 */
THREE.Gyroscope.prototype.quaternionWorld = new THREE.Quaternion();


/**
 * @type {!THREE.Quaternion}
 */
THREE.Gyroscope.prototype.quaternionObject = new THREE.Quaternion();


/**
 * @type {!THREE.Vector3}
 */
THREE.Gyroscope.prototype.scaleWorld = new THREE.Vector3();


/**
 * @type {!THREE.Vector3}
 */
THREE.Gyroscope.prototype.scaleObject = new THREE.Vector3();
