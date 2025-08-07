import * as THREE from 'three';

export function setupCameraOrbit(
  camera,
  renderer,
  radius = 0,
  smooth = 0,
  decay = 0,
  horizontalStrength = 0,
  verticalStrength = 0
) {

  const mouse = { x: 0, y: 0 };
  const targetMouse = { x: 0, y: 0 };
  const targetPos = new THREE.Vector3();
  const orbitCenter = new THREE.Vector3(0, 0, 0);
  let isMouseActive = true;
  let currentHorizontal = horizontalStrength;
  let currentVertical = verticalStrength;
  let orbitEnabled = true;

  // Orbit parameters (make mutable)
  let currentRadius = radius;
  let currentSmooth = smooth;
  let currentDecay = decay;

  // Mouse listeners
  window.addEventListener('mousemove', (event) => {
    targetMouse.x = (event.clientX / window.innerWidth - 0.5) * 2;
    targetMouse.y = (event.clientY / window.innerHeight - 0.5) * 2;
    isMouseActive = true;
  });

  window.addEventListener('mouseleave', () => isMouseActive = false);
  window.addEventListener('blur', () => isMouseActive = false);

  function updateCameraOrbit() {
    if (!orbitEnabled) return;

    if (isMouseActive) {
      mouse.x += (targetMouse.x - mouse.x) * currentDecay;
      mouse.y += (targetMouse.y - mouse.y) * currentDecay;
    } else {
      mouse.x += -mouse.x * currentDecay;
      mouse.y += -mouse.y * currentDecay;
    }

    const clampedY = Math.max(-0.7, Math.min(0.7, mouse.y));
    const angleX = -mouse.x * currentHorizontal;
    const angleY = clampedY * currentVertical;

    const x = orbitCenter.x + currentRadius * Math.sin(angleX) * Math.cos(angleY);
    const y = orbitCenter.y + currentRadius * Math.sin(angleY);
    const z = orbitCenter.z + currentRadius * Math.cos(angleX) * Math.cos(angleY);

    targetPos.set(x, y, z);
    camera.position.lerp(targetPos, currentSmooth);
    camera.lookAt(orbitCenter);
  }

  return {
    updateCameraOrbit,
    setOrbitCenter: (x, y, z) => orbitCenter.set(x, y, z),
    enableOrbit: () => orbitEnabled = true,
    disableOrbit: () => orbitEnabled = false,
    setParams: (newRadius, newSmooth, newDecay) => {
      radius = newRadius;
      smooth = newSmooth;
      decay = newDecay;
    },
    setStrengths: (h, v) => {
      currentHorizontal = h;
      currentVertical = v;
    }
  };
}
