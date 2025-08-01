import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three-stdlib';

export function createBook() {
  const bookGroup = new THREE.Group();

  // Dimensions
  const coverThickness = 0.05;
  const coverWidth = 1.2;
  const coverHeight = 1.6;
  const pageThickness = 0.02;
  const pageInset = 0.08;
  const cornerRadius = 0.08;
  const pageCount = 10;
  const pageGap = 0.012;
  const coverBodyGap = 0.005;

  // Random cover color
  const coverColors = ['red', 'blue', 'lime', 'violet'];
  const randomCoverColor = coverColors[Math.floor(Math.random() * coverColors.length)];

  // Materials
  const coverMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(randomCoverColor),
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

  const bodyMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#d3bfff'),
    roughness: 0.5,
    metalness: 0.2,
    transparent: true,
    opacity: 0.1,
  });

  // Total thickness of all pages
  const totalPagesThickness = pageCount * pageThickness + (pageCount - 1) * pageGap;

  // Covers
  const coverGeometry = new RoundedBoxGeometry(coverWidth, coverHeight, coverThickness, 5, cornerRadius);
  const frontCover = new THREE.Mesh(coverGeometry, coverMaterial);
  const backCover = new THREE.Mesh(coverGeometry, coverMaterial);
  frontCover.position.z = totalPagesThickness / 2 + coverThickness / 2 + coverBodyGap;
  backCover.position.z = -totalPagesThickness / 2 - coverThickness / 2 - coverBodyGap;

  // Pages
  const pagesStartZ = -totalPagesThickness / 2 + pageThickness / 2;
  for (let i = 0; i < pageCount; i++) {
    const page = new THREE.Mesh(
      new RoundedBoxGeometry(
        coverWidth - pageInset * 2,
        coverHeight - pageInset * 2,
        pageThickness,
        3,
        cornerRadius * 0.3
      ),
    );
    page.position.z = pagesStartZ + i * (pageThickness + pageGap);
    bookGroup.add(page);
  }

  // Body (spine block)
  const bodyDepth = totalPagesThickness + 0.1;
  const bodyGeometry = new RoundedBoxGeometry(
    coverWidth - 0.03,
    coverHeight - 0.03,
    bodyDepth,
    5,
    cornerRadius * 0.7
  );
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  body.position.z = 0;

  // Spine connector (cover hinge)
  const spineConnectorThickness = totalPagesThickness + coverThickness * 2 + coverBodyGap * 2;
  const spineGeometry = new RoundedBoxGeometry(coverThickness, coverHeight, spineConnectorThickness, 3, cornerRadius * 0.5);
  const spineConnector = new THREE.Mesh(spineGeometry, coverMaterial);
  spineConnector.position.z = 0;
  spineConnector.position.x = -coverWidth / 2 + coverThickness / 2;

  // Assemble book
  bookGroup.add(frontCover);
  bookGroup.add(backCover);
  bookGroup.add(spineConnector);
  bookGroup.add(body);

  return bookGroup;
}
