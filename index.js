var httpRequest;

function functionOne() { 
  httpRequest = new XMLHttpRequest();

  if (!httpRequest) {
    alert('Cannot make http request. Try using other broswers!');
    return false;
  }

  httpRequest.onreadystatechange = alertContents;
  httpRequest.open("GET", "./main", true);
  httpRequest.send();
}

function alertContents() {
  if (httpRequest.readyState === XMLHttpRequest.DONE) {
    if (httpRequest.status === 200) {
      alert(httpRequest.responseText);
    } else {
      alert('Fail to get the result. Please try again!');
    }
  }
}