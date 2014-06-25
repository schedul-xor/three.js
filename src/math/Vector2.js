goog.provide('THREE.Vector2');



/**
 * @constructor
 * @param {!number} x
 * @param {!number} y
 * @author mrdoob / http://mrdoob.com/
 * @author philogb / http://blog.thejit.org/
 * @author egraether / http://egraether.com/
 * @author zz85 / http://www.lab4games.net/zz85/blog
 */
THREE.Vector2 = function ( x, y ) {
	this.x = x || 0;
	this.y = y || 0;
};


/**
 * @param {!number} x
 * @param {!number} y
 * @return {!THREE.Vector2}
 */
THREE.Vector2.prototype.set = function ( x, y ) {
		this.x = x;
		this.y = y;

		return this;
};


/**
 * @param {!number} x
 * @return {!THREE.Vector2}
 */
THREE.Vector2.prototype.etX = function ( x ) {
		this.x = x;

		return this;
};


/**
 * @param {!number} y
 * @return {!THREE.Vector2}
 */
THREE.Vector2.prototype.setY = function ( y ) {
		this.y = y;

		return this;
};


/**
 * @param {!number} index
 * @param {!number} value
 */
THREE.Vector2.prototype.setComponent = function ( index, value ) {
		switch ( index ) {

			case 0: this.x = value; break;
			case 1: this.y = value; break;
			default: throw new Error( "index is out of range: " + index );

		}
};


/**
 * @param {!number} index
 * @return {!number}
 */
THREE.Vector2.prototype.getComponent = function ( index ) {
		switch ( index ) {

			case 0: return this.x;
			case 1: return this.y;
			default: throw new Error( "index is out of range: " + index );

		}
};


/**
 * @param {!THREE.Vector2} v
 * @return {!THREE.Vector2}
 */
THREE.Vector2.prototype.copy = function ( v ) {
		this.x = v.x;
		this.y = v.y;

		return this;
};


/**
 * @param {!THREE.Vector2} v
 * @param {!THREE.Vector2} w
 * @return {!THREE.Vector2}
 */
THREE.Vector2.prototype.add = function ( v, w ) {
		if ( w !== undefined ) {

			console.warn( 'DEPRECATED: Vector2\'s .add() now only accepts one argument. Use .addVectors( a, b ) instead.' );
			return this.addVectors( v, w );

		}

		this.x += v.x;
		this.y += v.y;

		return this;
};


/**
 * @param {!THREE.Vector2} a
 * @param {!THREE.Vector2} b
 * @return {!THREE.Vector2}
 */
THREE.Vector2.prototype.addVectors = function ( a, b ) {
		this.x = a.x + b.x;
		this.y = a.y + b.y;

		return this;
};


/**
 * @param {!number} s
 * @return {!THREE.Vector2}
 */
THREE.Vector2.prototype.addScalar = function ( s ) {
		this.x += s;
		this.y += s;

		return this;
};


/**
 * @param {!THREE.Vector2} v
 * @param {!THREE.Vector2} w
 * @return {!THREE.Vector2}
 */
THREE.Vector2.prototype.sub = function ( v, w ) {
		if ( w !== undefined ) {

			console.warn( 'DEPRECATED: Vector2\'s .sub() now only accepts one argument. Use .subVectors( a, b ) instead.' );
			return this.subVectors( v, w );

		}

		this.x -= v.x;
		this.y -= v.y;

		return this;
};


/**
 * @param {!THREE.Vector2} a
 * @param {!THREE.Vector2} b
 * @return {!THREE.Vector2}
 */
THREE.Vector2.prototype.subVectors = function ( a, b ) {
		this.x = a.x - b.x;
		this.y = a.y - b.y;

		return this;
};
	

/**
 * @param {!THREE.Vector2} v
 * @return {!THREE.Vector2}
 */
THREE.Vector2.prototype.multiply = function ( v ) {
		this.x *= v.x;
		this.y *= v.y;

		return this;
};


/**
 * @param {!number} s
 * @return {!THREE.Vector2}
 */
THREE.Vector2.prototype.multiplyScalar = function ( s ) {
		this.x *= s;
		this.y *= s;

		return this;
};


/**
 * @param {!number} v
 * @return {!THREE.Vector2}
 */
THREE.Vector2.prototype.divide = function ( v ) {
		this.x /= v.x;
		this.y /= v.y;

		return this;
};


/**
 * @param {!number} scalar
 * @return {!THREE.Vector2}
 */
THREE.Vector2.prototype.divideScalar = function ( scalar ) {
		if ( scalar !== 0 ) {

			var invScalar = 1 / scalar;

			this.x *= invScalar;
			this.y *= invScalar;

		} else {

			this.x = 0;
			this.y = 0;

		}

		return this;
};


/**
 * @param {!number} v
 * @return {!THREE.Vector2}
 */
