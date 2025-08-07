import * as THREE from 'three';

export function setupCameraOrbit(camera, renderer, radius = 5, smooth = 0.09, decay = 0.05) {
  const mouse = { x: 0, y: 0 };
  const targetMouse = { x: 0, y: 0 };
  const targetPos = new THREE.Vector3();
  const orbitCenter = new THREE.Vector3(0, 0, 0); // Mutable
  let isMouseActive = true;

  // Mouse tracking
  window.addEventListener('mousemove', (event) => {
    targetMouse.x = (event.clientX / window.innerWidth - 0.5) * 2;
    targetMouse.y = (event.clientY / window.innerHeight - 0.5) * 2;
    isMouseActive = true;
  });

  window.addEventListener('mouseleave', () => isMouseActive = false);
  window.addEventListener('blur', () => isMouseActive = false);

  let orbitEnabled = true;

  function updateCameraOrbit() {
    if (!orbitEnabled) return;

    const horizontalStrength = 0.5;
    const verticalStrength = 0.5;

    if (isMouseActive) {
      mouse.x += (targetMouse.x - mouse.x) * decay;
      mouse.y += (targetMouse.y - mouse.y) * decay;
    } else {
      mouse.x += -mouse.x * decay;
      mouse.y += -mouse.y * decay;
    }

    const clampedY = Math.max(-0.7, Math.min(0.7, mouse.y));
    const angleX = -mouse.x * horizontalStrength;
    const angleY = clampedY * verticalStrength;

    const x = orbitCenter.x + radius * Math.sin(angleX) * Math.cos(angleY);
    const y = orbitCenter.y + radius * Math.sin(angleY);
    const z = orbitCenter.z + radius * Math.cos(angleX) * Math.cos(angleY);

    targetPos.set(x, y, z);
    camera.position.lerp(targetPos, smooth);
    camera.lookAt(orbitCenter);
  }

  return {
    updateCameraOrbit,
    setOrbitCenter: (x, y, z) => orbitCenter.set(x, y, z),
    enableOrbit: () => orbitEnabled = true,
    disableOrbit: () => orbitEnabled = false
  };
}