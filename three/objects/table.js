import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { RoundedBoxGeometry } from 'three-stdlib';

export function createDesk() {
  const group = new THREE.Group();

  const glassyGoldMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#FFD700'), // Gold color
    transparent: true,
    opacity: 0.6,
    roughness: 0.1,
    transmission: 1.0,
    ior: 1.4,
    thickness: 0.2,
    reflectivity: 0.3,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
  });

  // Desk top
  const topGeometry = new RoundedBoxGeometry(8, 0.5, 4, 5, 0.2);
  const topMesh = new THREE.Mesh(topGeometry, glassyGoldMaterial);
  topMesh.castShadow = true;
  topMesh.receiveShadow = true;
  topMesh.position.y = 0;
  group.add(topMesh);

  // Desk legs
  const legGeometry = new THREE.BoxGeometry(0.3, 4, 0.3);
  const positions = [
    [-3.5, -2.25, 1.7],
    [3.5, -2.25, 1.7],
    [-3.5, -2.25, -1.7],
    [3.5, -2.25, -1.7],
  ];

  for (const [x, y, z] of positions) {
    const leg = new THREE.Mesh(legGeometry, glassyGoldMaterial);
    leg.castShadow = true;
    leg.receiveShadow = true;
    leg.position.set(x, y, z);
    group.add(leg);
  }

  // 🔗 Create corresponding static physics body
  const deskBody = new CANNON.Body({
    mass: 0, // static
    position: new CANNON.Vec3(0, -10, 0),
    shape: new CANNON.Box(new CANNON.Vec3(4, 0.25, 2)), // approximate desk top
  });

  // Optional: add legs as compound shapes for better collision realism (can be skipped)
  const legShape = new CANNON.Box(new CANNON.Vec3(0.15, 2, 0.15));
  for (const [x, y, z] of positions) {
    deskBody.addShape(legShape, new CANNON.Vec3(x, y, z));
  }

  return { mesh: group, body: deskBody };
}
