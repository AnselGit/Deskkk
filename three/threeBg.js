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

let world;
let objects = [], bodies = [], spinSpeeds = [];
let updateCameraOrbitFn;
let setOrbitCenter;
const clock = new THREE.Clock();

export default function initThree() {

  // --- Scene ---
  const scene = new THREE.Scene();

  // --- Camera ---
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 5)
  window.addEventListener('resize', () => handleResizeLerp(camera));

  // --- Renderer ---
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor('ghostwhite', 1);
  //shadows
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  document.body.appendChild(renderer.domElement);

  // --- Camera Orbit ---
  ({ updateCameraOrbit: updateCameraOrbitFn, setOrbitCenter } = setupCameraOrbit(camera, renderer));


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

  for (let i = 0; i < 10; i++) {
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



  // --- Add Desk ---
  const { mesh: deskMesh, body: deskBody } = createDesk();
  deskMesh.position.set(0, -10, 0); 
  scene.add(deskMesh);
  world.addBody(deskBody);


  // --- Lighting ---
  const light = new THREE.RectAreaLight('white', 100, 50, 1);
  light.position.set(0, 0, 6);
  light.lookAt(0, 0, 0);
  scene.add(light);

  // Create a SpotLight
const spotLight = new THREE.SpotLight('white');
spotLight.position.set(0, 14, 0); // Position the light
spotLight.target.position.set(0, -15, 0); // Point the light at the origin
spotLight.intensity = 1000; // Increase intensity
spotLight.distance = 1000; // Set a distance limit
spotLight.decay = 2; // Add some decay
spotLight.castShadow = true; // Enable shadow casting

// Add to the scene
scene.add(spotLight);
scene.add(spotLight.target); // Important for target to be part of the scene graph

// Add a helper (optional, for visualization)
const helper = new THREE.SpotLightHelper(spotLight);
scene.add(helper);

// In your render loop, if using a helper
// helper.update();

  // --- Resize Handling ---
  window.addEventListener('resize', onWindowResize);


  // ✅ Initialize orbit system
  const orbitSystem = setupCameraOrbit(camera, renderer);

  // ✅ Store function references
  updateCameraOrbitFn = orbitSystem.updateCameraOrbit;
  setOrbitCenter = orbitSystem.setOrbitCenter;



  // --- Start Animation Loop ---
  animate();
  
  return { camera, renderer ,renderer, setOrbitCenter: orbitSystem.setOrbitCenter};



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

    if (updateCameraOrbitFn) updateCameraOrbitFn();
    updateCameraZLerp(camera);
    helper.update();

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