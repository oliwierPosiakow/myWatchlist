//44d65228 API Key
//Base: http://www.omdbapi.com/
//Endpoints: ?apikey=44d65228&s=???
fetch('http://www.omdbapi.com/?apikey=44d65228&s=star_wars')
    .then(res => res.json())
    .then(data => console.log(data))