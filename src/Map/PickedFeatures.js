'use strict';

/*global require*/
var knockout = require('../../third_party/cesium/Source/ThirdParty/knockout');

/**
 * Holds the vector and raster features that the user picked by clicking the mouse on the map.
 */
var PickedFeatures = function() {
    /**
     * Gets or sets a promise that indicates, when it resolves, that all picked features are available in the
     * {@see PickedFeatures#features} array.
     * @type {Promise}
     */
    this.allFeaturesAvailablePromise = undefined;

    /**
     * Gets or sets the array of picked features.  The array is observable and may be updated up until the point that
     * {@see PickedFeatures#allFeaturesAvailablePromise} resolves.
     * @type {Entity[]}
     */
    this.features = [];

    knockout.track(this, ['features']);
};

module.exports = PickedFeatures;
