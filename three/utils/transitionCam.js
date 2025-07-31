export function moveCameraForward(camera, distance = 10, duration = 1.5, callback) {
  const startZ = camera.position.z;
  const endZ = startZ - distance;
  const startTime = performance.now();

  function animate(time) {
    const elapsed = (time - startTime) / 1000;
    const t = Math.min(elapsed / duration, 1);
    camera.position.z = startZ + (endZ - startZ) * t;

    if (t < 1) {
      requestAnimationFrame(animate);
    } else if (callback) {
      callback();
    }
  }

  requestAnimationFrame(animate);
}
