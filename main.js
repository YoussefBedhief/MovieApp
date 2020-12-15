

//Selecting element
var iconElement = document.querySelector("#mainNav ul .search .icon");
var inputElement = document.querySelector("#mainNav ul .search input");
var searcheableMovie = document.querySelector("#searcheableMovie");
var movieContainer = document.querySelector("#moviesContainer");
var closeButton = document.querySelector(".close-button");


//Get the movies posters
function moviesPoster(movies){
    console.log(movies);
    return movies.map((movie) =>{
        if(movie.poster_path){
       return `<div class="posterContainer"><img src=${ imageUrl + movie.poster_path} data-movie-id=${movie.id}/><br>
       <p class="movieTitle">${movie.title}</p>
      <div class="info">
      <a onclick='selectMovie(${movie.id})'>More info</a>
      </div>     
      </div>`;     
        }
    })
}

//create the movies poster
function createMoviePoster(movies, title ='', name){
    const movieElement = document.createElement('div');
    movieElement.setAttribute('class','movie');
    const movieTemplate = `<h2>${title}</h2>
    <section class="section">
        ${moviesPoster(movies)}
    </section>
    <div class="content">
        <p id="contentClose">X</p>
    </div>`;

    movieElement.innerHTML = movieTemplate;
    return movieElement;
}

//Render the movie posters
function renderMoviePoster(data){
    searcheableMovie.innerHTML = '';
    const movies = data.results;
    console.log(data);
    const moviePoster = createMoviePoster(movies);
    searcheableMovie.appendChild(moviePoster);
}

 //Render movies container
 function renderMovieContainer(data){
    const movies = data.results;
    const moviePoster = createMoviePoster(movies, this.title);
    movieContainer.appendChild(moviePoster);
}

//Use the data from the API to the the application
    iconElement.onclick = function(event){
    var value = inputElement.value;
    searchMovies(value)
    inputElement.value = '';
}

//Create iframe fro video trailer
function createIframe(video){
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${video.key}`;
    iframe.width = 360;
    iframe.height = 315;
    iframe.allowFullscreen = true;

    return iframe;
}

//Render the movies trailers
function renderMovieTrailer(data, content){
    const videos = data.results;
            const length = videos.length > 4 ? 4 : videos.length;
            const iframeContainer = document.createElement('div');
            for(let i = 0; i< length; i++ ){
                const video = videos[i];
                const iframe = createIframe(video);
                iframeContainer.appendChild(iframe);
                content.appendChild(iframeContainer);
            }
}

 //Targetting the movies posters and displaying the trailer box
 document.onclick = function(event){
     const target = event.target;
     if(target.tagName.toLowerCase() === 'img'){
         const movieId = target.dataset.movieId;
        console.log('The movie id is : ', movieId);
         const posterContainer =  event.target.parentElement;
         const section = posterContainer.parentElement;
         const content = section.nextElementSibling;
         content.classList.add('content-display');

         //display the trailer video
        var url = `https://api.themoviedb.org/3/movie/${movieId}videos?api_key=${API}`;
         fetch(url)
         .then((res) => res.json())
         .then((data) => {
             console.log(data);
            renderMovieTrailer(data, content);
        })
         .catch(() => {
             console.log('Error');
         });
         content.innerHTML ='<p id="contentClose">X</p>';
         return movieId;
     }

     if(target.id === 'contentClose'){
         const content = event.target.parentElement;
         content.classList.remove('content-display');
     }
    }    
 
    function selectMovie(movieId){
        sessionStorage.setItem('movieId', movieId);
        window.open('movieinfo.html', '_blank');
    }   

    function getMovie(){
        let mId = sessionStorage.getItem('movieId');
        var url = `https://api.themoviedb.org/3/movie/${mId}?api_key=${API}`;
        fetch(url)
         .then((res) => res.json())
         .then((data) => {
             console.log(data);
             renderMovieInfo(data);
    })
    }


 latestMovies();
 popularMovies();
 upComingMovies();



