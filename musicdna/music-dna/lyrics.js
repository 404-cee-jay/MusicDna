// player.js snippet
const playTrack = (uri) => {
  fetch(`https://api.spotify.com/v1/me/player/play`, {
    method: 'PUT',
    body: JSON.stringify({ uris: [uri] }),
    headers: { 'Authorization': `Bearer ${accessToken}` }
  });
};