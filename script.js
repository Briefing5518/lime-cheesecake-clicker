let totalClicks = 0;
let leaderboard = [];
let clickCount = 0;
let startTime = Date.now();
let cps = 0;
let cpsInterval;

// Handle the click event and calculate CPS
function handleClick() {
    clickCount++;
    totalClicks++;
    document.getElementById('total-clicks').innerText = totalClicks;
    
    // Calculate CPS every 1 second
    if (Date.now() - startTime >= 1000) {
        cps = clickCount; // Set CPS to the number of clicks in the last second
        clickCount = 0;
        startTime = Date.now();
    }
    
    // Cap CPS at 4
    if (cps > 4) {
        cps = 4;
    }

    // Display CPS
    document.getElementById('cps-display').innerText = `CPS: ${cps}`;
}

// Submit the score with the name input
function submitScore() {
    const nameInput = document.getElementById('username').value;
    const name = nameInput.trim() === "" ? generateRandomName() : nameInput.trim();
    
    // Store the score in the leaderboard
    leaderboard.push({ name, clicks: totalClicks });
    
    // Sort the leaderboard by number of clicks (descending)
    leaderboard.sort((a, b) => b.clicks - a.clicks);

    // Update the leaderboard UI
    updateLeaderboard();
    
    // Reset the click counter and name field
    totalClicks = 0;
    document.getElementById('total-clicks').innerText = totalClicks;
    document.getElementById('username').value = "";
}

// Generate a random anonymous name
function generateRandomName() {
    const randomString = Math.random().toString(36).substring(2, 8);
    return "anon-" + randomString;
}

// Update the leaderboard UI
function updateLeaderboard() {
    const leaderboardList = document.getElementById('leaderboard-list');
    leaderboardList.innerHTML = "";

    leaderboard.forEach(player => {
        const li = document.createElement('li');
        li.innerText = `${player.name}: ${player.clicks} clicks`;
        leaderboardList.appendChild(li);
    });
}
