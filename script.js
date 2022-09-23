var SunCalc = require('suncalc');
//get hours cuoché du soleil
// SunCalc.getTimes(getTimes(new Date(), 48.862760, 2.400570))

var times = SunCalc.getTimes(new Date(), 48.8, 2.4);


var sunriseStr = times.sunrise.getHours() + ':' + times.sunrise.getMinutes();

// get position of the sun (azimuth and altitude) at today's sunrise
var sunrisePos = SunCalc.getPosition(times.sunrise, 48.8, 2.4);

// get sunrise azimuth in degrees
var sunriseAzimuth = sunrisePos.azimuth * 180 / Math.PI;
console.log(times) // get position of the sun (azimuth and altitude) at today's sunrise
console.log(sunrisePos) // get position of the sun (azimuth and altitude) at today's sunrise
console.log(sunriseAzimuth)
// get sunrise azimuth in degrees
let scale = 1.5
var today = new Date();
var hours = today.getHours()
let lighting = {}

if (hours >= times.nightEnd.getHours() && hours < times.solarNoon.getHours()) {
    lighting = {
        x: -10,
        y: 2,
        z: 0,
        intensity: 1,
        color: '#6c6e66'

    }
    console.log('mornig')

} else if (hours >= times.solarNoon.getHours() && hours < times.goldenHour.getHours()) {
    lighting = {
        x: 0,
        y: 5,
        z: 0,
        intensity: 2,
        color: '#6c6e66',
    }
    console.log('good afternoon')
} else if (hours >= times.goldenHour.getHours() && hours < times.night.getHours()) {
    lighting = {
        x: 10,
        y: 1,
        z: 0,
        intensity: 2,
        color: '#6c6e66"',
    }
    //finis trop tard
    console.log('golden hour')

}
else if (hours >= times.night.getHours()) {
    lighting = {
        x: 0,
        y: 0,
        z: 0,
        intensity: 0.1,
        color: '#080707',

    }
    console.log('good night')
}
else if (hours <= times.nightEnd.getHours() || hours == 0) {
    lighting = {
        x: 0,
        y: 0,
        z: 0,
        intensity: 0.1,
        color: '#080707',

    }
    console.log('good night')
}



const reflectionCube = new THREE.CubeTextureLoader().load(
    [
        "envmap/px.jpeg",
        "envmap/nx.jpeg",
        "envmap/py.jpeg",
        "envmap/ny.jpeg",
        "envmap/pz.jpeg",
        "envmap/nz.jpeg",
    ]
);

// import WebXRPolyfill from 'webxr-polyfill';

// import * as THREE from 'three';
// import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
// import { ARButton } from 'three/addons/webxr/ARButton.js';
// import { XREstimatedLight } from 'three/addons/webxr/XREstimatedLight.js';


// const polyfill = new WebXRPolyfill();

// const lightProbe = await xrSession.requestLightProbe();

// frame loop
// function onXRFrame(time, xrFrame) {
//     let lightEstimate = xrFrame.getLightEstimate(lightProbe);

//     // Use light estimate data to light the scene

//     // Available properties
//     console.log(lightEstimate.sphericalHarmonicsCoefficients)
//     lightEstimate.primaryLightDirection;
//     lightEstimate.primaryLightIntensity;
// }


// console.log(polyfill)
// console.log(navigator.xr)


// // Using Three.js to demonstrate
// let threeDirectionalLight = new THREE.DirectionalLight();
// // THREE.LightProbe is Three.js' spherical harmonics-based light type.
// let threeLightProbe = new THREE.LightProbe();

// let lightProbe = await xrSession.requestLightProbe();

// function onXRFrame(t, xrFrame) {
//     let lightEstimate = xrFrame.getLightEstimate(lightProbe);

//     let intensity = Math.max(1.0,
//         Math.max(lightEstimate.primaryLightIntensity.x,
//             Math.max(lightEstimate.primaryLightIntensity.y,
//                 lightEstimate.primaryLightIntensity.z)));

