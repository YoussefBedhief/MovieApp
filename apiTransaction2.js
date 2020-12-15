//Initialise value
const API= '09d37d1ef15f1da302e025e160239ad9';
const imageUrl = 'https://image.tmdb.org/t/p/w500';

//Request tv
function fetching(url, onComplete, onError){
    fetch(url)
    .then((res) => res.json())
    .then(onComplete)
    .catch(onError);
}

function searchtv(value){
    var url = `https://api.themoviedb.org/3/search/tv?api_key=${API}&query=${value}`;
    fetching(url, rendertvPoster, renderError);

}
function renderError(){
    console.log('Error', Error);
}
function topRated(){
    var url = `https://api.themoviedb.org/3/tv/top_rated?api_key=${API}`;
    const render = rendertvContainer.bind({ title: 'Top rated'})
    
    fetching(url, render, renderError);
}
function populartvs(){
    var url = `https://api.themoviedb.org/3/tv/popular?api_key=${API}`;
    const render = rendertvContainer.bind({ title: 'The most popular'})

    fetching(url, render, renderError);
}
function airingToday(){
    var url = `https://api.themoviedb.org/3/tv/airing_today?api_key=${API}&language=en-US`;
    const render = rendertvContainer.bind({ title: 'Airing today'})

    fetching(url, render, renderError);
}