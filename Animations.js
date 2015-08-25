'use strict';

// Scene Config
var {Navigator,Dimensions,PixelRatio,buildStyleInterpolator} = require('react-native');
var buildStyleInterpolator = require('buildStyleInterpolator');
var FlatFloatFromRight = Object.assign({}, Navigator.SceneConfigs.FloatFromRight);
var FlatFloatFromBottom = Object.assign({}, Navigator.SceneConfigs.FloatFromBottom);

var FlatFadeToTheLeft = {
    transformTranslate: {
        from: {x: 0, y: 0, z: 0},
        to: {x: -Math.round(Dimensions.get('window').width * 0.3), y: 0, z: 0},
        min: 0,
        max: 1,
        type: 'linear',
        extrapolate: true,
        round: PixelRatio.get(),
    },
    opacity: {
        from: 1,
        to: 0.3,
        min: 0,
        max: 1,
        type: 'linear',
        extrapolate: false,
        round: 100,
    },
    translateX: {
        from: 0,
        to: -Math.round(Dimensions.get('window').width * 0.3),
        min: 0,
        max: 1,
        type: 'linear',
        extrapolate: true,
        round: PixelRatio.get(),
    },
};
var FlatFadeToTheUp = {
    opacity: {
        value: 1.0,
        type: 'constant',
    },

    translateY: {
        from: 0,
        to: -Math.round(Dimensions.get('window').height * 0.3),
        min: 0,
        max: 1,
        type: 'linear',
        extrapolate: true,
        round: PixelRatio.get(),
    },
};
FlatFloatFromBottom.animationInterpolators.out = buildStyleInterpolator(FlatFadeToTheUp);
FlatFloatFromRight.animationInterpolators.out = buildStyleInterpolator(FlatFadeToTheLeft);

module.exports = {FlatFloatFromRight, FlatFloatFromBottom};
