

//Selecting element
var iconElement = document.querySelector("#mainNav ul .search .icon");
var inputElement = document.querySelector("#mainNav ul .search input");
var searcheabletv = document.querySelector("#searcheabletv");
var tvContainer = document.querySelector("#tvsContainer");
var closeButton = document.querySelector(".close-button");


//Get the tvs posters
function tvsPoster(tvs){
    console.log(tvs);
    return tvs.map((tv) =>{
        if(tv.poster_path){
       return `<div class="posterContainer"><img src=${ imageUrl + tv.poster_path} data-tv-id=${tv.id}/><br>
       <p class="tvTitle">${tv.name}</p>
      <div class="info">
      <a onclick='selecttv(${tv.id})'>More info</a>
      </div>     
      </div>`;     
        }
    })
}

//create the tvs poster
function createtvPoster(tvs, title ='', name){
    const tvElement = document.createElement('div');
    tvElement.setAttribute('class','tv');
    const tvTemplate = `<h2>${title}</h2>
    <section class="section">
        ${tvsPoster(tvs)}
    </section>
    <div class="content">
        <p id="contentClose">X</p>
    </div>`;

    tvElement.innerHTML = tvTemplate;
    return tvElement;
}

//Render the tv posters
function rendertvPoster(data){
    searcheabletv.innerHTML = '';
    const tvs = data.results;
    console.log(data);
    const tvPoster = createtvPoster(tvs);
    searcheabletv.appendChild(tvPoster);
}

 //Render tvs container
 function rendertvContainer(data){
    const tvs = data.results;
    const tvPoster = createtvPoster(tvs, this.title);
    tvContainer.appendChild(tvPoster);
}

//Use the data from the API to the the application
    iconElement.onclick = function(event){
    var value = inputElement.value;
    searchtv(value);
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

//Render the tvs trailers
function rendertvTrailer(data, content){
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

 //Targetting the tvs posters and displaying the trailer box
 document.onclick = function(event){
     const target = event.target;
     if(target.tagName.toLowerCase() === 'img'){
         const tvId = target.dataset.tvId;
        console.log('The tv id is : ', tvId);
         const posterContainer =  event.target.parentElement;
         const section = posterContainer.parentElement;
         const content = section.nextElementSibling;
         content.classList.add('content-display');

         //display the trailer video
        var url = `https://api.themoviedb.org/3/tv/${tvId}videos?api_key=${API}`;
         fetch(url)
         .then((res) => res.json())
         .then((data) => {
             console.log(data);
            rendertvTrailer(data, content);
        })
         .catch(() => {
             console.log('Error');
         });
         content.innerHTML ='<p id="contentClose">X</p>';
         return tvId;
     }

     if(target.id === 'contentClose'){
         const content = event.target.parentElement;
         content.classList.remove('content-display');
     }
    }    
 
    function selecttv(tvId){
        sessionStorage.setItem('tvId', tvId);
        window.open('tvinfo.html', '_blank');
    }   

    function gettv(){
        let mId = sessionStorage.getItem('tvId');
        var url = `https://api.thetvdb.org/3/tv/${mId}?api_key=${API}`;
        fetch(url)
         .then((res) => res.json())
         .then((data) => {
             console.log(data);
             rendertvInfo(data);
    })
    }


    airingToday();
populartvs();
topRated();



