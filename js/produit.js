/*fonction création éléments, attribution*/
function create(type, Qualified, nomType) {
    let nomVariable = document.createElement(type);
    nomVariable.setAttribute(Qualified, nomType);
    return nomVariable;
}
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

                /*On vient cibler la balise div ayant pour id Descriptionproduit*/
                let descriptionProduit = document.getElementById("Descriptionproduit");

                /*On crée l'affichage de la description du produit séléctionné par l'utilisateur*/
                let descriptionContainer = create("div", "class", "Blockdescription");
                let descriptionProduitB1 = create("div", "class", "B1description");
                let descriptionProduitB2 = create("div", "class", "B2description");
                let descriptionProduitNom = create("h2", "class", "Nomdescription");
                let descriptionProduitPrix = create("p", "class", "Prixdescription");
                let descriptionProduitImage = create("img", "src", data.imageUrl);
                let descriptionProduitDescription = create("p", "class", "Descriptionproduit");

                /*Attributs suplémentaires*/
                descriptionProduitImage.setAttribute("class", "Imagedescription");

                /*Hiérarchisation des élements crées*/
                descriptionProduit.appendChild(descriptionContainer);
                descriptionContainer.appendChild(descriptionProduitB1);
                descriptionContainer.appendChild(descriptionProduitB2);
                descriptionProduitB1.appendChild(descriptionProduitImage);
                descriptionProduitB2.appendChild(descriptionProduitNom);
                descriptionProduitB2.appendChild(descriptionProduitPrix);
                descriptionProduitB2.appendChild(descriptionProduitDescription);

                /*Attribution des données aux élements créees*/
                descriptionProduitNom.textContent = data.name;
                descriptionProduitPrix.textContent = data.price / 100 + " " + "euros";
                descriptionProduitDescription.textContent = data.description;

                let selectLentille = document.getElementById("couleur");

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


