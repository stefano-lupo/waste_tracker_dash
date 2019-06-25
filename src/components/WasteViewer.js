import React, { Component } from 'react';
import * as THREE from 'three';
import * as OrbitControls from 'three-orbitcontrols'

import Api from '../api/Api';

// const WIDTH = 1280
// const HEIGHT = 720  

const scaleFactor = 1

const WIDTH = 1280 / scaleFactor
const HEIGHT = 720 / scaleFactor
// const WIDTH = 1024 / scaleFactor
// const HEIGHT = 512  / scaleFactor

const SEGMENT_WIDTH = 50 / scaleFactor;
const SEGMENT_HEIGHT = 50 / scaleFactor;

const COLOURS = [
    "#42f450", // Broccoli
    "#ffb7f9", // Chicken
    "#2d2d2d", // Cutlery
    "#ffffff", // Empty
    "#176D02", // Green beans
    "#abfcb2", // Lettuce
    "#E9E200", // Pasta
    "#d9ddd9", // Rice
    "#DA1C1C", // Tomato
]

export default class ThreeScene extends Component {

    constructor(props) {
        super(props);
        this.api = new Api();
        this.state = ({
            detectionsByIngredient: null,
        })
    }

    componentDidMount(){
        this.create3dView();
        this.start();
        this.renderForScanId(this.props.scanId)
    }

    componentWillUnmount(){
        this.stop()
        this.mount.removeChild(this.renderer.domElement)
    }

    componentDidUpdate(prevProps) {
        if (prevProps === this.props) {
            return;
        }
        
        while(this.scene.children.length > 0){ 
            this.scene.remove(this.scene.children[0]); 
        }
        this.renderForScanId(this.props.scanId)
    }

    renderForScanId(scanId) {
        this.addImage();
        this.api.getDetectionByScanId(scanId)
        .then(detectionsByIngredient =>  {
            this.setState({ 
                detectionsByIngredient: new Map(Object.entries(detectionsByIngredient))
            });
            this.addDetections()
        });
    }

    create3dView() {
        const width = this.mount.clientWidth
        const height = this.mount.clientHeight

        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera(70, width / height, 1, 1000)        
        this.camera.position.set(0, -500, 600)
        this.camera.lookAt(new THREE.Vector3(0, 0, 0))
        this.camera.rotateZ()

        this.renderer = new THREE.WebGLRenderer({ antialias: false })
        this.renderer.setClearColor('#ffffff')
        this.renderer.setSize(width, height)
        
        if (this.props.orbitControls) {
            this.controls = new OrbitControls(this.camera, this.renderer.domElement)
            // this.controls.autoUpdate = true;
            // this.controls.enablePan = false;
            this.controls.update();
        }
      
        this.scene.add( new THREE.AxesHelper(500));
        this.mount.appendChild(this.renderer.domElement)
    }

    addCube(detection, color) {
        // console.log("Adding cube for color: " + color)
        const { x, y, mass } = detection;
        // TODO Normalize!
        let z = mass  * 50
        // let z = 10
        const geometry = new THREE.BoxGeometry(SEGMENT_WIDTH, SEGMENT_HEIGHT, z)
        const material = new THREE.MeshBasicMaterial({ transparent: true, color , opacity: 0.5})
        const cube = new THREE.Mesh(geometry, material);
        // cube.position.x = x 
        // cube.position.y = y
        // cube.position.z = cube.position.z + z / 2

        cube.position.x = x - WIDTH / 2
        cube.position.y = (-y) + HEIGHT / 2
        cube.position.z = cube.position.z + z / 2
        this.scene.add(cube);
    }

    addImage() {
        const textureLoader = new THREE.TextureLoader();
        const material = new THREE.MeshLambertMaterial({
            map: textureLoader.load(this.api.getImageUrlByScanId(this.props.scanId))
        });
        
        const geometry = new THREE.PlaneGeometry(WIDTH, HEIGHT  );

        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(0,0,0)
        this.scene.add(mesh);

        const light = new THREE.PointLight(0xffffff, 1, 0);
        light.position.set(0, 0, 1000);
        this.scene.add(light)
    }

    addDetections() {
        this.state.detectionsByIngredient.forEach((detectionsJson, ingredientId) => {
            const { detections } = detectionsJson;
            detections.forEach(d => {
                console.log("Adding cube for detection of")
                console.log(d)
                this.addCube(d, COLOURS[ingredientId - 1])
            })
        })
    }

    start = () => {
        if (!this.frameId) {
            this.frameId = requestAnimationFrame(this.animate)
        }
    }

    stop = () => {
        cancelAnimationFrame(this.frameId)
    }

    animate = () => {
        this.renderScene()
       this.camera.rotation.x += 0.5
       this.camera.rotation.y += 0.5
    
       this.camera.lookAt(0, 0, 0)
        this.frameId = window.requestAnimationFrame(this.animate)
       
        // this.controls.update();
    }

    renderScene = () => {
        // this.controls.update()
        this.renderer.render(this.scene, this.camera)
    }

    render(){
        console.log("Rendering waste viewier")
        return (
            <div
                style={{width: "100%", height: "560px"}}
                // style={{ width: WIDTH + 'px', height: HEIGHT +'px' }}
                ref={(mount) => { this.mount = mount }}
            />
        );
    }
}