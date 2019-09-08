navigator.registerProtocolHandler("web+blockstack",
	"https://burgers.example.com/?burger=%s",
	"Blockstack handler");

console.log('Hello');
const button = document.getElementById('disable-button');
console.log("button");

const appConfig = new blockstack.AppConfig(["store_write"]);
const userSession = new blockstack.UserSession({ appConfig: appConfig });

document.getElementById('disable-button').addEventListener('click', function () {
	userSession.redirectToSignIn();
})
