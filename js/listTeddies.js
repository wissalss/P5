const server = 'http://localhost:3000';

async function main() {
    const teddies = await fetch(server + '/api/teddies')
        .then(response => response.json())
        .catch(console.error);

    let teddiesHtml = '';

    for (let teddy of teddies) {
        teddiesHtml += `<div>
            <img src="${teddy.imageUrl}" alt="${teddy.name}">
            ${teddy.name}
        </div>`;
    }


    document.getElementById('teddies').innerHTML = teddiesHtml;
    console.log(teddiesHtml);
}

main();