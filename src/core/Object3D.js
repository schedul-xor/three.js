goog.provide('THREE.Object3D');

goog.require('THREE.Matrix4');
goog.require('THREE.Quaternion');
goog.require('THREE.Vector3');



/**
 * @constructor
 * @author mrdoob / http://mrdoob.com/
 * @author mikael emtinger / http://gomo.se/
 * @author alteredq / http://alteredqualia.com/
 * @author WestLangley / http://github.com/WestLangley
 */
THREE.Object3D = function () {
	this.id = THREE.Object3DIdCount ++;
	this.uuid = THREE.Math.generateUUID();

	this.name = '';

	this.parent = undefined;
	this.children = [];

	this.up = new THREE.Vector3( 0, 1, 0 );

	this.position = new THREE.Vector3();

	var scope = this;

	Object.defineProperties( this, {
		rotation: {
			enumerable: true,
			value: new THREE.Euler().onChange( function () {
				scope.quaternion.setFromEuler( scope.rotation, false );
			} )
		},
		quaternion: {
			enumerable: true,
			value: new THREE.Quaternion().onChange( function () {
				scope.rotation.setFromQuaternion( scope.quaternion, undefined, false );
			} )
		},
		scale: {
			enumerable: true,
			value: new THREE.Vector3( 1, 1, 1 )
		}
	} );

	this.renderDepth = null;

	this.rotationAutoUpdate = true;

	this.matrix = new THREE.Matrix4();
	this.matrixWorld = new THREE.Matrix4();

	this.matrixAutoUpdate = true;
	this.matrixWorldNeedsUpdate = false;

	this.visible = true;

	this.castShadow = false;
	this.receiveShadow = false;

	this.frustumCulled = true;

	this.userData = {};
};


/**
 *
 */
THREE.Object3D.prototype.getEulerOrder =function() {
		console.warn( 'DEPRECATED: Object3D\'s .eulerOrder has been moved to Object3D\'s .rotation.order.' );

		return this.rotation.order;
};


/**
 * @param {!*} value
 */
THREE.Object3D.prototype.setEulerOrder =function( value ) {
		console.warn( 'DEPRECATED: Object3D\'s .eulerOrder has been moved to Object3D\'s .rotation.order.' );

		this.rotation.order = value;
};


/**
 * 
 */
THREE.Object3D.prototype.getUseQuaternion =function() {
		console.warn( 'DEPRECATED: Object3D\'s .useQuaternion has been removed. The library now uses quaternions by default.' );
};


/**
 * @param {!*} value
 */
THREE.Object3D.prototype.setUseQuaternion =function( value ) {
		console.warn( 'DEPRECATED: Object3D\'s .useQuaternion has been removed. The library now uses quaternions by default.' );
};


/**
 * @param {!THREE.Matrix} matrix
 */
THREE.Object3D.prototype.applyMatrix = function ( matrix ) {
		this.matrix.multiplyMatrices( matrix, this.matrix );

		this.matrix.decompose( this.position, this.quaternion, this.scale );
};


/**
 * @param {!number} axis
 * @param {!number} angle
 */
THREE.Object3D.prototype.setRotationFromAxisAngle = function ( axis, angle ) {
		// assumes axis is normalized
		this.quaternion.setFromAxisAngle( axis, angle );
};


/**
 * @param {!number} euler
 */
THREE.Object3D.prototype.setRotationFromEuler = function ( euler ) {
		this.quaternion.setFromEuler( euler, true );
};


/**
 * @param {!THREE.Matrix4} m
 */
THREE.Object3D.prototype.setRotationFromMatrix = function ( m ) {
		// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

		this.quaternion.setFromRotationMatrix( m );
};


/**
 * @param {!THREE.Quaternion} q
 */
THREE.Object3D.prototype.setRotationFromQuaternion = function ( q ) {
		// assumes q is normalized

		this.quaternion.copy( q );
};


/**
 *
 */
