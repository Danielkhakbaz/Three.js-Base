import * as THREE from "three";

const clock = new THREE.Clock();

const canvas = document.querySelector(".webGL");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);

camera.position.set(0, 0, 6);

scene.add(camera);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);

scene.add(ambientLight);

const material = new THREE.MeshStandardMaterial();
material.roughness = 0.4;

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    material
);
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
);
const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 20, 45),
    material
);

cube.rotation.set(0, 0, 6);
sphere.rotation.set(0, 0, 6);
torus.rotation.set(0, 0, 6);

sphere.position.set(-2, 0, 0);
torus.position.set(2, 0, 0);

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    new THREE.MeshBasicMaterial({
        color: "gray",
    })
);

plane.rotation.x = - Math.PI * 0.5;
plane.position.y = - 0.65;

scene.add(cube, sphere, torus, plane);

const renderer = new THREE.WebGLRenderer({
    canvas,
});

renderer.setSize(window.innerWidth, window.innerHeight);

const animation = () => {
    const elapsedTime = clock.getElapsedTime();
    
    renderer.render(scene, camera);

    cube.rotation.x = elapsedTime * Math.PI * 0.1;
    sphere.rotation.x = elapsedTime * Math.PI * 0.1;
    torus.rotation.x = elapsedTime * Math.PI * 0.1;

    requestAnimationFrame(animation);
};

animation();