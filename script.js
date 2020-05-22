'use strict';

const apiKey = '6HnPHlMOtJarOvZOkyko5oOqQJ9jLC17nS29d01F';
const searchURL = 'https://api.nps.gov/api/v1/parks';

function formatQueryParams (params){
    const queryItems = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function displayResults (responseJson){
    console.log(responseJson);
    $('#results-list').empty();
    for (let i = 0; i < responseJson.data.length; i++){
        $('#results-list').append(
            `<li><h3>${responseJson.data[i].fullName}</h3>
            <a href='${responseJson.data[i].url}'>${responseJson.data[i].url}</a>
            <p>${responseJson.data[i].description}</p>
            </li>`)
    }
    $('#results').removeClass('hidden');
}

function getParks(location, maxResults=10){
    const params = {
        key: apiKey,
        q: location,
        limit: maxResults
    }
    const queryString = formatQueryParams(params);
    const url = searchURL + '?' + queryString;

    fetch(url)
    .then(response => {
        if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
    }

function watchForm(){
    $('form').submit(event => {
        event.preventDefault();
        const searchTerm = $('#location').val();
        const maxResults = $('#js-max-results').val();
        getParks(searchTerm, maxResults);
    });
}

$(watchForm);