THREE.Object3D.prototype.rotateOnAxis = function() {
		// rotate object on axis in object space
		// axis is assumed to be normalized

		var q1 = new THREE.Quaternion();

		return function ( axis, angle ) {

			q1.setFromAxisAngle( axis, angle );

			this.quaternion.multiply( q1 );

			return this;

		};
}();


/**
 *
 */
THREE.Object3D.prototype.rotateX = function () {
		var v1 = new THREE.Vector3( 1, 0, 0 );

		return function ( angle ) {

			return this.rotateOnAxis( v1, angle );

		};
}();


/**
 *
 */
THREE.Object3D.prototype.rotateY = function () {
		var v1 = new THREE.Vector3( 0, 1, 0 );

		return function ( angle ) {

			return this.rotateOnAxis( v1, angle );

		};
}();


/**
 *
 */
THREE.Object3D.prototype.rotateZ = function () {
		var v1 = new THREE.Vector3( 0, 0, 1 );

		return function ( angle ) {

			return this.rotateOnAxis( v1, angle );

		};
}();


/**
 *
 */
THREE.Object3D.prototype.translateOnAxis = function () {
		// translate object by distance along axis in object space
		// axis is assumed to be normalized

		var v1 = new THREE.Vector3();

		return function ( axis, distance ) {

			v1.copy( axis );

			v1.applyQuaternion( this.quaternion );

			this.position.add( v1.multiplyScalar( distance ) );

			return this;

		};
}();


/**
 *
 */
THREE.Object3D.prototype.translate = function ( distance, axis ) {
		console.warn( 'DEPRECATED: Object3D\'s .translate() has been removed. Use .translateOnAxis( axis, distance ) instead. Note args have been changed.' );
		return this.translateOnAxis( axis, distance );
};


/**
 *
 */
THREE.Object3D.prototype.translateX = function () {
		var v1 = new THREE.Vector3( 1, 0, 0 );

		return function ( distance ) {

			return this.translateOnAxis( v1, distance );

		};
}();


/**
 *
 */
THREE.Object3D.prototype.translateY = function () {
		var v1 = new THREE.Vector3( 0, 1, 0 );

		return function ( distance ) {

			return this.translateOnAxis( v1, distance );

		};
}();


/**
 *
 */
THREE.Object3D.prototype.translateZ = function () {
		var v1 = new THREE.Vector3( 0, 0, 1 );

		return function ( distance ) {

			return this.translateOnAxis( v1, distance );

		};
}();


/**
 *
 */
THREE.Object3D.prototype.localToWorld = function ( vector ) {

		return vector.applyMatrix4( this.matrixWorld );

};


/**
 *
 */
THREE.Object3D.prototype.worldToLocal = function () {
		var m1 = new THREE.Matrix4();

		return function ( vector ) {

			return vector.applyMatrix4( m1.getInverse( this.matrixWorld ) );

		};
}();


/**
 *
 */
THREE.Object3D.prototype.lookAt = function () {
		// This routine does not support objects with rotated and/or translated parent(s)

		var m1 = new THREE.Matrix4();

		return function ( vector ) {

			m1.lookAt( vector, this.position, this.up );

			this.quaternion.setFromRotationMatrix( m1 );

		};
}();


/**
 *
 */
THREE.Object3D.prototype.add = function ( object ) {
		if ( object === this ) {

			console.warn( 'THREE.Object3D.add: An object can\'t be added as a child of itself.' );
			return;

		}

		if ( object instanceof THREE.Object3D ) {

			if ( object.parent !== undefined ) {

				object.parent.remove( object );

			}

			object.parent = this;
			object.dispatchEvent( { type: 'added' } );

			this.children.push( object );

			// add to scene

			var scene = this;

			while ( scene.parent !== undefined ) {

				scene = scene.parent;

			}

			if ( scene !== undefined && scene instanceof THREE.Scene )  {

				scene.__addObject( object );

			}

		}
};


/**
 *
 */
