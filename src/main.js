import * as THREE from 'three';

let scene, camera, renderer;
let cubes = [];
let clock = new THREE.clock();

function initThree() {
  // scene
  scene = new THREE.scene();

  // camera
  camera = new THREE.PerspectiveCamera(
    75,window.innerWidth/window.innerHeight,0.1,1000
  );
  camera.position.z = 5;

  // renderer
  renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
  renderer.setSize(window.innerWidth,window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // objects
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshStandardMaterial({color:0x4fd1c5 });

  for (let i=0; i<5; i++) {
    const cube = new THREE.Mesh(geometry,material);
    cube.position.set(Math.random
  }


}