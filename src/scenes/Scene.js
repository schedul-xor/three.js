goog.provide('THREE.Scene');

goog.require('THREE.Object3D');



/**
 * @author mrdoob / http://mrdoob.com/
 */
THREE.Scene = function () {
	THREE.Object3D.call( this );

	this.fog = null;
	this.overrideMaterial = null;

	this.autoUpdate = true; // checked by the renderer
	this.matrixAutoUpdate = false;

	this.__lights = [];

	this.__objectsAdded = [];
	this.__objectsRemoved = [];
};
goog.inherits(THREE.Scene,THREE.Object3D);


/**
 * @private
 * @param {!*} object
 */
THREE.Scene.prototype.addObject_ = function ( object ) {
	if ( object instanceof THREE.Light ) {

		if ( this.__lights.indexOf( object ) === - 1 ) {

			this.__lights.push( object );

		}

		if ( object.target && object.target.parent === undefined ) {

			this.add( object.target );

		}

	} else if ( !( object instanceof THREE.Camera || object instanceof THREE.Bone ) ) {

		this.__objectsAdded.push( object );

		// check if previously removed

		var i = this.__objectsRemoved.indexOf( object );

		if ( i !== -1 ) {

			this.__objectsRemoved.splice( i, 1 );

		}

	}

	this.dispatchEvent( { type: 'objectAdded', object: object } );
	object.dispatchEvent( { type: 'addedToScene', scene: this } );

	for ( var c = 0; c < object.children.length; c ++ ) {

		this.addObject_( object.children[ c ] );

	}
};


/**
 * @private
 * @param {!*} object
 */
THREE.Scene.prototype.removeObject_ = function ( object ) {
	if ( object instanceof THREE.Light ) {

		var i = this.__lights.indexOf( object );

		if ( i !== -1 ) {

			this.__lights.splice( i, 1 );

		}

		if ( object.shadowCascadeArray ) {

			for ( var x = 0; x < object.shadowCascadeArray.length; x ++ ) {

				this.removeObject_( object.shadowCascadeArray[ x ] );

			}

		}

	} else if ( !( object instanceof THREE.Camera ) ) {

		this.__objectsRemoved.push( object );

		// check if previously added

		var i = this.__objectsAdded.indexOf( object );

		if ( i !== -1 ) {

			this.__objectsAdded.splice( i, 1 );

		}

	}

	this.dispatchEvent( { type: 'objectRemoved', object: object } );
	object.dispatchEvent( { type: 'removedFromScene', scene: this } );

	for ( var c = 0; c < object.children.length; c ++ ) {

		this.removeObject_( object.children[ c ] );

	}
};


/**
 *
 */
THREE.Scene.prototype.clone = function ( object ) {
	if ( object === undefined ) object = new THREE.Scene();

	THREE.Object3D.prototype.clone.call(this, object);

	if ( this.fog !== null ) object.fog = this.fog.clone();
	if ( this.overrideMaterial !== null ) object.overrideMaterial = this.overrideMaterial.clone();

	object.autoUpdate = this.autoUpdate;
	object.matrixAutoUpdate = this.matrixAutoUpdate;

	return object;
};
