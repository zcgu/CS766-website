function seamCarving1d() { 
  lines = document.getElementById("lines").value;
  if (lines < 1) {
    alert("please enter a number between 1 and 300");
    return;
  }

  httpRequest = new XMLHttpRequest();

  if (!httpRequest) {
    alert('Cannot make http request. Try using other broswers!');
    return false;
  }

  httpRequest.onreadystatechange = function seamCarving1dResult() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {

      if (httpRequest.status === 200) {
        document.getElementById("result-img").hidden = false;
        document.getElementById("result-img").src = httpRequest.responseText;
        document.getElementById("result-txt").innerHTML = "Result";
     } else {
        document.getElementById("result-txt").innerHTML = "Fail to get the result. Please try again!";
      }
    }
  };

  var pic = document.getElementById("origin-img").getAttribute("src");
  httpRequest.open("POST", "/seamcarving1d" + "?" + "lines=" + lines + "&pic=" + pic, true);
  httpRequest.send();

  document.getElementById("result-txt").innerHTML = "Please wait...";
  document.getElementById("result-img").src = "";
}


function uploadImg(form) {
  var formData = new FormData(form);

  var xhr = new XMLHttpRequest();
 
  if (!xhr) {
    alert('Cannot make http request. Try using other broswers!');
    return false;
  }

  document.getElementById("origin-img").src = "";
  document.getElementById("origin-txt").innerHTML = "Please wait...";
  document.getElementById("result-img").src = "";
  document.getElementById("result-txt").src = "";

  xhr.open('POST', form.action, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {

      if (xhr.status === 200) {
        document.getElementById("origin-txt").innerHTML = "Origin Figure";
        document.getElementById("origin-img").src = xhr.responseText;
      } else {
        document.getElementById("result-txt").innerHTML = "Fail to upload. Please try again!";
      }
    }
  };
  xhr.send(formData);

  return false; // Prevent page from submitting.
}