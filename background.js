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
    chrome.storage.sync.get('search', (res) => {
        let apiPromise;
        if(res.search) {
            apiPromise = new Promise((resolve) => {
                chrome.storage.sync.get('limitation', (res) => {
                    resolve(`${GIPHY_API}/v1/gifs/search?api_key=${GIPHY_KEY}&q=${query}&limit=${res.limitation}`);
                });
            })
                .then((api) => fetch(api))
                .then((response) => response.json())
                .then((json) => json.data[0].bitly_url)
            ;
        } else {
            apiPromise = fetch(`${GIPHY_API}/v1/gifs/random?api_key=${GIPHY_KEY}`)
                .then((response) => response.json())
                .then((json) => json.data.bitly_url)
            ;
        }
        apiPromise.then((gifUrl) => {
			addToClipBoard(gifUrl);
        });
    });
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
