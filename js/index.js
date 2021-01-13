const server = 'http://localhost:3000';

async function main() {
    const teddies = await fetch(server + '/api/teddies')
        .then(response => response.json())
        .catch(console.error);

    let teddiesHtml = '';
    for (let teddy of teddies) {
        teddiesHtml +=
            `<div class="card">
           <img src="${teddy.imageUrl}" class="teddyImg" alt="${teddy.name}"> 
           <h2 class="teddyTitle"> ${teddy.name} </h2>
           <div class="teddyDescription"> ${teddy.description} </div>
           <div class="teddyPrice"> ${teddy.price / 100 + ",00 " + "€"} </div>
           <a class="teddyBtnDetails" href="produit.html?id=${teddy._id}" > <i class="fas fa-info-circle"></i> En savoir plus</a>
          
        </div>`;
    }
    document.getElementById('teddies').innerHTML = teddiesHtml;
}

main();