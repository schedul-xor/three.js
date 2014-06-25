goog.provide('THREE.Box2');



/**
 * @constructor
 * @author bhouston / http://exocortex.com
 */
THREE.Box2 = function ( min, max ) {
	this.min = ( min !== undefined ) ? min : new THREE.Vector2( Infinity, Infinity );
	this.max = ( max !== undefined ) ? max : new THREE.Vector2( -Infinity, -Infinity );
};


/**
 * @param {!number} min
 * @param {!number} max
 */
THREE.Box2.prototype.set = function ( min, max ) {
		this.min.copy( min );
		this.max.copy( max );

		return this;
};


/**
 * @param {!Array.<!*>} points
 */
THREE.Box2.prototype.setFromPoints = function ( points ) {
		if ( points.length > 0 ) {

			var point = points[ 0 ];

			this.min.copy( point );
			this.max.copy( point );

			for ( var i = 1, il = points.length; i < il; i ++ ) {

				point = points[ i ];

				if ( point.x < this.min.x ) {

					this.min.x = point.x;

				} else if ( point.x > this.max.x ) {

					this.max.x = point.x;

				}

				if ( point.y < this.min.y ) {

					this.min.y = point.y;

				} else if ( point.y > this.max.y ) {

					this.max.y = point.y;

				}

			}

		} else {

			this.makeEmpty();

		}

		return this;
};


/**
 * 
 */
THREE.Box2.prototype.setFromCenterAndSize = function () {

		var v1 = new THREE.Vector2();

		return function ( center, size ) {

			var halfSize = v1.copy( size ).multiplyScalar( 0.5 );
			this.min.copy( center ).sub( halfSize );
			this.max.copy( center ).add( halfSize );

			return this;

		};

	}(),


/**
 * 
 */
THREE.Box2.prototype.copy = function ( box ) {
		this.min.copy( box.min );
		this.max.copy( box.max );

		return this;
};


/**
 * 
 */
THREE.Box2.prototype.makeEmpty = function () {
		this.min.x = this.min.y = Infinity;
		this.max.x = this.max.y = -Infinity;

		return this;
};


/**
 * 
 */
THREE.Box2.prototype.empty = function () {
		// this is a more robust check for empty than ( volume <= 0 ) because volume can get positive with two negative axes

		return ( this.max.x < this.min.x ) || ( this.max.y < this.min.y );
};


/**
 * 
 */
THREE.Box2.prototype.center = function ( optionalTarget ) {
    		var result = optionalTarget || new THREE.Vector2();
		return result.addVectors( this.min, this.max ).multiplyScalar( 0.5 );
};


/**
 * 
 */
THREE.Box2.prototype.size = function ( optionalTarget ) {
		var result = optionalTarget || new THREE.Vector2();
		return result.subVectors( this.max, this.min );
};


/**
 * 
 */
THREE.Box2.prototype.expandByPoint = function ( point ) {
		this.min.min( point );
		this.max.max( point );

		return this;
};


/**
 * 
 */
THREE.Box2.prototype.expandByVector = function ( vector ) {
		this.min.sub( vector );
		this.max.add( vector );

		return this;
};


/**
 * 
 */
THREE.Box2.prototype.expandByScalar = function ( scalar ) {
		this.min.addScalar( -scalar );
		this.max.addScalar( scalar );

		return this;
};


/**
 * 
 */
THREE.Box2.prototype.containsPoint = function ( point ) {
		if ( point.x < this.min.x || point.x > this.max.x ||
		     point.y < this.min.y || point.y > this.max.y ) {

			return false;

		}

		return true;
};


/**
 * @param {!THREE.Box2} box
 */
THREE.Box2.prototype.containsBox = function ( box ) {
		if ( ( this.min.x <= box.min.x ) && ( box.max.x <= this.max.x ) &&
		     ( this.min.y <= box.min.y ) && ( box.max.y <= this.max.y ) ) {

			return true;

		}

		return false;
};


/**
 * This can potentially have a divide by zero if the box
 * has a size dimension of 0.
 */
THREE.Box2.prototype.getParameter = function ( point, optionalTarget ) {
		var result = optionalTarget || new THREE.Vector2();

		return result.set(
			( point.x - this.min.x ) / ( this.max.x - this.min.x ),
			( point.y - this.min.y ) / ( this.max.y - this.min.y )
		);
};


/**
 * using 6 splitting planes to rule out intersections.
 */
THREE.Box2.prototype.isIntersectionBox = function ( box ) {
		if ( box.max.x < this.min.x || box.min.x > this.max.x ||
		     box.max.y < this.min.y || box.min.y > this.max.y ) {

			return false;

		}

		return true;
};


/**
 * 
 */
THREE.Box2.prototype.clampPoint = function ( point, optionalTarget ) {
		var result = optionalTarget || new THREE.Vector2();
		return result.copy( point ).clamp( this.min, this.max );
};


/**
 * 
 */
THREE.Box2.prototype.distanceToPoint = function () {
		var v1 = new THREE.Vector2();

		return function ( point ) {

			var clampedPoint = v1.copy( point ).clamp( this.min, this.max );
			return clampedPoint.sub( point ).length();

		};
}();


/**
 * @param {!THREE.Box2} box
 * @return {!THREE.Box2}
 */
THREE.Box2.prototype.intersect = function ( box ) {
		this.min.max( box.min );
		this.max.min( box.max );

		return this;
};


/**
 * @param {!THREE.Box2} box
 * @return {!THREE.Box2}
 */
THREE.Box2.prototype.union = function ( box ) {
		this.min.min( box.min );
		this.max.max( box.max );

		return this;
};


/**
 * @return {!THREE.Box2}
 */
THREE.Box2.prototype.translate = function ( offset ) {
		this.min.add( offset );
		this.max.add( offset );

		return this;
};


/**
 * @param {!THREE.Box2} box
 * @return {!THREE.Box2}
 */
THREE.Box2.prototype.equals = function ( box ) {
		return box.min.equals( this.min ) && box.max.equals( this.max );
};


/**
 * @return {!THREE.Box2}
 */
THREE.Box2.prototype.clone = function () {
		return new THREE.Box2().copy( this );
};
