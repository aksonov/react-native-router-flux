import React from 'react-native';
const {PixelRatio, Navigator, Dimensions} = React;
import buildStyleInterpolator from 'react-native/Libraries/Utilities/buildStyleInterpolator';

var NoTransition = {
    opacity: {
        from: 1,
        to: 1,
        min: 1,
        max: 1,
        type: 'linear',
        extrapolate: false,
        round: 100,
    },
};

var FadeToTheLeft = {
    // Rotate *requires* you to break out each individual component of
    // rotation (x, y, z, w)
    transformTranslate: {
        from: {x: 0, y: 0, z: 0},
        to: {x: -Math.round(Dimensions.get('window').width * 0.3), y: 0, z: 0},
        min: 0,
        max: 1,
        type: 'linear',
        extrapolate: true,
        round: PixelRatio.get(),
    },
    // Uncomment to try rotation:
    // Quick guide to reasoning about rotations:
    // http://www.opengl-tutorial.org/intermediate-tutorials/tutorial-17-quaternions/#Quaternions
    // transformRotateRadians: {
    //   from: {x: 0, y: 0, z: 0, w: 1},
    //   to: {x: 0, y: 0, z: -0.47, w: 0.87},
    //   min: 0,
    //   max: 1,
    //   type: 'linear',
    //   extrapolate: true
    // },
    transformScale: {
        from: {x: 1, y: 1, z: 1},
        to: {x: 0.95, y: 1, z: 1},
        min: 0,
        max: 1,
        type: 'linear',
        extrapolate: true
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
    scaleX: {
        from: 1,
        to: 0.95,
        min: 0,
        max: 1,
        type: 'linear',
        extrapolate: true
    },
    scaleY: {
        from: 1,
        to: 0.95,
        min: 0,
        max: 1,
        type: 'linear',
        extrapolate: true
    },
};



var FromTheRight = {
    opacity: {
        value: 1.0,
        type: 'constant',
    },

    transformTranslate: {
        from: {x: Dimensions.get('window').width, y: 0, z: 0},
        to: {x: 0, y: 0, z: 0},
        min: 0,
        max: 1,
        type: 'linear',
        extrapolate: true,
        round: PixelRatio.get(),
    },

    translateX: {
        from: Dimensions.get('window').width,
        to: 0,
        min: 0,
        max: 1,
        type: 'linear',
        extrapolate: true,
        round: PixelRatio.get(),
    },

    scaleX: {
        value: 1,
        type: 'constant',
    },
    scaleY: {
        value: 1,
        type: 'constant',
    },
};



const Animations = {
    FlatFloatFromRight: {
        ...Navigator.SceneConfigs.FloatFromRight,
        // Animation interpolators for horizontal transitioning:
        animationInterpolators: {
            into: buildStyleInterpolator(FromTheRight),
            out: buildStyleInterpolator(FadeToTheLeft),
        },
        // We will want to customize this soon
    },


    None: {
        ...Navigator.SceneConfigs.FloatFromRight,
        gestures: null,
        defaultTransitionVelocity: 100,
        animationInterpolators: {
            into: buildStyleInterpolator(NoTransition),
            out: buildStyleInterpolator(NoTransition),
        }
    }
}

export default Animations;