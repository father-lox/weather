import {TTFLoader} from "three/examples/jsm/loaders/TTFLoader";
import {FontLoader} from "three/examples/jsm/loaders/FontLoader";

export default async function loadTemperatureFont() {
    return new TTFLoader().loadAsync('fonts/BebasNeue-Regular.ttf')
        .then(fontFace => new FontLoader().parse(fontFace));
}
