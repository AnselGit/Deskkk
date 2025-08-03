import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three-stdlib';

export function createDesk() {
  const group = new THREE.Group();

  // Glassy desk surface
  const deskMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#ffffff'),
    transparent: true,
    opacity: 0.25,
    roughness: 0.1,
    metalness: 0.05,
    transmission: 1.0,
    thickness: 1.5,
    ior: 1.4,
    reflectivity: 0.3,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
  });

  // Desk top
  const deskTop = new THREE.Mesh(
    new RoundedBoxGeometry(4, 0.1, 2, 5, 0.15),
    deskMaterial
  );
  deskTop.position.y = 1;
  group.add(deskTop);

  // Desk legs (4)
  const legMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#cccccc'),
    roughness: 0.5,
    metalness: 0.8,
  });

  const legGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1, 12);

  const legPositions = [
    [-1.85, 0.5, -0.85],
    [1.85, 0.5, -0.85],
    [-1.85, 0.5, 0.85],
    [1.85, 0.5, 0.85],
  ];

  legPositions.forEach(([x, y, z]) => {
    const leg = new THREE.Mesh(legGeometry, legMaterial);
    leg.position.set(x, y, z);
    group.add(leg);
  });

  // Lamp base
  const lampBaseMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#ffffff'),
    transparent: true,
    opacity: 0.3,
    transmission: 1,
    roughness: 0.05,
    thickness: 1.0,
    ior: 1.4,
    metalness: 0.2,
  });

  const lampBase = new THREE.Mesh(
    new RoundedBoxGeometry(0.3, 0.05, 0.3, 4, 0.05),
    lampBaseMaterial
  );
  lampBase.position.set(1.5, 1.05, -0.8);
  group.add(lampBase);

  // Lamp stand
  const lampStand = new THREE.Mesh(
    new THREE.CylinderGeometry(0.025, 0.025, 0.6, 12),
    lampBaseMaterial
  );
  lampStand.position.set(1.5, 1.35, -0.8);
  group.add(lampStand);

  // Lamp head
  const lampHeadMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffee88,
    emissive: 0xffffaa,
    emissiveIntensity: 1.0,
    metalness: 0.2,
    roughness: 0.3,
    transparent: true,
    opacity: 0.5,
    transmission: 1.0,
    thickness: 0.3,
  });

  const lampHead = new THREE.Mesh(
    new THREE.SphereGeometry(0.15, 16, 16),
    lampHeadMaterial
  );
  lampHead.position.set(1.5, 1.65, -0.8);
  lampHead.rotation.x = -0.5;
  group.add(lampHead);

  // Optional: Light source
  const light = new THREE.PointLight(0xfff2cc, 1.2, 3);
  light.position.copy(lampHead.position);
  group.add(light);

  return group;
}
