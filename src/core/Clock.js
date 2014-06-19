goog.provide('THREE.Clock');



/**
 * @constructor
 * @param {!boolean} autoStart
 * @author alteredq / http://alteredqualia.com/
 */
THREE.Clock = function ( autoStart ) {
	this.autoStart = ( autoStart !== undefined ) ? autoStart : true;

	this.startTime = 0;
	this.oldTime = 0;
	this.elapsedTime = 0;

	this.running = false;
};


/**
 *
 */
THREE.Clock.prototype.start= function () {
		this.startTime = self.performance !== undefined && self.performance.now !== undefined
					? self.performance.now()
					: Date.now();

		this.oldTime = this.startTime;
		this.running = true;
};


/**
 *
 */
THREE.Clock.prototype.stop= function () {
		this.getElapsedTime();
		this.running = false;
};


/**
 * @return {!number}
 */
THREE.Clock.prototype.getElapsedTime= function () {
		this.getDelta();
		return this.elapsedTime;
};


/**
 * @return {!number}
 */
THREE.Clock.prototype.getDelta= function () {
		var diff = 0;

		if ( this.autoStart && ! this.running ) {

			this.start();

		}

		if ( this.running ) {

			var newTime = self.performance !== undefined && self.performance.now !== undefined
					? self.performance.now()
					: Date.now();

			diff = 0.001 * ( newTime - this.oldTime );
			this.oldTime = newTime;

			this.elapsedTime += diff;

		}

		return diff;
};
