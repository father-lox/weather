import {WebGLRenderer} from "three";
import * as THREE from "three";

export default function setupRenderer(): WebGLRenderer {
    const renderer: WebGLRenderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);

    return renderer;
}
