//44d65228 API Key
//Base: http://www.omdbapi.com/
//Endpoints: ?apikey=44d65228&s=???
const contentEl = document.querySelector('.content')



//searchnig for a movie and then displaying the results

document.querySelector('.search').addEventListener('click', async () =>{

    const inputVal = document.getElementById('input-el')
    const res = await fetch(`http://www.omdbapi.com/?apikey=44d65228&s=${inputVal.value}`)
    const data = await res.json()
    let filmHTML = ''

    for(let film of data.Search){
        const title = film.Title
        const res = await fetch(`http://www.omdbapi.com/?apikey=44d65228&t=${title}`)
        const data = await res.json()
        console.log(film)
        //poster selection in case the poster is not in a database
        let poster = ''
        data.Poster === 'N/A' || data.Poster === undefined ? poster = 'images/placeholder.jpg' :  poster = `${data.Poster}`
        
        //Creating a movie HTML scheme
        filmHTML += `
            <div class="movie">
                <img class="poster" src='${poster}'>
                <h5 class="title">${data.Title}</h5>
                <i class="fa-solid fa-star"><p class="rate">${data.imdbRating}</p></i>
                <p class="watchtime">${data.Runtime}</p>
                <p class="genre">${data.Genre}</p>
                <button class="film-btn" id="add-btn"><i class="fa-solid fa-circle-plus"></i>Watchlist</button>
                <p class="plot">${data.Plot}</p>
            </div>
        `
    }
    inputVal.value = ''
    contentEl.innerHTML = filmHTML   
})