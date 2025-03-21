const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

let balance = 1000;
let currentBet = 0;

// Update leaderboard
function updateLeaderboard() {
  const leaderboardRef = database.ref('leaderboard');
  leaderboardRef.orderByChild('score').limitToLast(10).on('value', (snapshot) => {
    const scores = [];
    snapshot.forEach((child) => {
      scores.push(child.val());
    });
    const sorted = scores.sort((a, b) => b.score - a.score);
    document.getElementById('leaderboard').innerHTML = sorted
      .map((user, index) => `${index + 1}. ${user.name}: ${user.score}`)
      .join('<br>');
  });
}

// Save score to Firebase
function saveScore(name, score) {
  const leaderboardRef = database.ref('leaderboard').push();
  leaderboardRef.set({ name, score });
}

// Coin flip logic
function flip(guess) {
  currentBet = parseInt(document.getElementById('betAmount').value);
  if (currentBet > balance || currentBet < 10) {
    alert("Invalid bet!");
    return;
  }

  const result = Math.random() < 0.5 ? 'heads' : 'tails';
  const resultElement = document.getElementById('result');

  if (guess === result) {
    balance += currentBet;
    resultElement.innerHTML = `🎉 You won ${currentBet} points! (It was ${result})`;
  } else {
    balance -= currentBet;
    resultElement.innerHTML = `💸 You lost ${currentBet} points... (It was ${result})`;
  }

  document.getElementById('balance').textContent = balance;

  // Prompt for leaderboard name when balance is 0 or user quits
  if (balance <= 0) {
    const name = prompt("Game over! Enter your name for the leaderboard:");
    if (name) saveScore(name, balance);
    balance = 1000; // Reset balance
  }
}

// Initialize leaderboard
updateLeaderboard();
