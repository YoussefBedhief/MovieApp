      
        const API= '09d37d1ef15f1da302e025e160239ad9';
        const imageUrl = 'https://image.tmdb.org/t/p/w500';
        var main = document.querySelector("#main");
        var movieId = sessionStorage.getItem('movieId');
        console.log( movieId );

    

    function getMovie(){
        var url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API}`;
        fetch(url)
         .then((res) => res.json())
         .then((data) => {
             console.log(data);

    const movieElement = document.createElement('div');
    movieElement.setAttribute('class','movies');
    const movieTemplate = `
    <div class="section">
    <div class="posterBackdrop"><img src=${ imageUrl + data.backdrop_path}  />
    </div>

    <div class="section2">
    <div class="posterContainer"><img src=${ imageUrl + data.poster_path} /></div> 
    <div class="info">
    <p class="movieTitle">${data.original_title}</p><br>
    <p class="movieDate"> ${data.release_date}(${data.original_language}) </p><br>
    <p class="movieGenre">  ${data.runtime} min | ${ data.genres[0].name}</p><br>
    <p class="movieRate"><span id="star">&#9733;</span> ${data.vote_average}<span>/10</span></p><br>

    <p class="movieTagline">${data.tagline}</p><br>
    <p class="movieOverview">${data.overview}</p><br>
        
    </div>  
    </div>  
    <a onclick='window.close()' > &#8592; Back </a>
    </div>`;
    movieElement.innerHTML = movieTemplate;
    main.appendChild(movieElement);
    })
    }

    getMovie();
