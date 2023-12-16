import {Material, Mesh, MeshPhongMaterial} from "three";
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry';
import {Font} from "three/examples/jsm/loaders/FontLoader";

export default function makeTemperatureText(text: string, font: Font): {
    mesh: Mesh,
    geometry: TextGeometry,
    material: Material
} {
    const geometry = new TextGeometry(text, {
        font: font,
        size: 1,
        height: 0.2,
        curveSegments: 32,
        bevelEnabled: true,
        bevelThickness: .02,
        bevelSize: .02,
        bevelSegments: 16
    });

    const material = new MeshPhongMaterial({
        color: 0xededed,
    });

    const mesh = new Mesh(geometry, material);
    geometry.computeBoundingBox();
    geometry.rotateY(3 * Math.PI / 2);

    return {
        mesh: mesh,
        geometry: geometry,
        material: material
    };
}
