const apiKey = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
const URL = "https://rapidapi.p.rapidapi.com/api/search/NewsSearchAPI";

function formatQueryParams(params) {
  // create an array of keys in the "params" obj
  // for each of the keys in that array, create a string with the key and the key's value in the params obj
  const query = Object.keys(params).map((key) => `${key}=${params[key]}`);
  // return a string of the keys and values, separated by "&"
  return query.join("&");
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
      "x-rapid-key": apiKey,
      mode: "cors",
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
    .then((responseJson) => console.log(responseJson));
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
