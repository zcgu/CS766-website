var httpRequest;

function seamCarving1d() { 
  lines = document.getElementById("lines").value;
  if (lines < 1 || lines > 300) {
    alert("please enter a number between 1 and 300");
    return;
  }

  httpRequest = new XMLHttpRequest();

  if (!httpRequest) {
    alert('Cannot make http request. Try using other broswers!');
    return false;
  }

  httpRequest.onreadystatechange = seamCarving1dResult;
  httpRequest.open("GET", "/seamcarving1d" + "?" + "lines=" + lines, true);
  httpRequest.send();

  document.getElementById("result-txt").innerHTML = "Please wait...";
  document.getElementById("result-img").src = "";
}

function seamCarving1dResult() {
  if (httpRequest.readyState === XMLHttpRequest.DONE) {

    if (httpRequest.status === 200) {
      document.getElementById("result-img").hidden = false;
      document.getElementById("result-img").src = httpRequest.responseText;
      document.getElementById("result-txt").innerHTML = "Result";
   } else {
      document.getElementById("result-txt").innerHTML = "Fail to get the result. Please try again!";
    }
  }
}
