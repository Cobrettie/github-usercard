/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

let cardContainer = document.querySelector('.cards');
axios.get('https://api.github.com/users/cobrettie')
  .then(response => {
    cardContainer.appendChild(componentCreator(response.data));
    console.log(response);
  })
  .catch(err => {
    console.log(err);
  })

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

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

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

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
  let expandBtn = document.createElement('button');
  let publicRepos = document.createElement('p');
  let publicReposUrl = document.createElement('p');
  let hireable = document.createElement('p');

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
  cardInfoDiv.appendChild(expandBtn);
  profileP.appendChild(profileATag);

  // add classes to elements
  mainCardDiv.classList.add('card');
  cardInfoDiv.classList.add('card-info');
  nameH3.classList.add('name');
  usernameP.classList.add('username');
  expandBtn.classList.add('expandBtn');

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
  expandBtn.textContent = 'Click for more';
  publicRepos.textContent = `Public repos: ${obj.public_repos}`;
  publicReposUrl.textContent = `Public repos url: ${obj.repos_url}`;
  hireable.textContent = `Hireable? ${obj.hireable}`;

  // event listeners
  expandBtn.addEventListener('click', () => {
    mainCardDiv.classList.toggle('card-open');
    closeCardChangingText();
    extraCardInfo();
  })

  function closeCardChangingText() {
    if (mainCardDiv.classList.contains('card-open')) {
      expandBtn.textContent = 'Click for less';
    } else {
      expandBtn.textContent = 'Click for more';
    }
  }

  function extraCardInfo() {
    if (mainCardDiv.classList.contains('card-open')) {
      cardInfoDiv.appendChild(publicRepos);
      cardInfoDiv.appendChild(publicReposUrl);
      cardInfoDiv.appendChild(hireable);
    } else {
      publicRepos.remove();
      publicReposUrl.remove();
      hireable.remove();
    }
  }

  return mainCardDiv;
}

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
