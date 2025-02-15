const streamsContainer = document.getElementById('streamsContainer');

// List of Twitch users
const users = [
  'Gael_Mectoob',
  'ponce',
  'Zael_ite',
  'mistermv',
  'Eazy_Vi',
  'SaltymanFR',
  'Lorenzo__Zito'
];

// Fetch stream status from your backend
async function fetchStreamStatus(users) {
  try {
    const response = await fetch(`http://35.226.96.233:8080/streams?users=${users.join(',')}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching stream status:', error);
    return [];
  }
}

// Display the status of each user
function displayStreamStatus(users, streams) {
  streamsContainer.innerHTML = ''; // Clear previous results

  users.forEach(user => {
    const stream = streams.find(stream => stream.user_login === user.toLowerCase());
    const streamCard = document.createElement('div');
    streamCard.classList.add('streamCard');

    if (stream) {
      streamCard.innerHTML = `
        <h3><a href="https://www.twitch.tv/${user}" target="_blank">${stream.user_name}</a></h3>
        <p class="online">Online</p>
        <p>${stream.title}</p>
        <p>Viewers: ${stream.viewer_count}</p>
        <img src="${stream.thumbnail_url.replace('{width}', '300').replace('{height}', '200')}" alt="${stream.user_name}">
      `;
    } else {
      streamCard.innerHTML = `
        <h3><a href="https://www.twitch.tv/${user}" target="_blank">${user}</a></h3>
        <p class="offline">Offline</p>
      `;
    }

    streamsContainer.appendChild(streamCard);
  });
}

// Main function to fetch and display data
async function main() {
  const streams = await fetchStreamStatus(users);
  displayStreamStatus(users, streams);
}

// Run the main function
main();
