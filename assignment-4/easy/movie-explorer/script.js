const API_KEY = "2f6c01c6d36dc79f805137114e9fffce";
const BASE_URL = "https://api.themoviedb.org/3/discover/movie";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

const GENRES = [
    { "id": 28, "name": "Action" },
    { "id": 12, "name": "Adventure" },
    { "id": 16, "name": "Animation" },
    { "id": 35, "name": "Comedy" },
    { "id": 80, "name": "Crime" },
    { "id": 99, "name": "Documentary" },
    { "id": 18, "name": "Drama" },
    { "id": 10751, "name": "Family" },
    { "id": 14, "name": "Fantasy" },
    { "id": 36, "name": "History" },
    { "id": 27, "name": "Horror" },
    { "id": 10402, "name": "Music" },
    { "id": 9648, "name": "Mystery" },
    { "id": 10749, "name": "Romance" },
    { "id": 878, "name": "Science Fiction" },
    { "id": 10770, "name": "TV Movie" },
    { "id": 53, "name": "Thriller" },
    { "id": 10752, "name": "War" },
    { "id": 37, "name": "Western" }
  ]

  const state = {
    movies: [],
    selectedGenre: "",
    count: 10,
    currentMovies: []
  }

document.addEventListener("DOMContentLoaded", function () {
    const select = document.getElementById("select-genre");

    const placeholder = document.createElement('option');
    placeholder.textContent = "Select a genre...";
    placeholder.value = "";
    placeholder.disabled = true;
    placeholder.selected = true;
    select.appendChild(placeholder);
    // select.value = "any";

    GENRES.forEach((genre) => {
        const option = document.createElement('option');
        option.textContent = genre.name;
        option.value = genre.id;
        select.appendChild(option);
    });
});

async function fetchMovies(genre, count = 20) {
    let API_URL = `${BASE_URL}?api_key=${API_KEY}&with_genres=${genre}&page=${count/10}`
    const response = await fetch(API_URL);
    try {
        if (!response.ok) {
            throw new Error("Server error while fetching data!");
        }
        const data = await response.json();
        if (!data.results || !data.results.length) {
            throw new Error("No movie found!");

        }
        state.movies = data.results;
        const checkbox = document.getElementById("sorting-checkbox");
        const checked = checkbox.checked;
        if(checked) {
            state.currentMovies = [...sortByRating(data.results)];
        } else {
            state.currentMovies = data.results;
        }
        
        return true;
    } catch (error) {
        showError(error);
        return false;
    }
}
async function onSelectGenre(element) {
    const value = element.value;
    state.genre = value;
    onSettingData(value)
}

async function onSettingData(genre=state.genre, count = state.count) {
    state.genre = genre;
    state.count = count;

    const response = await fetchMovies(genre, count);
    if (!response) {
        return;
    }
    renderMovies();
}

function sortByRating(movies) {
    const temp = [...movies];
    temp.sort((a, b) => b.vote_average - a.vote_average);
    return temp;
}

function onToggleRating() {
    const checkbox = document.getElementById("sorting-checkbox");
    const checked = checkbox.checked;

    if(checked) {
       state.currentMovies =  [...sortByRating(state.movies)];
    } else {
        state.currentMovies = [...state.movies];
    }

    renderMovies();
}

function renderMovies() {
    const movieWrapper = document.getElementById("movie-wrapper");
    movieWrapper.innerHTML = '';

    state.currentMovies.forEach(movie => {
        const divElement = document.createElement("div");
        divElement.className = "movie";
        divElement.innerHTML =
            `<div class="imageWrapper">
                            ${movie.vote_average && `<span class="star">⭐ ${Math.floor(movie.vote_average)}/10</span>`}
            <img class="movie-poster" src=${IMG_URL + movie.poster_path} alt=${movie.title}/>
            </div>
            <div class="movie-footer">

                <h4>${movie.title}</h4>
                <p>${movie.overview}</p>  
                
            </div>`
        movieWrapper.appendChild(divElement)
    })
    
}

function onSelectCount(element) {
    const value = element.value;
    state.count = value;

    onSettingData(state.genre, value)
}