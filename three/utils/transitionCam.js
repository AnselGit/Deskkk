export function moveCameraTo(camera, target = {}, duration = 1.5, callback) {
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

  function animate(time) {
    const elapsed = (time - startTime) / 1000;
    const t = Math.min(elapsed / duration, 1);

    camera.position.x = start.x + (end.x - start.x) * t;
    camera.position.y = start.y + (end.y - start.y) * t;
    camera.position.z = start.z + (end.z - start.z) * t;

    if (t < 1) {
      requestAnimationFrame(animate);
    } else if (callback) {
      callback();
    }
  }

  requestAnimationFrame(animate);
}
