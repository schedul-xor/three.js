goog.provide('THREE.Vertex');



/**
 * @constructor
 * @author mrdoob / http://mrdoob.com/
 * @param {!} v
 */
THREE.Vertex = function ( v ) {
	console.warn( 'THREE.Vertex has been DEPRECATED. Use THREE.Vector3 instead.')
	return v;
};