//     threeDirectionalLight.position.set(lightEstimate.primaryLightDirection.x,
//         lightEstimate.primaryLightDirection.y,
//         lightEstimate.primaryLightDirection.z);
//     threeDirectionalLight.color.setRGB(lightEstimate.primaryLightIntensity.x / intensity,
//         lightEstimate.primaryLightIntensity.y / intensity,
//         lightEstimate.primaryLightIntensity.z / intensity);
//     threeDirectionalLight.intensity = intensity;

//     threeLightProbe.sh.fromArray(lightEstimate.sphericalHarmonicsCoefficients);

//     // ... other typical frame loop stuff.
// }




// SunCalc.getTimes(/*Date*/ date, /*Number*/ latitude, /*Number*/ longitude, /*Number (default=0)*/ height)

AFRAME.registerComponent('contreform', {
    init: function () {
        const scene = document.querySelector('a-scene');
        const data = scene.setAttribute('renderer');
        // data.exposure = 0.5;
        this.loaded = false;
        this.camera = document.querySelector('a-camera');
        //if pas la même distance scale  ====

        // window.addEventListener('gps-entity-place-adde', e => {
        //     console.log(e.detail)
        // })
        // window.addEventListener('gps-camera-origin-coord-set', e => {
        //     console.log(e.detail)
        // })
        var materials = [new THREE.MeshStandardMaterial({
            color: 0x000000,
            envMap: reflectionCube,

            roughness: 0.5,

            // shininess: 60,
        }), new THREE.MeshStandardMaterial({
            color: 0x000000,
            envMap: reflectionCube,

            roughness: 0.5,


            // shininess: 1,
        })]

        this.el.addEventListener("loaded", e => {
            this.material = this.el.getObject3D('mesh').material = materials
        });
    },
})

AFRAME.registerComponent('form', {
    init: function () {
        var materials = [new THREE.MeshStandardMaterial({
            color: 0xFFFFFF,
            envMap: reflectionCube,
            envMapIntensity: 0.7,
            roughness: 0.85,


        }), new THREE.MeshStandardMaterial({
            color: 0x000000,
            envMap: reflectionCube,

            roughness: 0.85,
        })]

        this.el.addEventListener("loaded", e => {
            this.material = this.el.getObject3D('mesh').material = materials
        });

    }
})
AFRAME.registerComponent('forma', {

    init: function () {
        // window.addEventListener('gps-camera-update-position', e => {
        //     if (this.loaded === false) {
        //         this.loaded = true;
        //         console.log(this.el.getAttribute('gps-entity-place').latitude.toFixed(4))
        //         console.log(e.detail.position.latitude.toFixed(4));
        //         if (this.el.getAttribute('gps-entity-place').longitude.toFixed(4) == e.detail.position.longitude.toFixed(4)) {
        //             console.log('hide')
        //             scale = { x: 0.1, y: 0.1, z: 0.1 }
        //             this.el.setAttribute('scale', scale)

        //         }
        //     }
        // })

        var materials = [new THREE.MeshStandardMaterial({
            color: 0xFFFFFF,
            envMap: reflectionCube,
            envMapIntensity: 0.7,
            roughness: 0.85,


        }), new THREE.MeshStandardMaterial({
            color: 0xFFFFFF,
            envMap: reflectionCube,
            envMapIntensity: 0.7,
            roughness: 0.85,

            // envMap: reflectionCube
        })]

        this.el.addEventListener("loaded", e => {
            this.material = this.el.getObject3D('mesh').material = materials
        });
    },
})

AFRAME.registerComponent('intensity', {
    init: function () {

        this.el.addEventListener("loaded", e => {
            const light = {
                type: 'directional',
                intensity: lighting.intensity,
            }
            this.el.setAttribute('light', light)

        });
    },
})
AFRAME.registerComponent('color', {
    init: function () {
        this.el.addEventListener("loaded", e => {
            const light = {
                color: lighting.color,
                type: 'ambient',
            }
            this.el.setAttribute('light', light)

        });
    },
})
AFRAME.registerComponent('point', {
    init: function () {
        console.log(lighting)

        this.el.addEventListener("loaded", e => {
            const light = {
                color: lighting.color,
                type: 'point',
                intensity: lighting.intensity,
            }
            this.el.setAttribute('light', light)
            this.el.setAttribute('position', { x: lighting.x, y: lighting.y, z: lighting.z })
        });
    },
})
