import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

const canvas = document.querySelector(".webGL");

const clock = new THREE.Clock();

const textureLoader = new THREE.TextureLoader();

const doorTexture = textureLoader.load("/textures/door/door.jpg");
const matcap1Texture = textureLoader.load("/textures/matcaps/1.png");

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

window.addEventListener("resize", () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
});

window.addEventListener("dblclick", () => {
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement;

    if (!fullscreenElement) {
        if (canvas.requestFullscreen) {
            canvas.requestFullscreen();
        } else if (canvas.webkitRequestFullscreen) {
            canvas.webkitRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
});

const scene = new THREE.Scene();

const fontLoader = new FontLoader();

fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
    const textGeometry = new TextGeometry("Danial", {
        font: font,
        size: 0.5,
        height: 0.2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5
    });

    textGeometry.center();

    const textMaterial = new THREE.MeshMatcapMaterial({
        color: "white",
    });

    const text = new THREE.Mesh(textGeometry, textMaterial);

    scene.add(text);
})

const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({
        map: doorTexture,
    })
);

const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);
const donutMaterial = new THREE.MeshMatcapMaterial({
    matcap: matcap1Texture,
});

for (let i=0; i<99; i++) {
    const donut = new THREE.Mesh(donutGeometry, donutMaterial);

    donut.position.set((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10);

    donut.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);

    const scale = Math.random();

    donut.scale.set(scale, scale, scale);

    scene.add(donut);
}

scene.add(mesh);

const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);

camera.position.set(0, 0, 6);

scene.add(camera);

const controls = new OrbitControls(camera, canvas);

controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({
    canvas,
});

renderer.setSize(sizes.width, sizes.height);

const animation = () => {
    const elapsedTime = clock.getElapsedTime();

    renderer.render(scene, camera);

    mesh.rotation.y = elapsedTime * Math.PI * 0.5;

    requestAnimationFrame(animation);
};

animation();