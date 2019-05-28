import React, { Component } from 'react';
import * as THREE from 'three';
import * as OrbitControls from 'three-orbitcontrols'

import Api from '../api/Api';

const WIDTH = 640
const HEIGHT = 480
const SEGMENT_WIDTH = 32;
const SEGMENT_HEIGHT = 32;

const COLOURS = new Map()
COLOURS[3] = "#DA1C1C"
COLOURS[5] = "#176D02"
COLOURS[7] = "#E9E200"

export default class ThreeScene extends Component {

    constructor(props) {
        super(props);
        this.api = new Api();
    }

    componentDidMount(){

        this.create3dView();
        this.addImage();
        this.start();
        this.api.getDetectionByScanId(this.props.scanId)
            .then(detectionsByIngredient =>  {
                console.log("Got detections by ingredient")
                console.log(detectionsByIngredient)
                this.setState({ 
                    detectionsByIngredient: new Map(Object.entries(detectionsByIngredient))
                });
                this.addDetections()
            });
        this.scene.add( new THREE.AxesHelper(500));
        this.addCube({x: 10, y:10, mass: 200}, COLOURS[3])
        this.addCube({x: 100, y:100, mass: 400}, COLOURS[3])
    }

    create3dView() {
        const width = this.mount.clientWidth
        const height = this.mount.clientHeight

        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 5000)        
        this.controls = new OrbitControls(this.camera)

        this.camera.position.set(0, 0, 600)
        this.controls.update();

        this.renderer = new THREE.WebGLRenderer({ antialias: false })
        this.renderer.setClearColor('#0f0000')
        this.renderer.setSize(width, height)

        this.mount.appendChild(this.renderer.domElement)
    }

    addCube(detection, color) {
        const { x, y, mass } = detection;
        let z = mass / 5
        const geometry = new THREE.BoxGeometry(SEGMENT_WIDTH, SEGMENT_HEIGHT, z)
        const material = new THREE.MeshBasicMaterial({ transparent: true, color , opacity: 0.5})
        const cube = new THREE.Mesh(geometry, material);
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
        
        const geometry = new THREE.PlaneGeometry(640, 480);

        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(0,0,0)
        this.scene.add(mesh);

        const light = new THREE.PointLight(0xffffff, 1, 0);
        light.position.set(0, 0, 1000);
        this.scene.add(light)
    }



    addDetections() {
        this.state.detectionsByIngredient.forEach((detectionsJson, ingredientId) => {
            console.log("ingid" + ingredientId)
            console.log(detectionsJson["scan_id"]);

            const detections = JSON.parse(detectionsJson["detections"]);
            const colour = COLOURS[ingredientId]
            detections.forEach(d => this.addCube(d, COLOURS[ingredientId]))
        })
    }

    componentWillUnmount(){
        this.stop()
        this.mount.removeChild(this.renderer.domElement)
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
        // this.cube.rotation.x += 0.01
        // this.cube.rotation.y += 0.01
        this.renderScene()
        this.frameId = window.requestAnimationFrame(this.animate)
    }

    renderScene = () => {
        this.renderer.render(this.scene, this.camera)
    }

    render(){
        
        return (
            <div
                style={{ width: '640px', height: '480px' }}
                ref={(mount) => { this.mount = mount }}
            />
        );
    }
}