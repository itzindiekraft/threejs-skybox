import * as THREE from "three";
import { OrbitControls } from "orbitControls";

let scene, camera, renderer;
let init = () => {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    30000,
  );
  camera.position.set(-900, -200, -900);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  let controls = new OrbitControls(camera, renderer.domElement);
  controls.addEventListener("change", renderer);
  controls.minDistance = 500;
  controls.maxDistance = 2000;

  let materialArray = [];
  let texture_lf = new THREE.TextureLoader().load("./assets/hdri2/px.png");
  let texture_ft = new THREE.TextureLoader().load("./assets/hdri2/nx.png");
  let texture_rt = new THREE.TextureLoader().load("./assets/hdri2/py.png");
  let texture_dn = new THREE.TextureLoader().load("./assets/hdri2/ny.png");
  let texture_up = new THREE.TextureLoader().load("./assets/hdri2/pz.png");
  let texture_bk = new THREE.TextureLoader().load("./assets/hdri2/nz.png");

  materialArray.push(new THREE.MeshBasicMaterial({ map: texture_lf }));
  materialArray.push(new THREE.MeshBasicMaterial({ map: texture_ft }));
  materialArray.push(new THREE.MeshBasicMaterial({ map: texture_rt }));
  materialArray.push(new THREE.MeshBasicMaterial({ map: texture_dn }));
  materialArray.push(new THREE.MeshBasicMaterial({ map: texture_up }));
  materialArray.push(new THREE.MeshBasicMaterial({ map: texture_bk }));

  for (let i = 0; 6 > i; i++) {
    materialArray[i].side = THREE.BackSide;
  }

  let skyboxGeo = new THREE.BoxGeometry(10000, 10000, 10000);
  let skybox = new THREE.Mesh(skyboxGeo, materialArray);
  scene.add(skybox);

  animate();
};

let animate = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};

init();
