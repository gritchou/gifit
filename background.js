const baseUrl = 'https://giphy.com/search/';

const GIPHY_KEY = '58qN5PSXUFubU7GFzt8W8Uih1sKTGquL';
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
                .then((json) => json.data.slice(0, 5).map((gif) => gif.images.original.url))
            ;
        } else {
            apiPromise = fetch(`${GIPHY_API}/v1/gifs/random?api_key=${GIPHY_KEY}`)
                .then((response) => response.json())
                .then((json) => [json.data.image_url])
            ;
        }
        apiPromise.then((gifs) => {
            // addToClipBoard(gifUrl);
            sendGifs(gifs);
        });
    });
};

const gifit = (info, tab) => {
	if (info.menuItemId === 'gifit') {
		const text = info.selectionText;
		processRequest(text);
	}
};

const sendGifs = (gifs) => {
    chrome.runtime.sendMessage({ gifs });
}

chrome.contextMenus.create({
	id: 'gifit',
	title: 'Add gifs to popup',
	contexts: ['selection'],
	onclick: gifit,
});
