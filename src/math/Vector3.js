goog.provide('THREE.Vector3');



/**
 * @constructor
 * @param {!number} x
 * @param {!number} y
 * @param {!number} z
 * @author mrdoob / http://mrdoob.com/
 * @author *kile / http://kile.stravaganza.org/
 * @author philogb / http://blog.thejit.org/
 * @author mikael emtinger / http://gomo.se/
 * @author egraether / http://egraether.com/
 * @author WestLangley / http://github.com/WestLangley
 */
THREE.Vector3 = function ( x, y, z ) {
	this.x = x || 0;
	this.y = y || 0;
	this.z = z || 0;
};
 
THREE.Vector3.prototype.set = function ( x, y, z ) {
		this.x = x;
		this.y = y;
		this.z = z;

		return this;
};

THREE.Vector3.prototype.setX = function ( x ) {
		this.x = x;

		return this;
};

THREE.Vector3.prototype.setY = function ( y ) {
		this.y = y;

		return this;
};

THREE.Vector3.prototype.setZ = function ( z ) {
		this.z = z;

		return this;
};

THREE.Vector3.prototype.setComponent = function ( index, value ) {
		switch ( index ) {

			case 0: this.x = value; break;
			case 1: this.y = value; break;
			case 2: this.z = value; break;
			default: throw new Error( "index is out of range: " + index );

		}
};

THREE.Vector3.prototype.getComponent = function ( index ) {
		switch ( index ) {

			case 0: return this.x;
			case 1: return this.y;
			case 2: return this.z;
			default: throw new Error( "index is out of range: " + index );

		}
};

THREE.Vector3.prototype.copy = function ( v ) {
		this.x = v.x;
		this.y = v.y;
		this.z = v.z;

		return this;
};

THREE.Vector3.prototype.add = function ( v, w ) {
		if ( w !== undefined ) {

			console.warn( 'DEPRECATED: Vector3\'s .add() now only accepts one argument. Use .addVectors( a, b ) instead.' );
			return this.addVectors( v, w );

		}

		this.x += v.x;
		this.y += v.y;
		this.z += v.z;

		return this;
};

THREE.Vector3.prototype.addScalar = function ( s ) {
		this.x += s;
		this.y += s;
		this.z += s;

		return this;
};

THREE.Vector3.prototype.addVectors = function ( a, b ) {

		this.x = a.x + b.x;
		this.y = a.y + b.y;
		this.z = a.z + b.z;

		return this;

};

THREE.Vector3.prototype.sub = function ( v, w ) {
		if ( w !== undefined ) {

			console.warn( 'DEPRECATED: Vector3\'s .sub() now only accepts one argument. Use .subVectors( a, b ) instead.' );
			return this.subVectors( v, w );

		}

		this.x -= v.x;
		this.y -= v.y;
		this.z -= v.z;

		return this;
};

THREE.Vector3.prototype.subVectors = function ( a, b ) {
		this.x = a.x - b.x;
		this.y = a.y - b.y;
		this.z = a.z - b.z;

		return this;
};

THREE.Vector3.prototype.multiply = function ( v, w ) {
		if ( w !== undefined ) {

			console.warn( 'DEPRECATED: Vector3\'s .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead.' );
			return this.multiplyVectors( v, w );

		}

		this.x *= v.x;
		this.y *= v.y;
		this.z *= v.z;

		return this;
};

THREE.Vector3.prototype.multiplyScalar = function ( scalar ) {
		this.x *= scalar;
		this.y *= scalar;
		this.z *= scalar;

		return this;
};

THREE.Vector3.prototype.multiplyVectors = function ( a, b ) {
		this.x = a.x * b.x;
		this.y = a.y * b.y;
		this.z = a.z * b.z;

		return this;
};

THREE.Vector3.prototype.applyEuler = function () {
		var quaternion;

		return function ( euler ) {

			if ( euler instanceof THREE.Euler === false ) {

				console.error( 'ERROR: Vector3\'s .applyEuler() now expects a Euler rotation rather than a Vector3 and order.  Please update your code.' );

			}

			if ( quaternion === undefined ) quaternion = new THREE.Quaternion();

			this.applyQuaternion( quaternion.setFromEuler( euler ) );

			return this;

		};
}();

