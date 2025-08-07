import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';

import { createBook } from './objects/book.js';
import { createPencil } from './objects/pencil.js';
import { createStickyNote } from './objects/stickyNote.js';
import { createFlashCard } from './objects/flashCard.js';
import { createDesk } from './objects/table.js';

import { setupCameraOrbit } from './utils/cameraOrbit.js';
import { getResponsiveCameraZ, handleResizeLerp, updateCameraZLerp } from './utils/responsiveCam.js';

RectAreaLightUniformsLib.init();

let world, objects = [], bodies = [], spinSpeeds = [];
let updateCameraOrbitFn;
const clock = new THREE.Clock();

export default function initThree() {
  // --- Scene ---
  const scene = new THREE.Scene();

  // --- Camera ---
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 8);
  window.addEventListener('resize', () => handleResizeLerp(camera));

  // --- Renderer ---
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor('ghostwhite', 1);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  document.body.appendChild(renderer.domElement);

  // --- Camera Orbit ---
  const { updateCameraOrbit, setOrbitCenter } = setupCameraOrbit(camera, renderer);
  updateCameraOrbitFn = updateCameraOrbit;

  // --- Physics ---
  world = new CANNON.World();
  world.gravity.set(0, 0, 0);
  const mat = new CANNON.Material('bouncy');
  const contactMat = new CANNON.ContactMaterial(mat, mat, {
    restitution: -1,
    friction: 1
  });
  world.addContactMaterial(contactMat);

  // --- Floating Objects ---
  const creators = [createBook, createPencil, createStickyNote, createFlashCard];
  for (let i = 0; i < 25; i++) {
    const createFn = creators[Math.floor(Math.random() * creators.length)];
    const object = createFn();
    const x = randomBetween(-7, 7);
    const y = randomBetween(-4, 4);
    const z = randomBetween(-5, 3);

    object.position.set(x, y, z);
    scene.add(object);
    objects.push(object);
    spinSpeeds.push({ x: Math.random() * 0.001 + 0.001, y: Math.random() * 0.001 + 0.001 });

    let shape;
    if (createFn === createBook) shape = new CANNON.Box(new CANNON.Vec3(0.6, 0.8, 0.1));
    else if (createFn === createPencil) shape = new CANNON.Box(new CANNON.Vec3(0.1, 0.9, 0.1));
    else if (createFn === createStickyNote) shape = new CANNON.Box(new CANNON.Vec3(0.45, 0.45, 0.005));
    else if (createFn === createFlashCard) shape = new CANNON.Box(new CANNON.Vec3(0.8, 0.5, 0.05));

    const body = new CANNON.Body({
      mass: 1,
      shape,
      material: mat,
      position: new CANNON.Vec3(x, y, z),
      angularVelocity: new CANNON.Vec3(randomBetween(-0.1, 0), randomBetween(0, -0.1), randomBetween(-0.1, 0)),
      linearDamping: 0.01,
      angularDamping: 0.01
    });

    world.addBody(body);
    bodies.push(body);
  }

  // --- Desk ---
  const { mesh: deskMesh, body: deskBody } = createDesk();
  deskMesh.position.set(0, -10, 0);
  scene.add(deskMesh);
  world.addBody(deskBody);

  // --- Lights ---
  const areaLight = new THREE.RectAreaLight('white', 100, 50, 1);
  areaLight.position.set(0, 0, 6);
  areaLight.lookAt(0, 0, 0);
  scene.add(areaLight);

  const spotLight = new THREE.SpotLight('white');
  spotLight.position.set(0, 14, 0);
  spotLight.target.position.set(0, -15, 0);
  spotLight.intensity = 1000;
  spotLight.distance = 1000;
  spotLight.decay = 2;
  spotLight.castShadow = true;
  scene.add(spotLight);
  scene.add(spotLight.target);

  const helper = new THREE.SpotLightHelper(spotLight);
  scene.add(helper);

  window.addEventListener('resize', onWindowResize);

  animate();

  const orbitSystem = setupCameraOrbit(camera, renderer);
  updateCameraOrbitFn = orbitSystem.updateCameraOrbit;

  return {
    camera,
    renderer,
    setOrbitCenter: orbitSystem.setOrbitCenter,
    orbitSystem
  };


  function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    world.step(1 / 60, delta, 3);

    if (updateCameraOrbitFn) updateCameraOrbitFn();
    updateCameraZLerp(camera);
    helper.update();

    for (let i = 0; i < objects.length; i++) {
      objects[i].position.copy(bodies[i].position);
      objects[i].quaternion.copy(bodies[i].quaternion);
      objects[i].rotation.x += spinSpeeds[i].x;
      objects[i].rotation.y += spinSpeeds[i].y;
    }

    areaLight.rotation.z += 0.0008;
    renderer.render(scene, camera);
  }

  function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
