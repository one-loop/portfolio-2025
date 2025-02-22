import * as THREE from 'three'

import Experience from './Experience.js'
import vertexShader from './shaders/baked/vertex.glsl'
import fragmentShader from './shaders/baked/fragment.glsl'

export const vertexShaderSource =`\
uniform float time;\
varying vec2 vUv;\
\
void main(){\
\
  vUv=uv;\
  vec3 posChanged=position;\
  posChanged.x=posChanged.x*(abs(sin(time*2.)));\
  posChanged.y=posChanged.y*(abs(sin(time*1.)));\
  posChanged.z=posChanged.z*(abs(cos(time*.5)));\
\
  gl_Position=projectionMatrix*modelViewMatrix*vec4(posChanged,1.);\
}\
`;

var fragmentShaderSource = `
uniform sampler2D uBakedDayTexture;
uniform sampler2D uBakedNightTexture;
uniform sampler2D uBakedNeutralTexture;
uniform sampler2D uLightMapTexture;

uniform float uNightMix;
uniform float uNeutralMix;

uniform vec3 uLightTvColor;
uniform float uLightTvStrength;

uniform vec3 uLightDeskColor;
uniform float uLightDeskStrength;

uniform vec3 uLightPcColor;
uniform float uLightPcStrength;

varying vec2 vUv;

// #pragma glslify: blend = require(glsl-blend/add)
#pragma glslify: blend = require(glsl-blend/lighten)
// #pragma glslify: blend = require(glsl-blend/normal)
// #pragma glslify: blend = require(glsl-blend/screen)

void main()
{
    vec3 bakedDayColor = texture2D(uBakedDayTexture, vUv).rgb;
    vec3 bakedNightColor = texture2D(uBakedNightTexture, vUv).rgb;
    vec3 bakedNeutralColor = texture2D(uBakedNeutralTexture, vUv).rgb;
    vec3 bakedColor = mix(mix(bakedDayColor, bakedNightColor, uNightMix), bakedNeutralColor, uNeutralMix);
    vec3 lightMapColor = texture2D(uLightMapTexture, vUv).rgb;

    float lightTvStrength = lightMapColor.r * uLightTvStrength;
    bakedColor = blend(bakedColor, uLightTvColor, lightTvStrength);

    float lightPcStrength = lightMapColor.b * uLightPcStrength;
    bakedColor = blend(bakedColor, uLightPcColor, lightPcStrength);

    float lightDeskStrength = lightMapColor.g * uLightDeskStrength;
    bakedColor = blend(bakedColor, uLightDeskColor, lightDeskStrength);

    gl_FragColor = vec4(bakedColor, 1.0);
}
`;

// Preprocess shaders using glslify
// const vertexShader = glslify(vertexShaderSource);
// const fragmentShader = glslify(fragmentShaderSource);

export default class Baked
{
    constructor()
    {
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.debug = this.experience.debug
        this.scene = this.experience.scene
        this.time = this.experience.time

        // Debug
        if(this.debug)
        {
            this.debugFolder = this.debug.addFolder({
                title: 'baked',
                expanded: true
            })
        }

        this.setModel()
    }

