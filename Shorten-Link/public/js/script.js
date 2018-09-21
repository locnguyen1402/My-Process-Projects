$(document).ready(function() {

  const APIKey = "d42bb89336344216a9b726f0fbe97b87";
  const rebrandlyUrl = 'https://api.rebrandly.com/v1/links';


  const btnShorten = $('#button');
  const inputField = $("#input-field");
  var output_container = $('#output-container');

  const getShortenLink = () => {

    const urlToShort = inputField.val();

    const data = JSON.stringify({
      destination: urlToShort
    });

    const xhr = new XMLHttpRequest();
    xhr.responseType = "json";

    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        renderResponse(xhr.response);
      }
    }
    xhr.open('POST', rebrandlyUrl);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.setRequestHeader('apikey', APIKey);
    xhr.send(data);
  };

  const displayShortenLink = (ev) => {
    ev.preventDefault();
    if (inputField.val() === "") {
      alert("Type your URL in the input field!!");
    } else {
      getShortenLink();
    }
  };
  btnShorten.click(displayShortenLink);

  const renderResponse = (res) => {
    if (res.errors) {
      $("#output").html(`<p>Sorry, Couldn't format your URL</p>`);
    } else {
      $("#output").html(`<p>${res.shortUrl}</p>`);
    }
  }
});