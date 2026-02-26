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

import { initiateSpotifyAuth, handleAuthCallback } from './auth.js';

// Check if we just returned from Spotify login
window.addEventListener('load', async () => {
    const token = await handleAuthCallback();
    if (token || localStorage.getItem('access_token')) {
        console.log("✅ Identity Connected");
        document.getElementById('login-btn').innerText = "Identity Linked";
        document.getElementById('login-btn').style.background = "#7000ff"; // Change to Purple
        // Trigger the DNA build here!
    }
});

document.getElementById('login-btn').addEventListener('click', () => {
    initiateSpotifyAuth();
});


/**
 * The Harvester - Pulls and processes track DNA
 */

async function fetchMusicDNA() {
    const token = localStorage.getItem('access_token');
    if (!token) return;

    // 1. Get User's Top 50 Tracks
    const topTracksRes = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=medium_term', {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const tracksData = await topTracksRes.json();
    const tracks = tracksData.items;

    // 2. Extract IDs to get "Genetic Markers" (Audio Features)
    const ids = tracks.map(track => track.id).join(',');
    const featuresRes = await fetch(`https://api.spotify.com/v1/audio-features?ids=${ids}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const featuresData = await featuresRes.json();

    // 3. Merge the Data into a "DNA Object"
    const musicDNA = tracks.map((track, index) => ({
        name: track.name,
        artist: track.artists[0].name,
        uri: track.uri,
        image: track.album.images[0].url,
        // The DNA Markers
        energy: featuresData.audio_features[index].energy,
        valence: featuresData.audio_features[index].valence,
        danceability: featuresData.audio_features[index].danceability,
        tempo: featuresData.audio_features[index].tempo
    }));

    return musicDNA;
}

window.addEventListener('load', async () => {
    const token = await handleAuthCallback();
    const storedToken = localStorage.getItem('access_token');

    if (token || storedToken) {
        document.getElementById('login-btn').innerText = "Identity Linked";
        
        // --- START THE ENGINE ---
        const dnaData = await fetchMusicDNA();
        console.log("Your Music DNA:", dnaData);
        
        // Calculate Identity Score (Average Energy + Valence)
        const avgScore = (dnaData.reduce((acc, curr) => acc + curr.energy + curr.valence, 0) / (dnaData.length * 2)) * 100;
        document.getElementById('is-score').innerText = avgScore.toFixed(1);
        
        // Send data to Three.js to build the Helix
        build3DHelix(dnaData);
    }
});