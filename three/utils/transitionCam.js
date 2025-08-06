export function moveCameraTo(camera, target = {}, duration = 1.5, callback, orbitSystem, options = {}) {
  const { easing = true } = options;

  const start = {
    x: camera.position.x,
    y: camera.position.y,
    z: camera.position.z,
  };

  const end = {
    x: target.x !== undefined ? target.x : start.x,
    y: target.y !== undefined ? target.y : start.y,
    z: target.z !== undefined ? target.z : start.z,
  };

  const startTime = performance.now();

  function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  if (orbitSystem?.disableOrbit) orbitSystem.disableOrbit();

  function animate(time) {
    const elapsed = (time - startTime) / 1000;
    const rawT = Math.min(elapsed / duration, 1);

    // Use easing only if enabled
    const t = easing ? easeInOutQuad(rawT) : rawT;

    camera.position.x = start.x + (end.x - start.x) * t;
    camera.position.y = start.y + (end.y - start.y) * t;
    camera.position.z = start.z + (end.z - start.z) * t;

    if (rawT < 1) {
      requestAnimationFrame(animate);
    } else {
      if (orbitSystem?.enableOrbit) orbitSystem.enableOrbit();
      if (callback) callback();
    }
  }

  requestAnimationFrame(animate);
}
