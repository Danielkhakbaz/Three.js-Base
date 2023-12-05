import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const canvas = document.querySelector(".webGL");

const clock = new THREE.Clock();

const image = new Image();
const texture = new THREE.Texture(image);

image.onload = () => {
    texture.needsUpdate = true
};
image.src = "/textures/door/roughness.jpg";

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
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
})

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
})

const scene = new THREE.Scene();

const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({
        map: texture,
    }),
);

const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);

camera.position.set(0, 0, 6);

const controls = new OrbitControls(camera, canvas);

controls.enableDamping = true;

scene.add(mesh);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
    canvas,
});

renderer.setSize(sizes.width, sizes.height);

const animation = () => {
    const elapsedTime = clock.getElapsedTime();

    mesh.rotation.y = elapsedTime * Math.PI * 0.5;

    requestAnimationFrame(animation);

    renderer.render(scene, camera);
};

animation();