THREE.Vector3.prototype.applyAxisAngle = function () {
		var quaternion;

		return function ( axis, angle ) {

			if ( quaternion === undefined ) quaternion = new THREE.Quaternion();

			this.applyQuaternion( quaternion.setFromAxisAngle( axis, angle ) );

			return this;

		};
}();

THREE.Vector3.prototype.applyMatrix3 = function ( m ) {
		var x = this.x;
		var y = this.y;
		var z = this.z;

		var e = m.elements;

		this.x = e[0] * x + e[3] * y + e[6] * z;
		this.y = e[1] * x + e[4] * y + e[7] * z;
		this.z = e[2] * x + e[5] * y + e[8] * z;

		return this;
};

THREE.Vector3.prototype.applyMatrix4 = function ( m ) {
		// input: THREE.Matrix4 affine matrix

		var x = this.x, y = this.y, z = this.z;

		var e = m.elements;

		this.x = e[0] * x + e[4] * y + e[8]  * z + e[12];
		this.y = e[1] * x + e[5] * y + e[9]  * z + e[13];
		this.z = e[2] * x + e[6] * y + e[10] * z + e[14];

		return this;
};

THREE.Vector3.prototype.applyProjection = function ( m ) {
		// input: THREE.Matrix4 projection matrix

		var x = this.x, y = this.y, z = this.z;

		var e = m.elements;
		var d = 1 / ( e[3] * x + e[7] * y + e[11] * z + e[15] ); // perspective divide

		this.x = ( e[0] * x + e[4] * y + e[8]  * z + e[12] ) * d;
		this.y = ( e[1] * x + e[5] * y + e[9]  * z + e[13] ) * d;
		this.z = ( e[2] * x + e[6] * y + e[10] * z + e[14] ) * d;

		return this;
};

THREE.Vector3.prototype.applyQuaternion = function ( q ) {
		var x = this.x;
		var y = this.y;
		var z = this.z;

		var qx = q.x;
		var qy = q.y;
		var qz = q.z;
		var qw = q.w;

		// calculate quat * vector

		var ix =  qw * x + qy * z - qz * y;
		var iy =  qw * y + qz * x - qx * z;
		var iz =  qw * z + qx * y - qy * x;
		var iw = -qx * x - qy * y - qz * z;

		// calculate result * inverse quat

		this.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
		this.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
		this.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;

		return this;
};

THREE.Vector3.prototype.transformDirection = function ( m ) {
		// input: THREE.Matrix4 affine matrix
		// vector interpreted as a direction

		var x = this.x, y = this.y, z = this.z;

		var e = m.elements;

		this.x = e[0] * x + e[4] * y + e[8]  * z;
		this.y = e[1] * x + e[5] * y + e[9]  * z;
		this.z = e[2] * x + e[6] * y + e[10] * z;

		this.normalize();

		return this;
};

THREE.Vector3.prototype.divide = function ( v ) {
		this.x /= v.x;
		this.y /= v.y;
		this.z /= v.z;

		return this;
};

THREE.Vector3.prototype.divideScalar = function ( scalar ) {
		if ( scalar !== 0 ) {

			var invScalar = 1 / scalar;

			this.x *= invScalar;
			this.y *= invScalar;
			this.z *= invScalar;

		} else {

			this.x = 0;
			this.y = 0;
			this.z = 0;

		}

		return this;
};

THREE.Vector3.prototype.min = function ( v ) {
		if ( this.x > v.x ) {

			this.x = v.x;

		}

		if ( this.y > v.y ) {

			this.y = v.y;

		}

		if ( this.z > v.z ) {

			this.z = v.z;

		}

		return this;
};

THREE.Vector3.prototype.max = function ( v ) {
		if ( this.x < v.x ) {

			this.x = v.x;

		}

		if ( this.y < v.y ) {

			this.y = v.y;

		}

		if ( this.z < v.z ) {

			this.z = v.z;

		}

		return this;
};

