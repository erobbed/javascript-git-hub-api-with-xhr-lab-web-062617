const form = document.getElementById('add-user')
form.addEventListener("submit", function(){
  event.preventDefault();

})


function getRepositories() {
  const req = new XMLHttpRequest()
  const username = document.getElementById('username').value
  req.addEventListener("load", displayRepositories);
  // debugger
  req.open("GET", `https://api.github.com/users/${username}/repos`)
  setToken(req)
  req.send()
}

function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  const repoList = repos.map(r =>
    `<li><a href="${r.html_url}">${r.name}</a><br><a href="#" data-repository="${r.name}" data-username="${r.owner.login}" data-repo="${r.name}" onclick="getBranches(this)">Get Branches</a><br><a href="#" data-repository="${r.name}" data-username="${r.owner.login}" data-repo="${r.name}" onclick="getCommits(this)">Get Commits</a></li>`
  )
  const repoHTML = `<ul>${repoList.join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoHTML
}

function getCommits(el) {
  const repo = el.dataset.repository
  const username = el.dataset.username
  const link = `https://api.github.com/repos/${username}/${repo}/commits`
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", `${link}`)
  setToken(req)
  req.send()
}


function displayCommits() {
  const commits = JSON.parse(this.responseText)
  console.log(commits)
  const commitsList = `<ul>${commits.map(commit =>
    `<li><strong>${commit.author.login}</strong> - '${commit.commit.message}' - ${commit.commit.author.name}</li>`
  ).join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function setToken(req){
  req.setRequestHeader("Authorization", "token f5609ab59ca2cd7a8f04bbb4572971d113ff15b4")
}


function getBranches(el) {
  const repo = el.dataset.repository
  const username = el.dataset.username
  const link = `https://api.github.com/repos/${username}/${repo}/branches`
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", `${link}`)
  setToken(req)
  req.send()
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(branch =>
    `<li><strong>${branch.name}</strong></li>`
  ).join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}
