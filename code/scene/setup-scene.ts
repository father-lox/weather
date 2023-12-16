import * as THREE from 'three';
import {BoxGeometry, Mesh, MeshBasicMaterial, MeshPhongMaterial, MeshPhysicalMaterial, Scene, Vector3} from "three";
import makeTemperatureText from "./make-temperature-text";
import loadTemperatureFont from "./load-temperature-font";
import setupRenderer from "./setup-renderer";
import setupCamera from "./setup-cammera";
import setupEnvironment from "./setup-environment";

export default async function setupScene(temperature: string) {
    const scene: Scene = new THREE.Scene();

    setupEnvironment(scene);

    const {mesh: object, geometry: objectGeometry} = makeTemperatureText(temperature, await loadTemperatureFont());
    const platform = makePlatform();

    object.geometry.boundingBox.getCenter(platform.position);

    // let textSize: Vector3 = object.geometry.boundingBox.getSize().y;

    // platform.position.y -= textSize.y;

    scene.add(object);
    // scene.add(platform);

    const renderer = setupRenderer();
    const {cameraController, camera} = setupCamera(objectGeometry, renderer);

    loop();

    function loop() {
        requestAnimationFrame(loop);

        cameraController.update();

        renderer.render(scene, camera);
    }
}

function makePlatform() {
    const geometry = new BoxGeometry(1, 1, 1);
    geometry.computeBoundingBox();

    const material = new MeshPhongMaterial({color: 0xffffff});

    const platform: Mesh = new Mesh(geometry, material);

    return platform;
}
