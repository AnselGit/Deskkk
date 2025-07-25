import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three-stdlib';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

export function createFlashCard() {
  const cardGroup = new THREE.Group();

  // Dimensions
  const cardWidth = 1.6;
  const cardHeight = 1.0;
  const cardDepth = 0.1;
  const cornerRadius = 0.08;

  // Random character options
  const symbols = ['+', '-', '×', '÷', 'A', 'B', 'C', 'D'];
  const randomChar = symbols[Math.floor(Math.random() * symbols.length)];

  // Random font color
  const fontColors = ['red', 'blue', 'lime', 'violet'];
  const randomFontColor = fontColors[Math.floor(Math.random() * fontColors.length)];

  const cardMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('white'),
    transparent: true,
    opacity: 0.2,
    roughness: 0.1,
    metalness: 0.6,
    transmission: 0.9,
    ior: 1.4,
    clearcoat: 1,
    clearcoatRoughness: 0,
  });

  // Character Material with random color
  const charMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(randomFontColor),
    roughness: 0.5,
    metalness: 0.2,
    transparent: true,
    opacity: 0.6,
    transmission: 1.0,
    ior: 1.2,
    reflectivity: 0.05,
  });

  // Card Body
  const cardGeometry = new RoundedBoxGeometry(cardWidth, cardHeight, cardDepth, 5, cornerRadius);
  const cardMesh = new THREE.Mesh(cardGeometry, cardMaterial);
  cardGroup.add(cardMesh);

  // Load Font and Create Text Geometry
  const loader = new FontLoader();
  loader.load('/fonts/helvetiker_bold.typeface.json', (font) => {
    const textGeo = new TextGeometry(randomChar, {
      font: font,
      size: 0.5,
      depth: 0.1,
      curveSegments: 6,
      bevelEnabled: true,
      bevelThickness: 0.002,
      bevelSize: 0.001,
      bevelSegments: 1,
    });

    textGeo.center(); //

    const textMesh = new THREE.Mesh(textGeo, charMaterial);
    textMesh.position.z = 0;
    cardGroup.add(textMesh);
  });

  return cardGroup;
}
