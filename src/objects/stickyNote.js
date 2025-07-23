import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three-stdlib';

export function createStickyNote() {
  const size = 0.9;
  const depth = 0.01;

  // Choose a random vibrant color
  const colors = ['#00FFFF', '#FF00FF', '#FFD700', '#FFA500', '#EE82EE'];
  const color = colors[Math.floor(Math.random() * colors.length)];

  const geometry = new RoundedBoxGeometry(size, size, depth, 3, 0.04);
  const material = new THREE.MeshStandardMaterial({
    color,
    roughness: 0.4,
    metalness: 0.1,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;

  return mesh;
}