THREE.Vector2.prototype.min = function ( v ) {
		if ( this.x > v.x ) {

			this.x = v.x;

		}

		if ( this.y > v.y ) {

			this.y = v.y;

		}

		return this;
};


/**
 * @param {!number} v
 * @return {!THREE.Vector2}
 */
THREE.Vector2.prototype.max = function ( v ) {
		if ( this.x < v.x ) {

			this.x = v.x;

		}

		if ( this.y < v.y ) {

			this.y = v.y;

		}

		return this;
};


/**
 * @param {!number} min
 * @param {!number} max
 * @return {!THREE.Vector2}
 */
THREE.Vector2.prototype.clamp = function ( min, max ) {
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

		return this;
};


/**
 * @return {!THREE.Vector2}
 */
THREE.Vector2.prototype.clampScalar = ( function () {
		var min, max;

		return function ( minVal, maxVal ) {

			if ( min === undefined ) {

				min = new THREE.Vector2();
				max = new THREE.Vector2();

			}

			min.set( minVal, minVal );
			max.set( maxVal, maxVal );

			return this.clamp( min, max );

		};
} )();


/**
 * @return {!THREE.Vector2}
 */
THREE.Vector2.prototype.floor = function () {
		this.x = Math.floor( this.x );
		this.y = Math.floor( this.y );

		return this;
};


/**
 * @return {!THREE.Vector2}
 */
THREE.Vector2.prototype.ceil = function () {
		this.x = Math.ceil( this.x );
		this.y = Math.ceil( this.y );

		return this;
};


/**
 * @return {!THREE.Vector2}
 */
THREE.Vector2.prototype.round = function () {
		this.x = Math.round( this.x );
		this.y = Math.round( this.y );

		return this;
};


/**
 * @return {!THREE.Vector2}
 */
THREE.Vector2.prototype.roundToZero = function () {
		this.x = ( this.x < 0 ) ? Math.ceil( this.x ) : Math.floor( this.x );
		this.y = ( this.y < 0 ) ? Math.ceil( this.y ) : Math.floor( this.y );

		return this;
};


/**
 * @return {!THREE.Vector2}
 */
THREE.Vector2.prototype.negate = function () {
		return this.multiplyScalar( - 1 );
};


/**
 * @param {!THREE.Vector2} v
 * @return {!THREE.Vector2}
 */
THREE.Vector2.prototype.dot = function ( v ) {
		return this.x * v.x + this.y * v.y;
};


/**
 * @return {!number}
 */
THREE.Vector2.prototype.lengthSq = function () {
		return this.x * this.x + this.y * this.y;
};


/**
 * @return {!number}
 */
THREE.Vector2.prototype.length = function () {
		return Math.sqrt( this.x * this.x + this.y * this.y );
};


/**
 * @return {!THREE.Vector2}
 */
THREE.Vector2.prototype.normalize = function () {
		return this.divideScalar( this.length() );
};


/**
 * @param {!THREE.Vector2} v
 * @return {!number}
 */
THREE.Vector2.prototype.distanceTo = function ( v ) {
		return Math.sqrt( this.distanceToSquared( v ) );
};


/**
 * @param {!THREE.Vector2} v
 * @return {!number}
 */
THREE.Vector2.prototype.distanceToSquared = function ( v ) {
		var dx = this.x - v.x, dy = this.y - v.y;
		return dx * dx + dy * dy;
};


/**
 * @param {!number} l
 * @return {!THREE.Vector2}
 */
THREE.Vector2.prototype.setLength = function ( l ) {
		var oldLength = this.length();

		if ( oldLength !== 0 && l !== oldLength ) {

			this.multiplyScalar( l / oldLength );
		}

		return this;
};


/**
 * @param {!THREE.Vector2} v
 * @param {!number} alpha
 * @return {!THREE.Vector2}
 */
THREE.Vector2.prototype.lerp = function ( v, alpha ) {
		this.x += ( v.x - this.x ) * alpha;
		this.y += ( v.y - this.y ) * alpha;

		return this;
};


/**
 * @param {!THREE.Vector2} v
 * @return {!boolean}
 */
THREE.Vector2.prototype.equals = function( v ) {
		return ( ( v.x === this.x ) && ( v.y === this.y ) );
};


/**
 * @param {!Array.<!number>} array
 * @return {!THREE.Vector2}
 */
THREE.Vector2.prototype.fromArray = function ( array ) {
		this.x = array[ 0 ];
		this.y = array[ 1 ];

		return this;
};


/**
 * @return {!Array.<!number>} array
 */
THREE.Vector2.prototype.toArray = function () {
		return [ this.x, this.y ];
};


/**
 * @return {!THREE.Vector2}
 */
THREE.Vector2.prototype.clone = function () {
		return new THREE.Vector2( this.x, this.y );
};
