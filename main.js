//44d65228 API Key
//Base: http://www.omdbapi.com/
//Endpoints: ?apikey=44d65228&s=???
const contentEl = document.querySelector('.content')
const defDiv = document.querySelector('.def-ph')
let loadedMovies = []

//find and render movies

document.querySelector('.search').addEventListener('click', async () =>{
    
    contentEl.innerHTML = `<img src='./images/loading.svg' alt='Loading spinner' class='loading'>`
    try{
        loadedMovies = []
        const inputVal = document.getElementById('input-el')
        const res = await fetch(`https://www.omdbapi.com/?apikey=44d65228&s=${inputVal.value}`)
        const data = await res.json()
        let filmHTML = ''
        for(let film of data.Search){

            const title = film.Title
            const res = await fetch(`https://www.omdbapi.com/?apikey=44d65228&t=${title}`)
            const data = await res.json()

            loadedMovies.push(data)
            
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
                    <button class="film-btn hidden" id="remove-btn" data-imdb = ${data.imdbID}><i class="fa-solid fa-circle-minus"></i>Remove</button>
                    <button class="film-btn" id="add-btn" data-imdb = ${data.imdbID}><i class="fa-solid fa-circle-plus"></i>Watchlist</button>
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

//add movies to localStorage

document.addEventListener('click', (e)=>{
    if(e.target.id === 'add-btn'){
        let tempArr = []
        const addButtons = document.getElementsByClassName('film-btn')
        const modal = document.querySelector('.modal')

        //swap buttons
        const targetBtn = Object.values(addButtons).filter(btn => {
            return btn.dataset.imdb === e.target.dataset.imdb
        })
        targetBtn[0].classList.toggle('hidden')
        targetBtn[1].classList.toggle('hidden')
        console.log(targetBtn)

        //get and set localStorage
        const targetMovies = loadedMovies.filter(movie => {
            return movie.imdbID === e.target.dataset.imdb
        })

        if(localStorage.getItem('watchlistMovies')){
            tempArr = JSON.parse(localStorage.getItem('watchlistMovies'))
        }
        tempArr.push(targetMovies[0])
        localStorage.setItem('watchlistMovies',JSON.stringify(tempArr))


        //fire modal
        modal.classList.toggle('modal-animation')
        setTimeout(()=>{
            modal.classList.toggle('modal-animation')
        },3000)
    }
    if(e.target.id === 'remove-btn'){
        const addButtons = document.getElementsByClassName('film-btn')
        const targetBtn = Object.values(addButtons).filter(btn => {
            return btn.dataset.imdb === e.target.dataset.imdb
        })
        const oldArr = JSON.parse(localStorage.getItem('watchlistMovies'))

        targetBtn[0].classList.toggle('hidden')
        targetBtn[1].classList.toggle('hidden')

        const newArr = oldArr.filter(movie => {
            return movie.imdbID != e.target.dataset.imdb
        })
        localStorage.setItem('watchlistMovies', JSON.stringify(newArr))
    }
})