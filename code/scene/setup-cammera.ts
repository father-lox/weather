import {Material, PerspectiveCamera, WebGLRenderer} from "three";
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {TextGeometry} from "three/examples/jsm/geometries/TextGeometry";

export default function setupCamera(focusObject: TextGeometry, renderer: WebGLRenderer): { camera: PerspectiveCamera, cameraController: OrbitControls } {
    const camera: PerspectiveCamera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(1, 1, 3);

    const cameraController = new OrbitControls(camera, renderer.domElement);

    cameraController.enableDamping = true;
    cameraController.dampingFactor = .005;
    cameraController.enableZoom = false;

    cameraController.minAzimuthAngle = 7 * Math.PI / 6;
    cameraController.maxAzimuthAngle = 11 * Math.PI / 6;

    cameraController.minPolarAngle = Math.PI / 4;
    cameraController.maxPolarAngle = Math.PI / 2;

    focusObject.boundingBox.getCenter(cameraController.target);
    cameraController.update();

    return {
        camera: camera,
        cameraController: cameraController
    };
}
