import * as THREE from 'three';

export function createPencil() {
  const pencilGroup = new THREE.Group();

  // Materials
  const bodyMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#ffeb3b'), // Bright yellow
    transparent: true,
    opacity: 0.6,
    roughness: 0.1,
    transmission: 1.0,
    ior: 1.3,
    thickness: 0.1,
    reflectivity: 0.2,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
  });

  const tipMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('darkorange'), // Dark graphite
    metalness: 0.5,
    roughness: 0.4,
  });

  const eraserMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('hotpink'), // Soft pink eraser
    roughness: 0.6,
    metalness: 0.1,
  });

  const ferruleMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#b0bec5'), // Silvery metal band
    metalness: 1,
    roughness: 0.3,
  });

  // Dimensions
  const bodyLength = 1.8;
  const radius = 0.1;

  // Pencil body (cylinder)
  const bodyGeometry = new THREE.CylinderGeometry(radius, radius, bodyLength, 32);
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  body.position.y = 0;

  // Tip (cone)
  const tipHeight = 0.3;
  const tipGeometry = new THREE.ConeGeometry(radius, tipHeight, 20);
  const tip = new THREE.Mesh(tipGeometry, tipMaterial);
  tip.rotation.x = Math.PI;
  tip.position.y = -bodyLength / 2 - tipHeight / 2;

  // Eraser (cylinder)
  const eraserHeight = 0.15;
  const eraserGeometry = new THREE.CylinderGeometry(radius * 1.05, radius * 1.05, eraserHeight, 32);
  const eraser = new THREE.Mesh(eraserGeometry, eraserMaterial);
  eraser.position.y = bodyLength / 1.9 + eraserHeight / 2;

  // Ferrule (metal band)
  const ferruleHeight = 0.08;
  const ferruleGeometry = new THREE.CylinderGeometry(radius * 1.05, radius * 1.05, ferruleHeight, 32);
  const ferrule = new THREE.Mesh(ferruleGeometry, ferruleMaterial);
  ferrule.position.y = bodyLength / 2 + ferruleHeight / 2 - 0.04;

  // Assemble
  pencilGroup.add(body);
  pencilGroup.add(tip);
  pencilGroup.add(eraser);
  pencilGroup.add(ferrule);

  return pencilGroup;
}
