import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three-stdlib';

export function createDesk() {
  const group = new THREE.Group();

  // ✅ Reusable Glassy Gold Material (OOP-style)
  const glassGoldMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#ff7b00'),
    // color: new THREE.Color('white'),
    transparent: true,
    opacity: 0.6,
    roughness: 2,
    transmission: 1.0,
    ior: 1.4,
    thickness: 0.2,
    reflectivity: 0.4,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    metalness: 0.1,
  });

  // 🟡 Desk Top (Glass-Gold)
  const deskTop = new THREE.Mesh(
    new RoundedBoxGeometry(3, 0.1, 2, 5, 0.15),
    glassGoldMaterial
  );
  deskTop.position.y = 1;
  deskTop.castShadow = true;
  deskTop.receiveShadow = true;
  group.add(deskTop);

  // 🟡 Legs (Glass-Gold)
  const legGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1.5, 12);
  const legPositions = [
    [-1.40, 0.25, -0.85],
    [1.40, 0.25, -0.85],
    [-1.40, 0.25, 0.85],
    [1.40, 0.25, 0.85],
  ];

  legPositions.forEach(([x, y, z]) => {
    const leg = new THREE.Mesh(legGeometry, glassGoldMaterial);
    leg.position.set(x, y, z);
    leg.castShadow = true;
    leg.receiveShadow = true;
    group.add(leg);
  });

  // Lamp base (unchanged)
  const lampBaseMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#222222'),
    roughness: 0.3,
    metalness: 1.0,
  });

  const lampBase = new THREE.Mesh(
    new RoundedBoxGeometry(0.3, 0.05, 0.3, 4, 0.05),
    lampBaseMaterial
  );
  lampBase.position.set(1.25, 1.05, -0.8);
  group.add(lampBase);

  // Lamp stand (unchanged)
  const lampStand = new THREE.Mesh(
    new THREE.CylinderGeometry(0.025, 0.025, 0.6, 12),
    lampBaseMaterial
  );
  lampStand.position.set(1.25, 1.35, -0.8);
  group.add(lampStand);

  // Lamp head (unchanged)
  const lampHeadMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#ffffcc'),
    emissive: new THREE.Color('#ffffaa'),
    emissiveIntensity: 1.5,
    roughness: 0.3,
    metalness: 0.2,
  });

  const lampHead = new THREE.Mesh(
    new THREE.SphereGeometry(0.15, 16, 16),
    lampHeadMaterial
  );
  lampHead.position.set(1.25, 1.65, -0.8);
  lampHead.rotation.x = -0.5;
  lampHead.castShadow = true;
  group.add(lampHead);

  group.scale.set(2, 2, 2);

  return group;
}
