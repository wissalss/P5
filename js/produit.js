/*Création de la variable contenant l'id*/
const params = new URLSearchParams(window.location.search);
let teddyId = params.get("id");

/*Appel du produit séléctionné*/
let myVariables; //On stock les données du produit dans cette variable.

async function selectionProduit() {
    await fetch("http://localhost:3000/api/teddies" + "/" + teddyId)
        .then(function (response) {
            response.json().then(function (data) {
                myVariables = data;
                let color = "";
                data.colors.forEach(couleur => {
                    color += `<option value="${couleur}">${couleur}</option>`;
                });

                let produit = document.getElementById("Descriptionproduit");
                produit.innerHTML = `<div class="descriptionContainer">
                <div class="B1description"> <img src="${data.imageUrl}" class="Imagedescription" alt="${data.name}"> </div>
                <div class="B2description">
                    <h2 class="Nomdescription"> ${data.name}</h2>
                    <p class="Descriptionproduit">${data.description} </p>
                    <div class="divColors"><label for="couleur">Choisissez la couleur de votre Teddy:</label>
                    <select name="couleur" id="selectedColor">${color}</select></div>
                    <div class="divQuantity"><label  for="QuantiteProduit">Quantité</label>
                   <input id="inputQuantite" type="number" min="1" value="1"/></div>
                    <p class="Prixdescription">${data.price / 100 + ",00 " + "€"} </p>
                </div>
                </div>`;

                let selectCouleur = document.getElementById("couleur");

                data.colors.forEach(couleur => {
                    let option = document.createElement("option");
                    selectCouleur.appendChild(option);
                    option.setAttribute("value", "couleur");
                    option.textContent = couleur;
                });
            })
        })
}
selectionProduit();

/*Ajouter un article au panier*/
function ajouterAuPanier() {
    const bouton = document.getElementById("Boutonpanier");
    bouton.addEventListener("click", async function () {
        panier.push(myVariables);
        localStorage.setItem("monPanier", JSON.stringify(panier));
        location.reload();
    });
};
ajouterAuPanier();