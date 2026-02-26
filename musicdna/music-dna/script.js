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

// --- AI Search Integration ---

const searchInput = document.querySelector('#ai-search');
const searchBtn = document.querySelector('#search-spark-btn');
const aiStatus = document.querySelector('#ai-status');

searchBtn.addEventListener('click', async () => {
    const query = searchInput.value;
    if (!query) return;

    // 1. Show the "Thinking" state
    aiStatus.classList.remove('hidden');
    aiStatus.innerText = "Oracle is searching the web for your vibe...";
    
    try {
        // 2. The AI Bridge (This is where Gemini will process the 'vibe')
        // For the MVP, we send the prompt to our AI handler
        const aiResult = await callGeminiAI(query); 
        
        // 3. The Spotify Search
        // We take the AI's refined "Artist - Song" and find it on Spotify
        const spotifyTrack = await searchSpotify(aiResult);
        
        // 4. Update UI and Play
        aiStatus.innerText = `Found: ${spotifyTrack.name} by ${spotifyTrack.artist}`;
        playTrack(spotifyTrack.uri);
        
        // 5. Update the DNA Helix
        updateDNAFocus(spotifyTrack);
        
    } catch (error) {
        aiStatus.innerText = "The Oracle encountered a rift in the data.";
        console.error(error);
    }
});

// --- Placeholder for the AI Call (To be finalized Thursday) ---
async function callGeminiAI(userPrompt) {
    // This will hit the Gemini API to turn "Rainy night music" 
    // into a specific song like "Blue in Green by Miles Davis"
    return "Miles Davis Blue in Green"; 
}