THREE.Vector3.prototype.clamp = function ( min, max ) {
		// This function assumes min < max, if this assumption isn't true it will not operate correctly

		if ( this.x < min.x ) {

			this.x = min.x;

		} else if ( this.x > max.x ) {

			this.x = max.x;

		}

		if ( this.y < min.y ) {

			this.y = min.y;

		} else if ( this.y > max.y ) {

			this.y = max.y;

		}

		if ( this.z < min.z ) {

			this.z = min.z;

		} else if ( this.z > max.z ) {

			this.z = max.z;

		}

		return this;
};

THREE.Vector3.prototype.clampScalar = ( function () {
		var min, max;

		return function ( minVal, maxVal ) {

			if ( min === undefined ) {

				min = new THREE.Vector3();
				max = new THREE.Vector3();

			}

			min.set( minVal, minVal, minVal );
			max.set( maxVal, maxVal, maxVal );

			return this.clamp( min, max );

		};
} )();

THREE.Vector3.prototype.floor = function () {
		this.x = Math.floor( this.x );
		this.y = Math.floor( this.y );
		this.z = Math.floor( this.z );

		return this;
};

THREE.Vector3.prototype.ceil = function () {
		this.x = Math.ceil( this.x );
		this.y = Math.ceil( this.y );
		this.z = Math.ceil( this.z );

		return this;
};

THREE.Vector3.prototype.round = function () {
		this.x = Math.round( this.x );
		this.y = Math.round( this.y );
		this.z = Math.round( this.z );

		return this;
};

THREE.Vector3.prototype.roundToZero = function () {
		this.x = ( this.x < 0 ) ? Math.ceil( this.x ) : Math.floor( this.x );
		this.y = ( this.y < 0 ) ? Math.ceil( this.y ) : Math.floor( this.y );
		this.z = ( this.z < 0 ) ? Math.ceil( this.z ) : Math.floor( this.z );

		return this;
};

THREE.Vector3.prototype.negate = function () {
		return this.multiplyScalar( - 1 );
};

THREE.Vector3.prototype.dot = function ( v ) {
		return this.x * v.x + this.y * v.y + this.z * v.z;
};

THREE.Vector3.prototype.lengthSq = function () {
		return this.x * this.x + this.y * this.y + this.z * this.z;
};

THREE.Vector3.prototype.length = function () {
		return Math.sqrt( this.x * this.x + this.y * this.y + this.z * this.z );
};

THREE.Vector3.prototype.lengthManhattan = function () {
		return Math.abs( this.x ) + Math.abs( this.y ) + Math.abs( this.z );
};

THREE.Vector3.prototype.normalize = function () {
		return this.divideScalar( this.length() );
};

THREE.Vector3.prototype.setLength = function ( l ) {
		var oldLength = this.length();

		if ( oldLength !== 0 && l !== oldLength  ) {

			this.multiplyScalar( l / oldLength );
		}

		return this;
};

THREE.Vector3.prototype.lerp = function ( v, alpha ) {
		this.x += ( v.x - this.x ) * alpha;
		this.y += ( v.y - this.y ) * alpha;
		this.z += ( v.z - this.z ) * alpha;

		return this;
};

THREE.Vector3.prototype.cross = function ( v, w ) {
		if ( w !== undefined ) {

			console.warn( 'DEPRECATED: Vector3\'s .cross() now only accepts one argument. Use .crossVectors( a, b ) instead.' );
			return this.crossVectors( v, w );

		}

		var x = this.x, y = this.y, z = this.z;

		this.x = y * v.z - z * v.y;
		this.y = z * v.x - x * v.z;
		this.z = x * v.y - y * v.x;

		return this;
};

THREE.Vector3.prototype.crossVectors = function ( a, b ) {

		var ax = a.x, ay = a.y, az = a.z;
		var bx = b.x, by = b.y, bz = b.z;

		this.x = ay * bz - az * by;
		this.y = az * bx - ax * bz;
		this.z = ax * by - ay * bx;

		return this;
};

THREE.Vector3.prototype.projectOnVector = function () {
		var v1, dot;

		return function ( vector ) {

			if ( v1 === undefined ) v1 = new THREE.Vector3();

			v1.copy( vector ).normalize();

			dot = this.dot( v1 );

			return this.copy( v1 ).multiplyScalar( dot );

		};
}();

