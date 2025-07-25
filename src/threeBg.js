import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';

import { createBook } from './objects/book.js';
import { createPencil } from './objects/pencil.js';
import { createStickyNote } from './objects/stickyNote.js';
import { createFlashCard } from './objects/flashCard.js';

import { setupCameraOrbit } from './utils/cameraOrbit.js';
import { getResponsiveCameraZ, handleResizeLerp, updateCameraZLerp } from './utils/responsiveCam.js';

RectAreaLightUniformsLib.init();

let scene, camera, renderer, world;
let objects = [], bodies = [], spinSpeeds = [];
const clock = new THREE.Clock();

function initThree() {
  // --- Scene ---
  scene = new THREE.Scene();

  // --- Camera ---
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;
  camera.lookAt(0, 0, getResponsiveCameraZ());
  window.addEventListener('resize', () => handleResizeLerp(camera));

  // --- Renderer ---
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor('ghostwhite', 1);
  document.body.appendChild(renderer.domElement);

  // --- Camera Orbit ---
  const updateCameraOrbit = setupCameraOrbit(camera, renderer);

  // --- Physics World ---
  world = new CANNON.World();
  world.gravity.set(0, 0, 0);

  const mat = new CANNON.Material('bouncy');
  const contactMat = new CANNON.ContactMaterial(mat, mat, {
    restitution: -1,
    friction: 1
  });
  world.addContactMaterial(contactMat);

  // --- Objects Creation ---
  const creators = [createBook, createPencil, createStickyNote, createFlashCard];

  for (let i = 0; i < 30; i++) {
    const createFn = creators[Math.floor(Math.random() * creators.length)];
    const object = createFn();

    const x = randomBetween(-7, 7);
    const y = randomBetween(-4, 4);
    const z = randomBetween(-5, 3);
    object.position.set(x, y, z);

    scene.add(object);
    objects.push(object);

    spinSpeeds.push({
      x: Math.random() * 0.001 + 0.001,
      y: Math.random() * 0.001 + 0.001
    });

    let shape;
    if (createFn === createBook) {
      shape = new CANNON.Box(new CANNON.Vec3(0.6, 0.8, 0.1)); // Book size
    } else if (createFn === createPencil) {
      shape = new CANNON.Box(new CANNON.Vec3(0.1, 0.9, 0.1)); // Pencil size
    } else if (createFn === createStickyNote) {
      shape = new CANNON.Box(new CANNON.Vec3(0.45, 0.45, 0.005)); // StickyNote size
    } else if (createFn === createFlashCard) {
      shape = new CANNON.Box(new CANNON.Vec3(0.8, 0.5, 0.05)); // FlashCard size
    }

    const body = new CANNON.Body({
      mass: 1,
      shape,
      material: mat,
      position: new CANNON.Vec3(x, y, z),
      angularVelocity: new CANNON.Vec3(
        randomBetween(-0.1, 0),
        randomBetween(0, -0.1),
        randomBetween(-0.1, 0)
      ),
      linearDamping: 0.01,
      angularDamping: 0.01
    });

    world.addBody(body);
    bodies.push(body);
  }

  // --- Lighting ---
  const light = new THREE.RectAreaLight('white', 100, 50, 1);
  light.position.set(0, 0, 6);
  light.lookAt(0, 0, 0);
  scene.add(light);

  scene.add(new THREE.AmbientLight('white', 0.3));
  scene.add(new THREE.HemisphereLight('white', 'white', 5));

  // --- Resize Handling ---
  window.addEventListener('resize', onWindowResize);

  // --- Start Animation Loop ---
  animate();

  // --- Utility Functions ---
  function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    world.step(1 / 60, delta, 3);

    updateCameraOrbit();
    updateCameraZLerp(camera);

    for (let i = 0; i < objects.length; i++) {
      objects[i].position.copy(bodies[i].position);
      objects[i].quaternion.copy(bodies[i].quaternion);

      // Optional spin
      objects[i].rotation.x += spinSpeeds[i].x;
      objects[i].rotation.y += spinSpeeds[i].y;
    }

    light.rotation.z += 0.0008;
    renderer.render(scene, camera);
  }
}

export default initThree;
