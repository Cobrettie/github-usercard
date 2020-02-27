let cardContainer = document.querySelector('.cards');
axios.get('https://api.github.com/users/cobrettie')
  .then(response => {
    cardContainer.appendChild(componentCreator(response.data));
    console.log(response);
  })
  .catch(err => {
    console.log(err);
  })

const followersArray = ['tetondan', 'dustinmyers', 'justsml', 'luishrd', 'bigknell'];
followersArray.forEach(item => {
  axios.get(`https://api.github.com/users/${item}`)
  .then(response => {
    cardContainer.appendChild(componentCreator(response.data));
    console.log(response);
  })
  .catch(err => {
    console.log(err);
  })
})

const componentCreator = (obj) => {
  // create elements
  let mainCardDiv = document.createElement('div');
  let cardImg  = document.createElement('img');
  let cardInfoDiv = document.createElement('div');
  let nameH3 = document.createElement('h3');
  let usernameP = document.createElement('p');
  let locationP = document.createElement('p');
  let profileP = document.createElement('p');
  let profileATag = document.createElement('a');
  let userFollowersP = document.createElement('p');
  let userFollowingP = document.createElement('p');
  let bioP = document.createElement('p');
  // stretch
  let expandBtn = document.createElement('button');
  let publicRepos = document.createElement('p');
  let publicReposUrl = document.createElement('p');
  let hireable = document.createElement('p');
  let gitCalenderDiv = document.createElement('div');

  // append children
  mainCardDiv.appendChild(cardImg);
  mainCardDiv.appendChild(cardInfoDiv);
  cardInfoDiv.appendChild(nameH3);
  cardInfoDiv.appendChild(usernameP);
  cardInfoDiv.appendChild(locationP);
  cardInfoDiv.appendChild(profileP);
  cardInfoDiv.appendChild(userFollowersP);
  cardInfoDiv.appendChild(userFollowingP);
  cardInfoDiv.appendChild(bioP);
  // stretch
  profileP.appendChild(profileATag);
  cardInfoDiv.appendChild(expandBtn);

  // add classes to elements
  mainCardDiv.classList.add('card');
  cardInfoDiv.classList.add('card-info');
  nameH3.classList.add('name');
  usernameP.classList.add('username');
  // stretch
  expandBtn.classList.add('expandBtn');
  gitCalenderDiv.classList.add('calendar');

  // add content to elements
  cardImg.src = obj.avatar_url;
  nameH3.textContent = obj.name;
  usernameP.textContent = obj.login;
  locationP.textContent = obj.location;
  profileATag.href = obj.url;
  profileATag.textContent = obj.url;
  userFollowersP.textContent = `${obj.followers} Followers`;
  userFollowingP.textContent = `${obj.following} Following`;
  bioP.textContent = obj.bio;
  // stretch
  expandBtn.textContent = 'Click for more';
  publicRepos.textContent = `Public repos: ${obj.public_repos}`;
  publicReposUrl.textContent = `Public repos url: ${obj.repos_url}`;
  hireable.textContent = `Hireable? ${obj.hireable}`;

  // event listeners
  expandBtn.addEventListener('click', () => {
    mainCardDiv.classList.toggle('card-open');
    closeCardChangingText();
    extraCardInfo();
    // new GitHubCalendar('.calendar', 'cobrettie');
  })

  function closeCardChangingText() {
    if (mainCardDiv.classList.contains('card-open')) {
      expandBtn.textContent = 'Click for less';
      expandBtn.classList.add('lowerExpandBtn');
    } else {
      expandBtn.textContent = 'Click for more';
      expandBtn.classList.remove('lowerExpandBtn');
    }
  }


  function extraCardInfo() {
    if (mainCardDiv.classList.contains('card-open')) {
      cardInfoDiv.appendChild(publicRepos);
      cardInfoDiv.appendChild(publicReposUrl);
      cardInfoDiv.appendChild(hireable);
      cardInfoDiv.appendChild(gitCalenderDiv);
    } else {
      publicRepos.remove();
      publicReposUrl.remove();
      hireable.remove();
      gitCalenderDiv.remove();
    }
  }

  return mainCardDiv;
}