    setModel()
    {
        this.model = {}
        
        this.model.mesh = this.resources.items.roomModel.scene.children[0]

        this.model.bakedDayTexture = this.resources.items.bakedDayTexture
        this.model.bakedDayTexture.encoding = THREE.SRGBColorSpace
        this.model.bakedDayTexture.flipY = false

        this.model.bakedNightTexture = this.resources.items.bakedNightTexture
        this.model.bakedNightTexture.encoding = THREE.SRGBColorSpace
        this.model.bakedNightTexture.flipY = false

        this.model.bakedNeutralTexture = this.resources.items.bakedNeutralTexture
        this.model.bakedNeutralTexture.encoding = THREE.SRGBColorSpace
        this.model.bakedNeutralTexture.flipY = false

        this.model.lightMapTexture = this.resources.items.lightMapTexture
        this.model.lightMapTexture.flipY = false

        this.colors = {}
        this.colors.tv = '#ff115e'
        this.colors.desk = '#ff6700'
        this.colors.pc = '#0082ff'

        this.model.material = new THREE.ShaderMaterial({
            uniforms:
            {
                uBakedDayTexture: { value: this.model.bakedDayTexture },
                uBakedNightTexture: { value: this.model.bakedNightTexture },
                uBakedNeutralTexture: { value: this.model.bakedNeutralTexture },
                uLightMapTexture: { value: this.model.lightMapTexture },

                uNightMix: { value: 1 },
                uNeutralMix: { value: 0 },

                uLightTvColor: { value: new THREE.Color(this.colors.tv) },
                uLightTvStrength: { value: 1.47 },

                uLightDeskColor: { value: new THREE.Color(this.colors.desk) },
                uLightDeskStrength: { value: 1.9 },

                uLightPcColor: { value: new THREE.Color(this.colors.pc) },
                uLightPcStrength: { value: 1.4 }
            },
            vertexShader: vertexShader,
            fragmentShader: fragmentShader
        })

        // Set lighting using a piecewise function for nightMix
        const now = new Date();
        const hour = now.getHours() + now.getMinutes() / 60;
        let nightMix = 0;
        if(hour < 6) // sun is down
        {
            nightMix = 1;
        }
        else if(hour >= 6 && hour < 7) // sun is rising at 6:00 - 8:00 AM
        {
            nightMix = 1 - (hour - 6);
        }
        else if(hour >= 7 && hour < 17.5) // sun is up
        {
            nightMix = 0;
        }
        else if(hour >= 17.5 && hour < 18.5) // sun is setting at 6:30 PM
        {
            nightMix = hour - 17.5;
            // console.log("nightmix:", nightMix)
        }
        else // hour >= 20 // sun is down
        {
            nightMix = 1;
        }
        // console.log(hour);
        // console.log(nightMix);
        this.model.material.uniforms.uNightMix.value = nightMix;

        // By default, lights are on
        this.model.material.uniforms.uLightTvStrength.value = 2;
        this.model.material.uniforms.uLightDeskStrength.value = 2;
        this.model.material.uniforms.uLightPcStrength.value = 2;

        // Turn on tv, desk, and pc light strengths after 6:00 PM
        const currentHour = now.getHours();
        if(currentHour < 18 && currentHour >= 6)
        {
            this.model.material.uniforms.uLightTvStrength.value = 0;
            this.model.material.uniforms.uLightDeskStrength.value = 0;
            this.model.material.uniforms.uLightPcStrength.value = 0;
        }

        this.model.mesh.traverse((_child) =>
        {
            if(_child instanceof THREE.Mesh)
            {
                _child.material = this.model.material
            }
        })

        this.scene.add(this.model.mesh)
        
        // Debug
        if(this.debug)
        {
            this.debugFolder
                .addInput(
                    this.model.material.uniforms.uNightMix,
                    'value',
                    { label: 'uNightMix', min: 0, max: 1 }
                )

            this.debugFolder
                .addInput(
                    this.model.material.uniforms.uNeutralMix,
                    'value',
                    { label: 'uNeutralMix', min: 0, max: 1 }
                )

            this.debugFolder
                .addInput(
                    this.colors,
                    'tv',
                    { view: 'color' }
                )
                .on('change', () =>
                {
                    this.model.material.uniforms.uLightTvColor.value.set(this.colors.tv)
                })

            this.debugFolder
                .addInput(
                    this.model.material.uniforms.uLightTvStrength,
                    'value',
                    { label: 'uLightTvStrength', min: 0, max: 3 }
                )

            this.debugFolder
                .addInput(
                    this.colors,
                    'desk',
                    { view: 'color' }
                )
                .on('change', () =>
                {
                    this.model.material.uniforms.uLightDeskColor.value.set(this.colors.desk)
                })

            this.debugFolder
                .addInput(
                    this.model.material.uniforms.uLightDeskStrength,
                    'value',
                    { label: 'uLightDeskStrength', min: 0, max: 3 }
                )

            this.debugFolder
                .addInput(
                    this.colors,
                    'pc',
                    { view: 'color' }
                )
                .on('change', () =>
                {
                    this.model.material.uniforms.uLightPcColor.value.set(this.colors.pc)
                })

            this.debugFolder
                .addInput(
                    this.model.material.uniforms.uLightPcStrength,
                    'value',
                    { label: 'uLightPcStrength', min: 0, max: 3 }
                )
        }
    }
}