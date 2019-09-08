// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

var config = {
    apiKey: "AIzaSyAZX52V-IagCyWovMUuQlLqJ1tGis2-p_g",
    authDomain: "safe-net-b4943.firebaseapp.com",
    databaseURL: "https://safe-net-b4943.firebaseio.com",
    projectId: "safe-net-b4943",
    storageBucket: "safe-net-b4943.appspot.com",
    messagingSenderId: "905209769858",
    appId: "1:905209769858:web:cc537bb93c7b831c2e699b"
};

const app = firebase.initializeApp(config);
const db = app.database().ref("websites");

// check for safety before sending the object

chrome.runtime.onMessage.addListener((msg) => {
  db.push({url: msg.url, type: "pending", safe: null});
});  

//don't know if this continuously updates?
//async???
/*
var blocked = db.orderByChild("type").equalTo("blocked").toJSON();
var blockedList = "";
for (var i in blocked){
  blockedList += i.url;
}
*/

var blockedList = "https://www.instagram.com/";

var isLoaded = false;

const fetchWebsites = function(){
  console.log("hi");
  db.on('value', function(snapshot){
    var websites = snapshot.val();
    let keys = Object.keys(websites).filter(key => {
    return websites[key]['type'] === 'blocked'
    }); 
      blockedList = keys.map(key => {
        return websites[key]['url'];
      }
    );

    console.log(blockedList);
    isLoaded = true;
    
  /* blockedList = websites.map(w => {
      return w.url;
    })*/
  });
}

fetchWebsites();

if (isLoaded) {
  var attach = function(site) {chrome.webRequest.onBeforeRequest.addListener(function(details) {
    return { redirectUrl: chrome.extension.getURL("blocked.html" )};
  }, { urls: [ site ]}, ["blocking"]) };j

  for (var i = 0; i < blockedList.length; i++) {
    attach(blockedList[i]);
  }
} else {
  chrome.webRequest.onBeforeRequest.addListener(function(details) {
    return { redirectUrl: chrome.extension.getURL("blocked.html" )};
  }, { urls: [ blockedList ]}, ["blocking"]) 
}

chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        //pageUrl: {hostEquals: 'developer.chrome.com'},
      })
      ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});
