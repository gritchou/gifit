const saveInputs = (e) => {
    chrome.storage.sync.set({
        limitation: document.querySelector("#limitation").value,
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
    chrome.storage.sync.get('limitation', (res) => {
        document.querySelector("#limitation").value = res.limitation || '5';
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
