import * as THREE from "three";
import { Scene } from "three";

export default function setupEnvironment(scene: Scene) {
    scene.background = new THREE.Color().setHex(0xFAFFC5);
    scene.fog = new THREE.Fog(scene.background, 1, 5000);

    setLighting(scene);
    setScyDome(scene);
}

function setLighting(scene: Scene) {
    const hemiLight = new THREE.HemisphereLight(0xB3FCFF, 0xFFFAE1, 2);
    hemiLight.color.setHSL(0.6, 1, 0.6);
    hemiLight.groundColor.setHSL(0.095, 1, 0.75);
    hemiLight.position.set(0, 50, 0);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 3);
    dirLight.color.setHSL(0.1, 1, 0.95);
    dirLight.position.set(- 1, 1.75, 1);
    dirLight.position.multiplyScalar(30);
    scene.add(dirLight);

    dirLight.castShadow = true;

    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;

    const d = 50;

    dirLight.shadow.camera.left = - d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = - d;

    dirLight.shadow.camera.far = 3500;
    dirLight.shadow.bias = - 0.0001;

    const dirLightHelper = new THREE.DirectionalLightHelper(dirLight, 10);
    scene.add(dirLightHelper);
}

function setScyDome(scene: Scene) {
    const hemiLight = new THREE.HemisphereLight(0xB3FCFF, 0xFFFAE1, 2);

    const uniforms = {
        'topColor': { value: new THREE.Color(0x0077ff) },
        'bottomColor': { value: new THREE.Color(0xffffff) },
        'offset': { value: 33 },
        'exponent': { value: 0.6 }
    };
    uniforms['topColor'].value.copy(hemiLight.color);

    scene.fog.color.copy(uniforms['bottomColor'].value);

    const skyGeo = new THREE.SphereGeometry(4000, 32, 15);
    const skyMat = new THREE.ShaderMaterial({
        uniforms: uniforms,
        side: THREE.BackSide
    });

    const sky = new THREE.Mesh(skyGeo, skyMat);
    scene.add(sky);
}
