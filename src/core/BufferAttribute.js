goog.provide('THREE.BufferAttribute');
goog.provide('THREE.Int8Attribute');
goog.provide('THREE.Uint8Attribute');
goog.provide('THREE.Uint8ClampedAttribute');
goog.provide('THREE.Int16Attribute');
goog.provide('THREE.Uint16Attribute');
goog.provide('THREE.Int32Attribute');
goog.provide('THREE.Uint32Attribute');
goog.provide('THREE.Float32Attribute');
goog.provide('THREE.Float64Attribute');



/**
 * @constructor
 * @author mrdoob / http://mrdoob.com/
 */
THREE.BufferAttribute = function () {};


/**
 * @return {!number}
 */
THREE.BufferAttribute.prototype.length = function () {
		return this.array.length;
};


/**
 * @param {!V} value
 */
THREE.BufferAttribute.prototype.set = function ( value ) {
		this.array.set( value );
};


/**
 * @param {!number} index
 * @param {!V} x
 */
THREE.BufferAttribute.prototype.setX =function ( index, x ) {
		this.array[ index * this.itemSize ] = x;
};


/**
 * @param {!number} index
 * @param {!V} y
 */
THREE.BufferAttribute.prototype.setY =function ( index, y ) {
		this.array[ index * this.itemSize + 1 ] = y;
};


/**
 * @param {!number} index
 * @param {!V} z
 */
THREE.BufferAttribute.prototype.setZ =function ( index, z ) {
		this.array[ index * this.itemSize + 2 ] = z;
};


/**
 * @param {!number} index
 * @param {!V} x
 * @param {!V} y
 */
THREE.BufferAttribute.prototype.setXY =function ( index, x, y ) {
		index *= this.itemSize;

		this.array[ index     ] = x;
		this.array[ index + 1 ] = y;
};


/**
 * @param {!number} index
 * @param {!V} x
 * @param {!V} y
 * @param {!V} z
 */
THREE.BufferAttribute.prototype.setXYZ =function ( index, x, y, z ) {
		index *= this.itemSize;

		this.array[ index     ] = x;
		this.array[ index + 1 ] = y;
		this.array[ index + 2 ] = z;
};


/**
 * @param {!number} index
 * @param {!V} x
 * @param {!V} y
 * @param {!V} z
 * @param {!V} w
 */
THREE.BufferAttribute.prototype.setXYZW =function ( index, x, y, z, w ) {
		index *= this.itemSize;

		this.array[ index     ] = x;
		this.array[ index + 1 ] = y;
		this.array[ index + 2 ] = z;
		this.array[ index + 3 ] = w;
};



/**
 * @constructor
 * @extends{THREE.BufferAttribute}
 */
THREE.Int8Attribute = function ( size, itemSize ) {
	this.array = new Int8Array( size * itemSize );
	this.itemSize = itemSize;
};
goog.inherits(THREE.Int8Attribute,THREE.BufferAttribute);



/**
 * @constructor
 * @extends{THREE.BufferAttribute}
 */
THREE.Uint8Attribute = function ( size, itemSize ) {
	this.array = new Uint8Array( size * itemSize );
	this.itemSize = itemSize;
};
goog.inherits(THREE.Uint8Attribute,THREE.BufferAttribute);



/**
 * @constructor
 * @extends{THREE.BufferAttribute}
 */
THREE.Uint8ClampedAttribute = function ( size, itemSize ) {
	this.array = new Uint8ClampedArray( size * itemSize );
	this.itemSize = itemSize;
};
goog.inherits(THREE.Uint8ClampedAttribute,THREE.BufferAttribute);



/**
 * @constructor
 * @extends{THREE.BufferAttribute}
 */
THREE.Int16Attribute = function ( size, itemSize ) {
	this.array = new Int16Array( size * itemSize );
	this.itemSize = itemSize;
};
goog.inherits(THREE.Int16Attribute,THREE.BufferAttribute);



/**
 * @constructor
 * @extends{THREE.BufferAttribute}
 */
THREE.Uint16Attribute = function ( size, itemSize ) {
	this.array = new Uint16Array( size * itemSize );
	this.itemSize = itemSize;
};
goog.inherits(THREE.Uint16Attribute,THREE.BufferAttribute);



/**
 * @constructor
 * @extends{THREE.BufferAttribute}
 */
THREE.Int32Attribute = function ( size, itemSize ) {
	this.array = new Int32Array( size * itemSize );
	this.itemSize = itemSize;
};
goog.inherits(THREE.Int32Attribute,THREE.BufferAttribute);



/**
 * @constructor
 * @extends{THREE.BufferAttribute}
 */
THREE.Uint32Attribute = function ( size, itemSize ) {
	this.array = new Uint32Array( size * itemSize );
	this.itemSize = itemSize;
};
goog.inherits(THREE.Uint32Attribute,THREE.BufferAttribute);



/**
 * @constructor
 * @extends{THREE.BufferAttribute}
 */
THREE.Float32Attribute = function ( size, itemSize ) {
	this.array = new Float32Array( size * itemSize );
	this.itemSize = itemSize;
};
goog.inherits(THREE.Float32Attribute,THREE.BufferAttribute);



/**
 * @constructor
 * @extends{THREE.BufferAttribute}
 */
THREE.Float64Attribute = function ( size, itemSize ) {
	this.array = new Float64Array( size * itemSize );
	this.itemSize = itemSize;
};
goog.inherits(THREE.Float64Attribute,THREE.BufferAttribute);
