const saveInputs = (e) => {
    chrome.storage.sync.set({
        colour: document.querySelector("#colour").value,
        number: document.querySelector("#number").value,
        jambon: document.querySelector("#jambon").value,
    });
    e.preventDefault();
}

const saveApi = (e) => {
    chrome.storage.sync.set({
        search: document.querySelector("#apiChoice1").checked,
        random: document.querySelector("#apiChoice2").checked,
    });
    e.preventDefault();
}

const restoreOptions = () => {
    chrome.storage.sync.get('colour', (res) => {
        document.querySelector("#colour").value = res.colour || 'Red';
    });
    chrome.storage.sync.get('number', (res) => {
        document.querySelector("#number").value = res.number || 'Number';
    });
    chrome.storage.sync.get('jambon', (res) => {
        document.querySelector("#jambon").value = res.jambon || 'Jambon';
    });
    chrome.storage.sync.get('search', (res) => {
        document.querySelector("#apiChoice1").checked = res.search;
    });
    chrome.storage.sync.get('random', (res) => {
        document.querySelector("#apiChoice2").checked = res.random;
    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("#inputs").addEventListener("submit", saveInputs);
document.querySelector("#api").addEventListener("submit", saveApi);
