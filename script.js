const username = "SohamKore";

const NOTES_REPOS = [
  "c",
  "cpp",
  "py",
  "java",
  "sql",
  "js",
  "ds",
  "ds-practice",
  "word",
  "excel",
  "powerpoint",
  "autocad",
];


const gradients = ["grad-1", "grad-2", "grad-3", "grad-4", "grad-5"];

const notesGrid = document.getElementById("notesGrid");
const projectsGrid = document.getElementById("projectsGrid");

function createCard(repo, index, isNotes = false) {
  const card = document.createElement("div");
  card.className = `repo-card ${gradients[index % gradients.length]} ${
    isNotes ? "notes-card" : ""
  }`;

  const desc = repo.description || "No description provided.";

  let liveURL = repo.homepage;
  if (!liveURL) {
    liveURL = `https://${username.toLowerCase()}.github.io/${repo.name}`;
  }

  card.innerHTML = `
    <div class="repo-title">${repo.name}</div>
    <div class="repo-desc">${desc}</div>

    <div class="repo-links">
      <a href="${repo.html_url}" target="_blank">View GitHub Repo</a>
      <a href="${liveURL}" target="_blank">Open Live Page</a>
      <div class="live-url">${liveURL}</div>
    </div>
  `;

  return card;
}

// 🚀 IMPORTANT: per_page=100 & sorted
fetch(
  `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`
)
  .then(res => res.json())
  .then(repos => {
    let noteIndex = 0;
    let projectIndex = 0;

    repos.forEach(repo => {
      // Optional: skip forks if you want
      // if (repo.fork) return;

      if (NOTES_REPOS.includes(repo.name)) {
        notesGrid.appendChild(createCard(repo, noteIndex++, true));
      } else {
        projectsGrid.appendChild(createCard(repo, projectIndex++));
      }
    });
  })
  .catch(() => {
    notesGrid.innerHTML = "<p>Failed to load notes.</p>";
    projectsGrid.innerHTML = "<p>Failed to load projects.</p>";
  });
