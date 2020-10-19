"use strict";

const apiKey = "XXXXXXXXXXXXXXXXXXXXXXXXXXX";
const HOST = "contextualwebsearch-websearch-v1.p.rapidapi.com";
const URL = "https://rapidapi.p.rapidapi.com/api/search/NewsSearchAPI";

function formatQueryParams(params) {
  // create an array of keys in the "params" obj
  // for each of the keys in that array, create a string with the key and the key's value in the params obj
  const query = Object.keys(params).map(
    (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
  );
  // return a string of the keys and values, separated by "&"
  return query.join("&");
}

function displayResults(responseObj, maxResults) {
  // if previous results, remove them
  console.log(responseObj);
  $("#results-list").empty();
  // for each obj in the articles array, add a list item
  // to the results list with the article title, source, author
  // description, and image
  for (let i = 0; (i < responseObj.value.length) & (i < maxResults); i++) {
    $("#results-list").append(
      `<li><h3><a href="${responseObj.value[i].url}">
          ${responseObj.value[i].title}</a></h3>
          <p>${responseObj.value[i].description}</p>
          <p>${responseObj.value[i].body}</p>
          </li>
          `
    );
  }
  $("#results").removeClass("hidden");
}

// FUNC: GET getNews()
function getNews(query, maxResults = 10) {
  // create query params
  const params = {
    // set the "q" param equal to the value the user input
    q: query,
    pageSize: maxResults,
  };

  const queryString = formatQueryParams(params);
  const url = URL + "?" + queryString;

  // set the headers
  const options = {
    headers: new Headers({
      "x-rapidapi-host": HOST,
      "x-rapidapi-key": apiKey,
    }),
  };

  fetch(url, options)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.statusText);
      }
    })
    .then((responseJson) => displayResults(responseJson, maxResults))
    .catch((err) => {
      $("#js-error-message").text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $("form").submit(function (e) {
    e.preventDefault();
    let search = $("#js-search-news").val();
    let count = $("#js-max-results").val();
    getNews(search, count);
  });
}

$(watchForm);
