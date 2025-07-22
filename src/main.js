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
    cube.position.set(Math.random() * 4-2, Math.random() * 4-2, Math.random() * 2-1);
    scene.add(cube);
    cubes.push(cube);
  }

  // lighting
  const ambientLight = new THREE.ambientLight(0xffffff,0.6);
  scene.add(ambientLight);

  const pointLight = new THREE.pointLight(0xffffff,1);
  pointLight.position.set(5,5,5);
  scene.add(pointLight);

  // controls

  // handle window resizing
  window.addEventListener('resize', onWindowResize);

  // start animation




  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
  }

  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    cube.foreach((cube, index) => {
      cubes.rotate.x += 0.01;
      cube.rotation.y += 0.01;
      cube.position.y = Math.sin(t+index)*0.5; // floating effect
    })
    renderer.render(scene, camera);
  }
}

export default initThree;