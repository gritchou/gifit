const generateGifs = (gifs) => {
    // const gifUrls = ["http://www.jdubuzz.com/files/2015/11/amour.jpg"];
    gifs.forEach((gifUrl) => createGif(gifUrl));
}

const createGif = (gifUrl) => {
    const gifs = document.querySelector('.gifs');
    const gif = document.createElement('img');
    gif.src = gifUrl;
    gif.height = '200';
	gifs.appendChild(gif);
};

const callListener = (request, sender, sendResponse) => {
    if (request.gifs) {
        generateGifs(request.gifs);
    }
}

chrome.runtime.onMessage.addListener(callListener);
