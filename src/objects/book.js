import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three-stdlib'; // You need to install three-stdlib

export function createBook() {
  const bookGroup = new THREE.Group();

  // Dimensions
  const coverThickness = 0.05;
  const coverWidth = 1.2;
  const coverHeight = 1.6;
  const pageThickness = 0.04;
  const pageInset = 0.08;
  const cornerRadius = 0.08;

  // Materials
  const coverMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#d3bfff'), // Light purple
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

  const pageMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#ffffff'),
    transparent: true,
    opacity: 0.8,
    roughness: 0.3,
    transmission: 1.0,
    ior: 1.2,
    thickness: 0.1,
    reflectivity: 0.05,
  });

  const bodyMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#4b1c78'), // Dark purple
    roughness: 0.5,
    metalness: 0.2,
  });

  // Rounded cover geometries
  const coverGeometry = new RoundedBoxGeometry(coverWidth, coverHeight, coverThickness, 5, cornerRadius);
  const frontCover = new THREE.Mesh(coverGeometry, coverMaterial);
  const backCover = new THREE.Mesh(coverGeometry, coverMaterial);
  frontCover.position.z = coverThickness / 2 + 0.01;
  backCover.position.z = -coverThickness / 2 - 0.01;

  // Book body/spine (dark purple core)
  const bodyGeometry = new RoundedBoxGeometry(
    coverWidth - 0.03,
    coverHeight - 0.03,
    coverThickness * 0.6,
    5,
    cornerRadius * 0.7
  );
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  body.position.z = 0;

  // Pages: 3 thick layers
  const pageCount = 3;
  const pageGap = 0.012;
  for (let i = 0; i < pageCount; i++) {
    const page = new THREE.Mesh(
      new RoundedBoxGeometry(
        coverWidth - pageInset * 2,
        coverHeight - pageInset * 2,
        pageThickness,
        3,
        cornerRadius * 0.3
      ),
      pageMaterial
    );
    page.position.z = (i - 1) * (pageThickness + pageGap);
    bookGroup.add(page);
  }

  // Assemble
  bookGroup.add(frontCover);
  bookGroup.add(backCover);
  bookGroup.add(body);

  return bookGroup;
}
