import * as THREE from 'three';

export function createBook() {
  const bookGroup = new THREE.Group();

  // Dimensions
  const coverThickness = 0.05;
  const coverWidth = 1.2;
  const coverHeight = 1.6;
  const pageThickness = 0.04;
  const pageInset = 0.05;

  // Glass-like material for the cover
  const coverMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0x8e6be8), // Soft violet
    transparent: true,
    opacity: 0.6,
    roughness: 0.1,
    transmission: 1.0,
    ior: 1.4,
    thickness: 0.2,
    reflectivity: 0.2,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
  });

  // Pages material (slightly different tint)
  const pageMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0xffffff),
    transparent: true,
    opacity: 0.4,
    roughness: 0.2,
    transmission: 1.0,
    ior: 1.3,
    thickness: 0.15,
    reflectivity: 0.05,
  });

  // Create the front and back covers
  const coverGeometry = new THREE.BoxGeometry(coverWidth, coverHeight, coverThickness);
  const frontCover = new THREE.Mesh(coverGeometry, coverMaterial);
  const backCover = new THREE.Mesh(coverGeometry, coverMaterial);

  frontCover.position.z = coverThickness / 2;
  backCover.position.z = -coverThickness / 2;

  // Create the page block
  const pageGeometry = new THREE.BoxGeometry(
    coverWidth - pageInset * 2,
    coverHeight - pageInset * 2,
    pageThickness
  );
  const pages = new THREE.Mesh(pageGeometry, pageMaterial);
  pages.position.z = 0;

  // Assemble the book
  bookGroup.add(frontCover, backCover, pages);

  return bookGroup;
}
