import * as THREE from 'three'

import Experience from './Experience.js'

export default class BouncingLogo
{
    constructor()
    {
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.debug = this.experience.debug
        this.scene = this.experience.scene
        this.world = this.experience.world
        this.time = this.experience.time
        this.sourcePath = '/videos/codescroll.mp4'

        this.setModel()
    }

    setModel()
    {
        this.model = {}

        // Video Element (displays the same video as the PC monitor)
        this.model.element = document.createElement('video')
        this.model.element.muted = true
        this.model.element.loop = true
        this.model.element.controls = false
        this.model.element.playsInline = true
        this.model.element.autoplay = true
        this.model.element.src = this.sourcePath
        this.model.element.play()

        // Video Texture
        this.model.texture = new THREE.VideoTexture(this.model.element)
        this.model.texture.colorSpace = THREE.SRGBColorSpace
        this.model.texture.minFilter = THREE.LinearFilter
        this.model.texture.magFilter = THREE.LinearFilter
        this.model.texture.generateMipmaps = false

        // Geometry
        this.model.geometry = new THREE.PlaneGeometry(1, 1)

        // Material
        this.model.material = new THREE.MeshBasicMaterial({
            map: this.model.texture,
            side: THREE.FrontSide
        })

        // Mesh (rotated to face the room from the right wall)
        this.model.mesh = new THREE.Mesh(this.model.geometry, this.model.material)
        this.model.mesh.rotation.y = - Math.PI * 0.5
        this.model.mesh.position.set(4.195, 2.663, 1.82)
        this.model.mesh.scale.set(4.24, 2.38, 1)

        this.scene.add(this.model.mesh)

        // Debug
        if(this.debug)
        {
            this.debugFolder = this.debug.addFolder({
                title: 'tvScreen',
                expanded: false
            })

            this.debugFolder.addInput(
                this.model.mesh.position,
                'x',
                { label: 'positionX', min: 0, max: 6, step: 0.001 }
            )
            this.debugFolder.addInput(
                this.model.mesh.position,
                'y',
                { label: 'positionY', min: 0, max: 5, step: 0.001 }
            )
            this.debugFolder.addInput(
                this.model.mesh.position,
                'z',
                { label: 'positionZ', min: -2, max: 5, step: 0.001 }
            )
            this.debugFolder.addInput(
                this.model.mesh.scale,
                'x',
                { label: 'scaleWidth', min: 0.5, max: 8, step: 0.01 }
            )
            this.debugFolder.addInput(
                this.model.mesh.scale,
                'y',
                { label: 'scaleHeight', min: 0.5, max: 5, step: 0.01 }
            )
        }
    }

    update()
    {
    }
}