import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';

// Init
RectAreaLightUniformsLib.init();

let scene, camera, renderer;
let cubes = [];
let clock = new THREE.Clock();
let world, bodies = [];
let spinSpeeds = [];

function initThree() {
  // scene
  scene = new THREE.Scene();

  // camera
  camera = new THREE.PerspectiveCamera(
    75,window.innerWidth/window.innerHeight,0.1,1000
  );
  camera.position.z = 5;
  camera.lookAt(0,0,0);

  // renderer
  renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
  renderer.setSize(window.innerWidth,window.innerHeight);
  renderer.setClearColor('ghostwhite', 1);
  document.body.appendChild(renderer.domElement);
  
  // cannon-es physics world
  world = new CANNON.World();
  world.gravity.set(0,0,0);

  const mat = new CANNON.Material('bouncy');
  const contactMat = new CANNON.ContactMaterial(mat, mat, {
    restitution: -1, // bounce
    friction: 1,
  });
  world.addContactMaterial(contactMat);

  // objects
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshStandardMaterial({
    color:'black',
    metalness: 0.3,
    roughness: 0.5
  });

  for (let i=0; i<15; i++) {
    const cube = new THREE.Mesh(geometry,material);

    const x = randomBetween(-7, 7);
    const y = randomBetween(-4, 4);
    const z = randomBetween(-5, 3);
    cube.position.set(x, y, z);

    // cube.userData.baseY = cube.position.y;
    scene.add(cube);
    cubes.push(cube);

    // Random rotation speeds for x and y axes
    spinSpeeds.push({
      x: Math.random() * 0.001 + 0.001,
      y: Math.random() * 0.001 + 0.001
    });

    // Physics body
    const shape = new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5));
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

  // lighting
  const light = new THREE.RectAreaLight('white',100,50,1);
  light.position.set(0,0,6);
  light.lookAt(0,0,0);
  scene.add(light);

  const ambientLight = new THREE.AmbientLight('white',0.3);
  scene.add(ambientLight);

  const hemiLight = new THREE.HemisphereLight('white', 'white', 5);
  scene.add(hemiLight);

  // helper
  const lightHelper = new RectAreaLightHelper(light);
  scene.add(lightHelper);



  // controls

  // handle window resizing
  window.addEventListener('resize', onWindowResize);

  // start animation
  animate();


  function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
  }

  function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();

    // Step physics
    world.step(1 / 60, delta, 3);

    // Sync mesh with physics body
    for (let i = 0; i < cubes.length; i++) {
      cubes[i].position.copy(bodies[i].position);
      cubes[i].quaternion.copy(bodies[i].quaternion);

      // Optional: Add small manual spin if you like
      cubes[i].rotation.x += spinSpeeds[i].x;
      cubes[i].rotation.y += spinSpeeds[i].y;
    }
    light.rotation.z += 0.0008;
    renderer.render(scene, camera);
  }

}

export default initThree;