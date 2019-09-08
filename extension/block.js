'use strict';

// template for box which shows up under disabled form
var block = document.createElement("div");
block.id = "dropdown";
block.style.height = "50px";
block.style.width = "400px";
block.style.backgroundColor = "#8c52ff";
block.style.display = "none";
block.style.position = "absolute";
block.style.setProperty("z-index", 4);

// content which goes inside block
var blockContent = document.createElement("p");
blockContent.innerHTML = "<p>This input form was blocked.</p><button type='submit'>Request Access</button>";
block.appendChild(blockContent);

//have to look through list of approved sites

var inputs = document.getElementsByTagName('input');
for (var i = 0; i < inputs.length; i++) {
  if (inputs[i].name.includes("address") || 
      inputs[i].name.includes("Address") || 
      inputs[i].name.includes("Credit") || 
      inputs[i].name.includes("credit") || 
      inputs[i].name.includes("regist") || 
      inputs[i].name.includes("Regist") || 
      inputs[i].name.includes("name") || 
      inputs[i].name.includes("Name") || 
      inputs[i].name.includes("email") || 
      inputs[i].name.includes("Email") || 
      inputs[i].name.includes("phone") || 
      inputs[i].name.includes("Phone") || 
      inputs[i].name.includes("q")) {
    inputs[i].disabled = true;
    // searchBox is parent box which contains the input box
    var searchBox = inputs[i].closest("div");
    var color = searchBox.style.backgroundColor;
    console.log(searchBox.id);
    searchBox.appendChild(block);

    // box shows up under input form box when mouse is over the box

    searchBox.onmouseover = function() {
      document.getElementById("dropdown").style.display = "block";
    }
    
    //box disappears when mouse is not over box
    //searchBox.onmouseout = function() {
    //  document.getElementById("dropdown").style.display = "none";
    //}
  }
}

