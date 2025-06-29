// Elements
const loginSection = document.getElementById('login-section');
const journalSection = document.getElementById('journal-section');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const journalID = document.getElementById('journal-id');
const journalPassword = document.getElementById('journal-password');
const loginError = document.getElementById('login-error');
const userNameDisplay = document.getElementById('user-name');
const dateDisplay = document.getElementById('date-display');
const moodSelect = document.getElementById('mood-select');
const journalEntry = document.getElementById('journal-entry');
const saveEntryBtn = document.getElementById('save-entry');
const entryList = document.getElementById('entry-list');

let currentUser = null;

// Format date nicely
function getFormattedDate() {
  const d = new Date();
  return d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
}

// Get user data from localStorage
function getUserData(id) {
  const data = localStorage.getItem('journal_' + id);
  return data ? JSON.parse(data) : { password: "", entries: [] };
}

// Save user data
function saveUserData(id, data) {
  localStorage.setItem('journal_' + id, JSON.stringify(data));
}

// Show journal UI
function showJournal(userID) {
  loginSection.style.display = 'none';
  journalSection.style.display = 'block';
  userNameDisplay.textContent = userID;
  dateDisplay.textContent = getFormattedDate();
  displayEntries();
}

// Handle Login
loginBtn.addEventListener('click', () => {
  const id = journalID.value.trim();
  const pass = journalPassword.value.trim();
  if (!id || !pass) return;

  const userData = getUserData(id);

  // First-time login sets the password
  if (!userData.password) {
    userData.password = pass;
    saveUserData(id, userData);
    currentUser = id;
    showJournal(id);
  }
  // Returning user
  else if (userData.password === pass) {
    currentUser = id;
    showJournal(id);
  }
  else {
    loginError.style.display = 'block';
  }
});

// Save entry
saveEntryBtn.addEventListener('click', () => {
  if (!currentUser) return;
  const mood = moodSelect.value;
  const text = journalEntry.value.trim();
  if (!text) return;

  const userData = getUserData(currentUser);
  userData.entries.push({ mood, text, date: getFormattedDate() });
  saveUserData(currentUser, userData);
  journalEntry.value = '';
  displayEntries();
});

// Display past entries
function displayEntries() {
  const userData = getUserData(currentUser);
  entryList.innerHTML = '';

  if (userData.entries.length === 0) {
    entryList.innerHTML = '<p>No entries yet.</p>';
    return;
  }

  userData.entries.reverse().forEach((entry, index) => {
    const moodIcons = {
      happy: '😊',
      sad: '😢',
      angry: '😠',
      stressed: '😩'
    };

    const div = document.createElement('div');
    div.classList.add('entry-card');

    const moodEmoji = moodIcons[entry.mood.toLowerCase()] || '📝';

    div.innerHTML = `
      <p><strong>${moodEmoji} Mood:</strong> ${entry.mood}</p>
      <p><strong>Date:</strong> ${entry.date}</p>
      <p><strong>Entry:</strong><br><span class="entry-text">${entry.text}</span></p>

      <div class="entry-actions">
        <button onclick="editEntry(${userData.entries.length - 1 - index})">✏ Edit</button>
        <button class="delete-btn" onclick="deleteEntry(${userData.entries.length - 1 - index})">🗑 Delete</button>
      </div>
    `;

    entryList.appendChild(div);
  });
}
// Delete entry
window.deleteEntry = function(index) {
  const userData = getUserData(currentUser);
  userData.entries.splice(index, 1);
  saveUserData(currentUser, userData);
  displayEntries();
};
window.editEntry = function(index) {
  const userData = getUserData(currentUser);
  const entry = userData.entries[index];

  const newText = prompt("Edit your entry:", entry.text);
  if (newText !== null) {
    entry.text = newText.trim();
    userData.entries[index] = entry;
    saveUserData(currentUser, userData);
    displayEntries();
  }
};

// Logout
logoutBtn.addEventListener('click', () => {
  currentUser = null;
  // Clear fields
  journalID.value = '';
  journalPassword.value = '';
  journalEntry.value = '';

  // Redirect to mood selection page
  window.location.href = "index.html";
});
// Emoji insert
document.querySelectorAll('.emoji').forEach(emoji => {
  emoji.addEventListener('click', () => {
    journalEntry.value += emoji.textContent;
    journalEntry.focus();
  });
});