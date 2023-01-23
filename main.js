//44d65228 API Key
//Base: http://www.omdbapi.com/
//Endpoints: ?apikey=44d65228&s=???
const contentEl = document.querySelector('.content')
const defDiv = document.querySelector('.def-ph')
let loadedMovies = []

document.querySelector('.search').addEventListener('click', async () =>{
    try{
        loadedMovies = []
        const inputVal = document.getElementById('input-el')
        const res = await fetch(`http://www.omdbapi.com/?apikey=44d65228&s=${inputVal.value}`)
        const data = await res.json()
        let filmHTML = ''
        for(let film of data.Search){
            const title = film.Title
            const res = await fetch(`http://www.omdbapi.com/?apikey=44d65228&t=${title}`)
            const data = await res.json()
            loadedMovies.push(data)
            console.log(data)
            let poster = ''
            if(data.Poster === 'N/A' || data.Poster === undefined){
                poster = 'images/placeholder.jpg'
            }
            else{
                poster = `${data.Poster}`
            }
            if(data.Title === undefined){
                filmHTML += ``
            }
            else{
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
        }
        inputVal.value = ''
        contentEl.innerHTML = filmHTML  
        console.log(loadedMovies)     
    }
    catch (e){
        contentEl.innerHTML = `<div class='no-results'><p>Unable to find what you’re looking for. Please try another search.</p></div>`
    }

})