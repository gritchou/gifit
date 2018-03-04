const baseUrl = 'https://giphy.com/search/';

const GIPHY_KEY = '';
const GIPHY_API = 'https://api.giphy.com';

const transformSelection = (selection) => selection.replace(' ', '-');

const getUri = (selection) => baseUrl + transformSelection(selection);

const addToClipBoard = (gifUrl) => {
	bg = chrome.extension.getBackgroundPage();
	bg.document.body.innerHTML= ""; // clear the background page
	helper = bg.document.createElement("textarea");
	document.body.appendChild(helper);
	helper.innerHTML = gifUrl;
	helper.select();
	bg.document.execCommand("Copy");
};

const processRequest = (query) => {
	const xhr = new XMLHttpRequest();
	xhr.responseType = "json";
	xhr.onreadystatechange = () => {
		if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
			const gifUrl = xhr.response.data[0].bitly_url;
			addToClipBoard(gifUrl);
		}
	}
	xhr.open('GET', `${GIPHY_API}/v1/gifs/search?api_key=${GIPHY_KEY}&q=${query}`, true);
	xhr.send();
};

const gifit = (info, tab) => {
	if (info.menuItemId === 'gifit') {
		const text = info.selectionText;
		processRequest(text);
	}
};

chrome.contextMenus.create({
	id: 'gifit',
	title: 'Copy related gif to clipboard',
	contexts: ['selection'],
	onclick: gifit,
});
