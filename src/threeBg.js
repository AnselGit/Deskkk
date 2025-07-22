import * as THREE from 'three';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';

// Init
RectAreaLightUniformsLib.init();

let scene, camera, renderer;
let cubes = [];
let clock = new THREE.Clock();
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
  renderer.setClearColor(0xffffff, 1);
  document.body.appendChild(renderer.domElement);

  // objects
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshStandardMaterial({
    color:'black',
    metalness: 0.3,
    roughness: 0.5
  });

  for (let i=0; i<15; i++) {
    const cube = new THREE.Mesh(geometry,material);
    cube.position.set(
      randomBetween(-7, 7),  
      randomBetween(-4, 4),  
      randomBetween(-5, 3)
    );
    // cube.userData.baseY = cube.position.y;
    scene.add(cube);
    cubes.push(cube);

    // Random rotation speeds for x and y axes
    spinSpeeds.push({
      x: Math.random() * 0.001 + 0.001,
      y: Math.random() * 0.001 + 0.001
    });
  }

  // lighting
  const light = new THREE.RectAreaLight('white',100,50,1);
  light.position.set(0,0,6);
  light.lookAt(0,0,0);
  scene.add(light);

  const ambientLight = new THREE.AmbientLight('blue',0.3);
  scene.add(ambientLight);

  const hemiLight = new THREE.HemisphereLight('violet', 'darkblue', 2);
  scene.add(hemiLight);

  // helper
  const lightHelper = new RectAreaLightHelper(light);
  // scene.add(lightHelper);



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
    const t = clock.getElapsedTime();

    cubes.forEach((cube, index) => {
      light.rotation.z += 0.0005;
      cube.rotation.x += spinSpeeds[index].x;
      cube.rotation.y += spinSpeeds[index].y;
    })
    renderer.render(scene, camera);
  }
}

export default initThree;