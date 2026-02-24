// script.js - The Lean MVP Engine
import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

// 1. Initialize the 3D Scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ 
    canvas: document.querySelector('#dna-canvas'),
    antialias: true,
    alpha: true 
});

renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 5;

// 2. The "Placeholder" Helix (We will replace this with real data on Day 2)
const geometry = new THREE.SphereGeometry(0.05, 16, 16);
const material = new THREE.MeshBasicMaterial({ color: 0x00f2ff });

for (let i = 0; i < 50; i++) {
    const dot = new THREE.Mesh(geometry, material);
    dot.position.set(Math.sin(i * 0.5), i * 0.1 - 2.5, Math.cos(i * 0.5));
    scene.add(dot);
}

// 3. Animation Loop
function animate() {
    requestAnimationFrame(animate);
    scene.rotation.y += 0.01; // Make it spin!
    renderer.render(scene, camera);
}

// script.js - Mapping Logic
function mapTrackToDNA(trackData) {
    const x = (trackData.danceability - 0.5) * 10;
    const y = (trackData.energy - 0.5) * 10;
    const z = (trackData.valence - 0.5) * 10;
    
    // Create a glowing sphere for this track
    const color = trackData.valence > 0.5 ? 0x00f2ff : 0x7000ff;
    addDNAPoint(x, y, z, color);
}

animate();