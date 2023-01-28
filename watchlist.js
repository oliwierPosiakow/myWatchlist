const contentEL = document.querySelector('.content')

function getWatchlist(){
    let watchlistHTML = ``

    try{
        const watchlist = JSON.parse(localStorage.getItem('watchlistMovies'))
        for(let movie of watchlist){

            watchlistHTML += `
                <div class="movie">
                    <img class="poster" src='${movie.Poster}'>
                    <h5 class="title">${movie.Title}</h5>
                    <i class="fa-solid fa-star"><p class="rate">${movie.imdbRating}</p></i>
                    <p class="watchtime">${movie.Runtime}</p>
                    <p class="genre">${movie.Genre}</p>
                    <button class="film-btn" id="remove-btn" data-imdb = ${movie.imdbID}><i class="fa-solid fa-circle-minus"></i>Remove</button>
                    <p class="plot">${movie.Plot}</p>
                </div>
            `
        }
        return watchlistHTML
    }
    catch(error){
        console.log(error)
        return false
    }
}

document.addEventListener('click',(e) =>{

    //Removing movie from the watchlist
    if(e.target.id === 'remove-btn'){
        const oldArr = JSON.parse(localStorage.getItem('watchlistMovies'))

        const newArr = oldArr.filter(movie => {
            return movie.imdbID != e.target.dataset.imdb
        })
        localStorage.setItem('watchlistMovies', JSON.stringify(newArr))

        //if there are still other movies in watchlist render them, if not, render placeholder
        if(getWatchlist()){
            contentEL.innerHTML = getWatchlist()
        }
        else{
            contentEL.innerHTML = `
                <div class="def-watchlist">
                    <p>It looks like nothing is in here...</p> 
                    <a href="main.html"><i class="fa-solid fa-circle-plus"></i> Find a movie to add</a>
                </div> 
            `
        }
    }
})

if(getWatchlist()){
    contentEL.innerHTML = getWatchlist()
}



