import * as THREE from 'three';

export function setupCameraOrbit(camera, renderer, orbitCenter = new THREE.Vector3(0, 0, 0), radius = 5, smooth = 0.02) {
  const mouse = { x: 0, y: 0 };
  const targetMouse = { x: 0, y: 0 };
  const targetPos = new THREE.Vector3();

  let isMouseActive = true;

  // Track actual mouse movement
  window.addEventListener('mousemove', (event) => {
    targetMouse.x = (event.clientX / window.innerWidth - 0.5) * 2;
    targetMouse.y = -(event.clientY / window.innerHeight - 0.5) * 2;
    isMouseActive = true;
  });

  // Reset when mouse leaves window or page loses focus
  window.addEventListener('mouseleave', () => {
    isMouseActive = false;
  });
  window.addEventListener('blur', () => {
    isMouseActive = false;
  });

  return function updateCameraOrbit() {
    const horizontalStrength = 0.4;
    const verticalStrength = 0.9;
    const decay = 0.09;

    // Smoothly interpolate mouse values
    if (isMouseActive) {
      mouse.x += (targetMouse.x - mouse.x) * decay;
      mouse.y += (targetMouse.y - mouse.y) * decay;
    } else {
      // Ease back to center when mouse is inactive
      mouse.x += (0 - mouse.x) * decay;
      mouse.y += (0 - mouse.y) * decay;
    }

    const targetX = Math.sin(mouse.x * horizontalStrength) * radius;
    const targetZ = Math.cos(mouse.x * horizontalStrength) * radius;
    const targetY = 1 + mouse.y * verticalStrength;

    targetPos.set(targetX, targetY, targetZ);
    camera.position.lerp(targetPos, smooth);
    camera.lookAt(orbitCenter);
  };
}
