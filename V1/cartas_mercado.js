const marketSheet = document.querySelector('.sheet');
const marketOriginalCards = Array.from(marketSheet.children);
const marketPlayerColors = ['#c62828', '#1565c0', '#208238', '#111111'];

document.getElementById('player-copies').addEventListener('change', event => {
    const playersEnabled = event.target.checked;
    marketSheet.classList.toggle('players', playersEnabled);
    if (!playersEnabled) {
        marketSheet.replaceChildren(...marketOriginalCards);
        return;
    }

    const copies = document.createDocumentFragment();
    marketPlayerColors.forEach(color => {
        marketOriginalCards.forEach(original => {
            const card = original.cloneNode(true);
            card.querySelector('.brand').style.color = color;
            copies.appendChild(card);
        });
    });
    marketSheet.replaceChildren(copies);
});
