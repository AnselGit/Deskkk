import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three-stdlib';

export function createDesk() {
  const group = new THREE.Group();

  // Wooden desk surface
  const deskMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#8B4513'), // SaddleBrown
    roughness: 0.6,
    metalness: 0.2,
  });

  const deskTop = new THREE.Mesh(
    new RoundedBoxGeometry(3, 0.1, 2, 5, 0.15),
    deskMaterial
  );
  deskTop.position.y = 1;
  group.add(deskTop);

  // Black metallic legs
  const legMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#000000'),
    roughness: 0.4,
    metalness: 1.0,
  });

  const legGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1, 12);

  const legPositions = [
    [-1.40, 0.5, -0.85],
    [1.40, 0.5, -0.85],
    [-1.40, 0.5, 0.85],
    [1.40, 0.5, 0.85],
  ];

  legPositions.forEach(([x, y, z]) => {
    const leg = new THREE.Mesh(legGeometry, legMaterial);
    leg.position.set(x, y, z);
    leg.castShadow = true;         // ✅ Moved inside
    leg.receiveShadow = true;      // (optional)
    group.add(leg);
  });

  // Lamp base (metallic)
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

  // Lamp stand
  const lampStand = new THREE.Mesh(
    new THREE.CylinderGeometry(0.025, 0.025, 0.6, 12),
    lampBaseMaterial
  );
  lampStand.position.set(1.25, 1.35, -0.8);
  group.add(lampStand);

  // Lamp head (directional)
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
  group.add(lampHead);

  // Realistic spotlight
  const spotLight = new THREE.SpotLight(0xffee00, 5, 10, Math.PI / 6, 0.3, 2);
  spotLight.position.copy(lampHead.position);
  spotLight.target.position.set(1.5, 0.5, -0.8); // pointing downward to desk
  group.add(spotLight);
  group.add(spotLight.target);

  //shadow
  deskTop.castShadow = true;
  deskTop.receiveShadow = true;
  lampHead.castShadow = true;

  group.scale.set(2, 2, 2); // Optional scaling

  return group;
}
