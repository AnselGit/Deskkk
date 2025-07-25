let targetZ = 8; // Default desktop value

export function getResponsiveCameraZ(width = window.innerWidth) {
  if (width >= 1024) return 8;
  else if (width >= 768) return 10;
  else return 12;
}

export function handleResizeLerp(camera) {
  targetZ = getResponsiveCameraZ();
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

export function updateCameraZLerp(camera, lerpSpeed = 0.05) {
  camera.position.z += (targetZ - camera.position.z) * lerpSpeed;
}
