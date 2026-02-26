/**
 * auth.js - The Spotify PKCE Handshake
 */

const CLIENT_ID = 'YOUR_SPOTIFY_CLIENT_ID'; // Replace this Thursday
const REDIRECT_URI = window.location.origin; // Dynamically uses your local server URL
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

// 1. Generate a random string for the code verifier
const generateCodeVerifier = (length) => {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

// 2. Hash the verifier to create the "Challenge"
const generateCodeChallenge = async (codeVerifier) => {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, new Uint8Array(digest)))
        .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

// 3. The "Connect" function called by your Login button
export const initiateSpotifyAuth = async () => {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem('code_verifier', verifier);

    const params = new URLSearchParams({
        client_id: CLIENT_ID,
        response_type: 'code',
        redirect_uri: REDIRECT_URI,
        code_challenge_method: 'S256',
        code_challenge: challenge,
        scope: 'user-top-read user-read-private user-read-email streaming user-modify-playback-state'
    });

    window.location.href = `${AUTH_ENDPOINT}?${params.toString()}`;
};

// 4. Handle the callback after Spotify redirects back
export const handleAuthCallback = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const verifier = localStorage.getItem('code_verifier');

    if (!code) return null;

    const response = await fetch(TOKEN_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            client_id: CLIENT_ID,
            grant_type: 'authorization-code',
            code,
            redirect_uri: REDIRECT_URI,
            code_verifier: verifier,
        }),
    });

    const data = await response.json();
    localStorage.setItem('access_token', data.access_token);
    // Clean the URL so the code doesn't sit in the address bar
    window.history.replaceState({}, document.title, "/");
    return data.access_token;
};