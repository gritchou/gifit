const baseUrl = 'https://giphy.com/search/';

const transformSelection = (selection) => selection.replace(' ', '-');

const getUri = (selection) => `${baseUrl}/` + transformSelection(selection);

const gifit = (info, tab) => {
    if (info.menuItemId === 'gifit') {
        const text = info.selectionText;
        chrome.tabs.create({
            "url": getUri(text),
        });
    }
}

chrome.contextMenus.create({
    id: 'gifit',
    title: 'Search "%s" on Giphy',
    contexts: ['selection'],
    onclick: gifit,
});
