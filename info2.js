      
        const API= '09d37d1ef15f1da302e025e160239ad9';
        const imageUrl = 'https://image.tmdb.org/t/p/w500';
        var main = document.querySelector("#main");
        var tvId = sessionStorage.getItem('tvId');
        console.log( tvId );

    

    function gettv(){
        var url = `https://api.themoviedb.org/3/tv/${tvId}?api_key=${API}`;
        fetch(url)
         .then((res) => res.json())
         .then((data) => {
             console.log(data);

    const tvElement = document.createElement('div');
    tvElement.setAttribute('class','tvs');
    const tvTemplate = `
    <div class="section">
    <div class="posterBackdrop"><img src=${ imageUrl + data.backdrop_path}  />
    </div>

    <div class="section2">
    <div class="posterContainer"><img src=${ imageUrl + data.poster_path} /></div> 
    <div class="info">
    <p class="tvTitle">${data.name}</p><br>
    <p class="tvDate"> ${data.first_air_date}(${data.original_language}) </p><br>
    <p class="tvGenre"> ${data.number_of_seasons} seasons | ${data.number_of_episodes} episode | ${ data.genres[0].name}</p><br>
    <p class="tvRate"><span id="star">&#9733;</span> ${data.vote_average}<span>/10</span></p><br>

    <p class="tvTagline">${data.tagline}</p><br>
    <p class="tvOverview">${data.overview}</p><br>
        
    </div>  
    </div>  
    <a onclick='window.close()' > &#8592; Back </a>
    </div>`;
    tvElement.innerHTML = tvTemplate;
    main.appendChild(tvElement);
    })
    }

    gettv();
