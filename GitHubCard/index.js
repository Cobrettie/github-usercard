/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

// let data = axios.get('https://api.github.com/users/cobrettie')
//   .then(response => {
//     console.log(response);
//   })

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

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
  profileP.appendChild(profileATag);

  // add classes to elements
  mainCardDiv.classList.add('card');
  cardInfoDiv.classList.add('card-info');
  nameH3.classList.add('name');
  usernameP.classList.add('username');

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

  return mainCardDiv;
}

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
