//Initialise value
const API= '09d37d1ef15f1da302e025e160239ad9';
const imageUrl = 'https://image.tmdb.org/t/p/w500';

//Request movies
function fetching(url, onComplete, onError){
    fetch(url)
    .then((res) => res.json())
    .then(onComplete)
    .catch(onError);
}

function searchMovies(value){
    var url = `https://api.themoviedb.org/3/search/movie?api_key=${API}&query=${value}`;
    fetching(url, renderMoviePoster, renderError);

}
function renderError(){
    console.log('Error', Error);
}
function upComingMovies(){
    var url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API}`;
    const render = renderMovieContainer.bind({ title: 'Upcoming movies'})
    
    fetching(url, render, renderError);
}
function popularMovies(){
    var url = `https://api.themoviedb.org/3/movie/popular?api_key=${API}`;
    const render = renderMovieContainer.bind({ title: 'The most popular movies'})

    fetching(url, render, renderError);
}
function latestMovies(){
    var url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API}`;
    const render = renderMovieContainer.bind({ title: 'Box Office'})

    fetching(url, render, renderError);
}