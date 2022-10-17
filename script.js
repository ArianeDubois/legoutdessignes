var SunCalc = require('suncalc');
//get hours cuoché du soleil
// SunCalc.getTimes(getTimes(new Date(), 48.862760, 2.400570))

var times = SunCalc.getTimes(new Date(), 48.8, 2.4);


var sunriseStr = times.sunrise.getHours() + ':' + times.sunrise.getMinutes();

// get position of the sun (azimuth and altitude) at today's sunrise
var sunrisePos = SunCalc.getPosition(times.sunrise, 48.8, 2.4);

// get sunrise azimuth in degrees
var sunriseAzimuth = sunrisePos.azimuth * 150 / Math.PI;
console.log(times) // get position of the sun (azimuth and altitude) at today's sunrise
// get sunrise azimuth in degrees
var today = new Date();
var hours = today.getHours()
let lighting = {}

if (hours >= times.nightEnd.getHours() && hours < times.solarNoon.getHours()) {
    lighting = {
        x: -10,
        y: 2,
        z: 0,
        intensity: 1,
        shininess: 20,
        reflectivity: 0.2,
        color: '#6E7579',
        blackReflectivity: 0.5
    }
    console.log('mornig')

} else if (hours >= times.solarNoon.getHours() && hours < times.goldenHour.getHours()) {
    lighting = {
        x: -5,
        y: 3,
        z: 0,
        intensity: 1.5,
        shininess: 15,
        reflectivity: 0.15,
        blackReflectivity: 0.5,
        color: '#7B7B79',
    }
    console.log('good afternoon')
} else if (hours >= times.goldenHour.getHours() && hours < times.sunset.getHours()) {
    lighting = {
        x: 10,
        y: 2,
        z: 0,
        intensity: 1,
        shininess: 30,
        reflectivity: 0.1,
        color: '#8C8D89',
        blackReflectivity: 0.5
    }
    //finis trop tard
    console.log('golden hour')

}
else if (hours >= times.sunset.getHours() && hours < times.night.getHours()) {
    lighting = {
        x: -10,
        y: 2,
        z: 0,
        intensity: 1,
        shininess: 20,
        reflectivity: 0.2,
        color: '#6E7579',
        blackReflectivity: 0.5
    }
    //finis trop tard
    console.log('sunset')

}
else if (hours >= times.night.getHours()) {
    lighting = {
        x: -2,
        y: 1,
        z: 0,
        intensity: 1.5,
        shininess: 15,
        reflectivity: 0.15,
        blackReflectivity: 0.5,
        color: '#6E7579',
    }
    console.log('good night')
}
else if (hours <= times.nightEnd.getHours() || hours == 0) {
    lighting = {
        x: -2,
        y: 1,
        z: 0,
        intensity: 1,
        shininess: 10,
        reflectivity: 0.15,
        blackReflectivity: 0.5,
        color: '#6E7579',
    }
    console.log('good night')
}

AFRAME.registerComponent('contreform', {
    init: function () {
        const scene = document.querySelector('a-scene');
        const data = scene.setAttribute('renderer');
        // data.exposure = 0.5;
        this.loaded = false;
        this.camera = document.querySelector('a-camera');

        var materials = [new THREE.MeshPhongMaterial({
            color: 0x202020,
            shininess: 50,
            reflectivity: lighting.blackReflectivity

        }), new THREE.MeshPhongMaterial({
            color: 0x202020,
            shininess: 50,
            reflectivity: lighting.blackReflectivity

        })]

        this.el.addEventListener("loaded", e => {
            this.material = this.el.getObject3D('mesh').material = materials
        });
    },
})

AFRAME.registerComponent('form', {
    init: function () {
        var materials = [new THREE.MeshPhongMaterial({
            color: 0xFFFFFF,
            shininess: lighting.shininess,
            reflectivity: lighting.reflectivity

        }), new THREE.MeshPhongMaterial({
            color: 0x202020,
            shininess: 50,
            reflectivity: lighting.blackReflectivity
        })]

        this.el.addEventListener("loaded", e => {
            this.material = this.el.getObject3D('mesh').material = materials
        });

    }
})
AFRAME.registerComponent('forma', {

    init: function () {
        var materials = [new THREE.MeshPhongMaterial({
            color: 0xFFFFFF,
            shininess: lighting.shininess,
            reflectivity: lighting.reflectivity


        }), new THREE.MeshPhongMaterial({
            color: 0xFFFFFF,
            shininess: lighting.shininess,
            reflectivity: lighting.reflectivity
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