THREE.Object3D.prototype.remove = function ( object ) {
		var index = this.children.indexOf( object );

		if ( index !== - 1 ) {

			object.parent = undefined;
			object.dispatchEvent( { type: 'removed' } );

			this.children.splice( index, 1 );

			// remove from scene

			var scene = this;

			while ( scene.parent !== undefined ) {

				scene = scene.parent;

			}

			if ( scene !== undefined && scene instanceof THREE.Scene ) {

				scene.__removeObject( object );

			}

		}
};


/**
 *
 */
THREE.Object3D.prototype.traverse = function ( callback ) {
		callback( this );

		for ( var i = 0, l = this.children.length; i < l; i ++ ) {

			this.children[ i ].traverse( callback );

		}
};


/**
 *
 */
THREE.Object3D.prototype.getObjectById = function ( id, recursive ) {
		for ( var i = 0, l = this.children.length; i < l; i ++ ) {

			var child = this.children[ i ];

			if ( child.id === id ) {

				return child;

			}

			if ( recursive === true ) {

				child = child.getObjectById( id, recursive );

				if ( child !== undefined ) {

					return child;

				}

			}

		}

		return undefined;
};


/**
 *
 */
THREE.Object3D.prototype.getObjectByName = function ( name, recursive ) {
		for ( var i = 0, l = this.children.length; i < l; i ++ ) {

			var child = this.children[ i ];

			if ( child.name === name ) {

				return child;

			}

			if ( recursive === true ) {

				child = child.getObjectByName( name, recursive );

				if ( child !== undefined ) {

					return child;

				}

			}

		}

		return undefined;
};


/**
 *
 */
THREE.Object3D.prototype.getChildByName = function ( name, recursive ) {
		console.warn( 'DEPRECATED: Object3D\'s .getChildByName() has been renamed to .getObjectByName().' );
		return this.getObjectByName( name, recursive );
};


/**
 *
 */
THREE.Object3D.prototype.getDescendants = function ( array ) {
		if ( array === undefined ) array = [];

		Array.prototype.push.apply( array, this.children );

		for ( var i = 0, l = this.children.length; i < l; i ++ ) {

			this.children[ i ].getDescendants( array );

		}

		return array;
};


/**
 *
 */
THREE.Object3D.prototype.updateMatrix = function () {
		this.matrix.compose( this.position, this.quaternion, this.scale );

		this.matrixWorldNeedsUpdate = true;
};


/**
 *
 */
THREE.Object3D.prototype.updateMatrixWorld = function ( force ) {
		if ( this.matrixAutoUpdate === true ) this.updateMatrix();

		if ( this.matrixWorldNeedsUpdate === true || force === true ) {

			if ( this.parent === undefined ) {

				this.matrixWorld.copy( this.matrix );

			} else {

				this.matrixWorld.multiplyMatrices( this.parent.matrixWorld, this.matrix );

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
 *
 */
THREE.Object3D.prototype.clone = function ( object, recursive ) {
		if ( object === undefined ) object = new THREE.Object3D();
		if ( recursive === undefined ) recursive = true;

		object.name = this.name;

		object.up.copy( this.up );

		object.position.copy( this.position );
		object.quaternion.copy( this.quaternion );
		object.scale.copy( this.scale );

		object.renderDepth = this.renderDepth;

		object.rotationAutoUpdate = this.rotationAutoUpdate;

		object.matrix.copy( this.matrix );
		object.matrixWorld.copy( this.matrixWorld );

		object.matrixAutoUpdate = this.matrixAutoUpdate;
		object.matrixWorldNeedsUpdate = this.matrixWorldNeedsUpdate;

		object.visible = this.visible;

		object.castShadow = this.castShadow;
		object.receiveShadow = this.receiveShadow;

		object.frustumCulled = this.frustumCulled;

		object.userData = JSON.parse( JSON.stringify( this.userData ) );

		if ( recursive === true ) {

			for ( var i = 0; i < this.children.length; i ++ ) {

				var child = this.children[ i ];
				object.add( child.clone() );

			}

		}

		return object;
};


THREE.EventDispatcher.prototype.apply( THREE.Object3D.prototype );

THREE.Object3DIdCount = 0;
