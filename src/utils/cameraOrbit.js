// cameraOrbit.js
import * as THREE from 'three';

export function setupCameraOrbit(camera, renderer, orbitCenter = new THREE.Vector3(0, 0, 0), radius = 4, smooth = 0.05) {
  const mouse = { x: 0, y: 0 };
  const targetPos = new THREE.Vector3();

  window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth - 0.5) * 2;
    mouse.y = -(event.clientY / window.innerHeight - 0.5) * 2;
  });

  return function updateCameraOrbit() {
    const targetX = Math.sin(mouse.x) * radius;
    const targetZ = Math.cos(mouse.x) * radius;
    const targetY = 1 + mouse.y * 1.5;

    targetPos.set(targetX, targetY, targetZ);
    camera.position.lerp(targetPos, smooth);
    camera.lookAt(orbitCenter);

  };
}