THREE.Vector3.prototype.projectOnPlane = function () {
		var v1;

		return function ( planeNormal ) {

			if ( v1 === undefined ) v1 = new THREE.Vector3();

			v1.copy( this ).projectOnVector( planeNormal );

			return this.sub( v1 );

		};
}();

THREE.Vector3.prototype.reflect = function () {

		// reflect incident vector off plane orthogonal to normal
		// normal is assumed to have unit length

		var v1;

		return function ( normal ) {

			if ( v1 === undefined ) v1 = new THREE.Vector3();

			return this.sub( v1.copy( normal ).multiplyScalar( 2 * this.dot( normal ) ) );

		};
}();

THREE.Vector3.prototype.angleTo = function ( v ) {
		var theta = this.dot( v ) / ( this.length() * v.length() );

		// clamp, to handle numerical problems

		return Math.acos( THREE.Math.clamp( theta, -1, 1 ) );
};

THREE.Vector3.prototype.distanceTo = function ( v ) {
		return Math.sqrt( this.distanceToSquared( v ) );
};

THREE.Vector3.prototype.distanceToSquared = function ( v ) {
		var dx = this.x - v.x;
		var dy = this.y - v.y;
		var dz = this.z - v.z;

		return dx * dx + dy * dy + dz * dz;
};

THREE.Vector3.prototype.setEulerFromRotationMatrix = function ( m, order ) {
		console.error( "REMOVED: Vector3\'s setEulerFromRotationMatrix has been removed in favor of Euler.setFromRotationMatrix(), please update your code.");
};

THREE.Vector3.prototype.setEulerFromQuaternion = function ( q, order ) {
		console.error( "REMOVED: Vector3\'s setEulerFromQuaternion: has been removed in favor of Euler.setFromQuaternion(), please update your code.");
};

THREE.Vector3.prototype.getPositionFromMatrix = function ( m ) {
		console.warn( "DEPRECATED: Vector3\'s .getPositionFromMatrix() has been renamed to .setFromMatrixPosition(). Please update your code." );

		return this.setFromMatrixPosition( m );
};

THREE.Vector3.prototype.getScaleFromMatrix = function ( m ) {
		console.warn( "DEPRECATED: Vector3\'s .getScaleFromMatrix() has been renamed to .setFromMatrixScale(). Please update your code." );

		return this.setFromMatrixScale( m );
};

THREE.Vector3.prototype.getColumnFromMatrix = function ( index, matrix ) {
		console.warn( "DEPRECATED: Vector3\'s .getColumnFromMatrix() has been renamed to .setFromMatrixColumn(). Please update your code." );

		return this.setFromMatrixColumn( index, matrix );
};

THREE.Vector3.prototype.setFromMatrixPosition = function ( m ) {
		this.x = m.elements[ 12 ];
		this.y = m.elements[ 13 ];
		this.z = m.elements[ 14 ];

		return this;
};

THREE.Vector3.prototype.setFromMatrixScale = function ( m ) {
		var sx = this.set( m.elements[ 0 ], m.elements[ 1 ], m.elements[  2 ] ).length();
		var sy = this.set( m.elements[ 4 ], m.elements[ 5 ], m.elements[  6 ] ).length();
		var sz = this.set( m.elements[ 8 ], m.elements[ 9 ], m.elements[ 10 ] ).length();

		this.x = sx;
		this.y = sy;
		this.z = sz;

		return this;
};

THREE.Vector3.prototype.setFromMatrixColumn = function ( index, matrix ) {
		var offset = index * 4;

		var me = matrix.elements;

		this.x = me[ offset ];
		this.y = me[ offset + 1 ];
		this.z = me[ offset + 2 ];

		return this;
};

THREE.Vector3.prototype.equals = function ( v ) {
		return ( ( v.x === this.x ) && ( v.y === this.y ) && ( v.z === this.z ) );
};

THREE.Vector3.prototype.fromArray = function ( array ) {
		this.x = array[ 0 ];
		this.y = array[ 1 ];
		this.z = array[ 2 ];

		return this;
};

THREE.Vector3.prototype.toArray = function () {
		return [ this.x, this.y, this.z ];
};

THREE.Vector3.prototype.clone = function () {
		return new THREE.Vector3( this.x, this.y, this.z );
};
