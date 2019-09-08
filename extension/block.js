'use strict';

// template for box which shows up under disabled form
var block = document.createElement("div");
block.id = "dropdown";
block.style.height = "100px";
block.style.width = "220px";
block.style.backgroundColor = "white";
//block.style.borderStyle = "solid";
//block.style.borderColor = "#8c52ff";
//block.style.borderWidth = "3px";
block.style.display = "none";
block.style.position = "fixed";
block.style.top = "50px";
block.style.right = "10px";
block.style.setProperty("z-index", 1000);
block.style.borderRadius = "20px";
block.style.padding = "1em";

// content which goes inside block
var blockContent = document.createElement("div");
blockContent.innerHTML = "<p style='color:black;font-size:15px;font-family:Roboto'>This input form was blocked.</p><button id='requestButton' type='submit' style='border-radius:10px;cursor:pointer;max-height:4em;font-size:15px;margin:auto;display:block;padding:1em;color:white;transition: color 0.3s linear;font-family:Roboto;background-color:#8c52ff'>Request Access</button>";

var closeButton = document.createElement("span");
closeButton.style.marginLeft = "10px";
closeButton.style.fontWeight = "bold";
closeButton.style.float = "right";
closeButton.style.fontSize = "15px";
closeButton.style.lineHeight = "15px";
closeButton.style.cursor = "pointer";
closeButton.onclick = function() {
  this.parentElement.style.display = "none";
};
closeButton.innerText = "x";

block.appendChild(closeButton);
block.appendChild(blockContent);

//have to look through list of approved sites

var nameCheck = function(input) {
  if (inputs[i].name.includes("address") || 
      inputs[i].name.includes("Address") || 
      inputs[i].name.includes("city") || 
      inputs[i].name.includes("City") || 
      inputs[i].name.includes("postal") || 
      inputs[i].name.includes("Postal") || 
      inputs[i].name.includes("country") || 
      inputs[i].name.includes("Country") || 
      inputs[i].name.includes("Credit") || 
      inputs[i].name.includes("credit") || 
      inputs[i].name.includes("regist") || 
      inputs[i].name.includes("Regist") || 
      inputs[i].name.includes("last") || 
      inputs[i].name.includes("Last") || 
      inputs[i].name.includes("phone") || 
      inputs[i].name.includes("Phone")) {
        return true;
      } else {
        return false;
      }
}

var placeholderCheck = function(input) {
  if (inputs[i].placeholder.includes("address") || 
      inputs[i].placeholder.includes("Address") || 
      inputs[i].placeholder.includes("city") || 
      inputs[i].placeholder.includes("City") || 
      inputs[i].placeholder.includes("postal") || 
      inputs[i].placeholder.includes("Postal") || 
      inputs[i].placeholder.includes("country") || 
      inputs[i].placeholder.includes("Country") || 
      inputs[i].placeholder.includes("Credit") || 
      inputs[i].placeholder.includes("credit") || 
      inputs[i].placeholder.includes("regist") || 
      inputs[i].placeholder.includes("Regist") || 
      inputs[i].placeholder.includes("last") || 
      inputs[i].placeholder.includes("Last") || 
      inputs[i].placeholder.includes("phone") || 
      inputs[i].placeholder.includes("Phone")) {
        return true;
      } else {
        return false;
      }
}

var titleCheck = function(input) {
  if (inputs[i].title.includes("address") || 
      inputs[i].title.includes("Address") || 
      inputs[i].title.includes("city") || 
      inputs[i].title.includes("City") || 
      inputs[i].title.includes("postal") || 
      inputs[i].title.includes("Postal") || 
      inputs[i].title.includes("country") || 
      inputs[i].title.includes("Country") || 
      inputs[i].title.includes("Credit") || 
      inputs[i].title.includes("credit") || 
      inputs[i].title.includes("regist") || 
      inputs[i].title.includes("Regist") || 
      inputs[i].title.includes("last") || 
      inputs[i].title.includes("Last") || 
      inputs[i].title.includes("phone") || 
      inputs[i].title.includes("Phone")) {
        return true;
      } else {
        return false;
      }
}

var inputs = document.getElementsByTagName('input');
for (var i = 0; i < inputs.length; i++) {
    if (nameCheck(inputs[i]) || placeholderCheck(inputs[i]) || 
        titleCheck(inputs[i])) {
      inputs[i].disabled = true;
    // searchBox is parent box which contains the input box
    var searchBox = inputs[i].closest("div");
    //console.log(searchBox.classList);

    searchBox.appendChild(block);
    //document.body.appendChild(block);    
    document.body.insertBefore(block, document.body.firstChild);
    //var rect = inputs[i].getBoundingClientRect();

    // box shows up under input form box when mouse is over the box

    searchBox.onmouseover = function() {
      document.getElementById("dropdown").style.display = "block";
    }
    
    document.getElementById("requestButton").onclick = function() {
      var url = window.location.toString();
      console.log(url);
      chrome.runtime.sendMessage({"url": url}); 
    };
  }
}

