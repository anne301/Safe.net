import { websitesRef } from './firebase';

export const addWebsite = website => {
	const url = website.url;
	if (url[url.length - 1] === '/') { website.url = url + '*/'; }
	else { website.url = url + '/*/' }
	console.log(website);
	websitesRef.push(website);
}

export const removeWebsite = website => {
	websitesRef.child(website.key).remove();
}

export const fetchWebsites = (onFetch) => {
	websitesRef.on('value', snapshot => {
		onFetch(snapshot.val())
	})
}
