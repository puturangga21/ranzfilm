//TMDB

const API_KEY = "api_key=8008bdcb04519d2ea605b20638e68b91";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const searchURL = BASE_URL + "/search/movie?" + API_KEY;

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

getMovies(API_URL);

function getMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      showMovies(data.results);
    });
}

function showMovies(data) {
  main.innerHTML = "";

  data.forEach((movie) => {
    const { title, poster_path, vote_average } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
      <div class="movie-card">
         <div class="card-head">
            <img
            src="${IMG_URL + poster_path}"
            alt="${title}"
            class="card-img"
            />

            <div class="card-overlay">
               <div class="bookmark">
                  <ion-icon name="bookmark-outline"></ion-icon>
               </div>

               <div class="rating">
                  <ion-icon name="star-outline"></ion-icon>
                  <span>${vote_average}</span>
               </div>

               <div class="play">
                  <ion-icon name="play-circle-outline"></ion-icon>
               </div>
            </div>
         </div>

         <div class="card-body">
            <h3 class="card-title">${title}</h3>

            <div class="card-info">
            <span class="genre">Action/Comedy</span>
            <span class="year">2021</span>
            </div>
         </div>
      </div>
      `;

    main.appendChild(movieEl);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm) {
    getMovies(searchURL + "&query=" + searchTerm);
  }
});
