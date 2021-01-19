/*Création de la variable contenant l'id*/
const params = new URLSearchParams(window.location.search);
let teddyId = params.get("id");
let objectSelected = '';
let colorSelected = '';
let quantitySelected = '';
let product = '';

fetch("http://localhost:3000/api/teddies" + "/" + teddyId)
    .then(response => response.json())
    .then(product => {
        let color = "";
        product.colors.forEach(couleur => {
            color += `<option value="${couleur}">${couleur}</option>`;
        });
        let produit = document.getElementById("Descriptionproduit");
        produit.innerHTML = `<div class="descriptionContainer">
                <div class="B1description"> <img src="${product.imageUrl}" class="Imagedescription" alt="${product.name}"> </div>
                <div class="B2description">
                    <h2 class="Nomdescription"> ${product.name}</h2>
                    <p class="Descriptionproduit">${product.description} </p>
                    <div class="divColors"><label for="couleur">Choisissez la couleur de votre Teddy:</label>
                    <select name="couleur" id="selectedColor">${color}</select></div>
                    <div class="divQuantity"><label  for="QuantiteProduit">Quantité</label>
                   <input id="inputQuantity" type="number" min="1" value="1"/></div>
                    <p id="totalPrice" class="Prixdescription">${product.price / 100 + " ,00" + "€"} </p>
                </div>
                </div>`;

        /*Ajouter un article au panier*/
        function ajouterAuPanier() {
            const bouton = document.getElementById("Boutonpanier");
            bouton.addEventListener("click", async function () {
                colorSelected = document.getElementById('selectedColor').value;
                quantitySelected = document.getElementById('inputQuantity').value;
                let teddySubTotal = quantitySelected * product.price / 100;
                objectSelected = {
                    productId: product._id,
                    image: product.imageUrl,
                    name: product.name,
                    colors: colorSelected,
                    quantity: quantitySelected,
                    price: product.price / 100,
                    totalPrice: teddySubTotal,
                };
                panier.push(objectSelected);
                localStorage.setItem("monPanier", JSON.stringify(panier));
                location.reload();
            });
        };
        ajouterAuPanier();
    });


