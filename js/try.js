/*Création de la variable contenant l'id*/
const params = new URLSearchParams(window.location.search);
let teddyId = params.get("id");

/*Appel du produit séléctionné*/
let myVariables; //On stock les données du produit dans cette variable.

async function selectionProduit() {
    await fetch("http://localhost:3000/api/teddies" + "/" + teddyId)
        .then(function (response) {
            response.json().then(function (data) {

                let color = "";
                data.colors.forEach(couleur => {
                    color += `<option value="${couleur}">${couleur}</option>`;
                });

                myVariables = data;
                let produit = document.getElementById("Descriptionproduit");
                produit.innerHTML = `<div class="descriptionContainer">
                <div class="B1description"> <img src="${data.imageUrl}" class="Imagedescription" alt="${data.name}"> </div>
                <div class="B2description">
                    <h2 class="Nomdescription"> ${data.name}</h2>
                    <p class="Descriptionproduit">${data.description} </p>
                    <div class="divColors"><label for="couleur">Choisissez la couleur de votre Teddy:</label>
                    <select name="couleur" id="selectedColor">${color}</select></div>
                    <p class="Prixdescription">${data.price / 100 + ",00 " + "€"} </p>
                </div>
                </div>`;
                let colorElm = document.getElementById('selectedColor');
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


<div class="divQuantity"><label  for="QuantiteProduit">Quantité</label>
                   <input id="inputQuantite" type="number" min="1" value="1"/></div>

////////// panier 

const urlOrder = "http://localhost:3000/api/teddies/order";

/*fonction création éléments, attribution*/
function create(type, Qualified, nomType) {
    let nomVariable = document.createElement(type);
    nomVariable.setAttribute(Qualified, nomType);
    return nomVariable;
}

let panier = JSON.parse(localStorage.getItem("monPanier")); // pour stocker le panier dans cette variable

/*Fonction affichant le nombre d'article dans le panier dans le nav*/
function nombreArticle() {
    let numberArticle = document.getElementById("Numberarticle");
    numberArticle.textContent = panier.length;
}
nombreArticle();

/*Fonction de suppression d'article du panier*/
function suppressionArticle(i) {
    panier.splice(i, 1);
    localStorage.clear();
    localStorage.setItem("monPanier", JSON.stringify(panier));
    window.location.reload();
}

let total = 0; //On stock le prix total dans cette variable afin de l'afficher dans le tableau et dans l'URL

/*Affichage du panier utilisateur dans la page "panier"*/
function affichagePanier() {
    if (panier.length > 0) {
        document.getElementById("panierVide").remove();

        let produitPanier = document.getElementById("Sectionpanier");
        produitPanier.innerHTML = `
        <div class="tableauPanier"> 
            <div class="tableauHeaderLigne"> 
                <div> Article </div>
                <div> Produit </div>
                <div> Couleur </div>
                <div> Quantité </div>
                <div> Prix </div>
                <div> Action </div>
            </div>
        </div>
        `;

        /*Nous allons présenter le panier à l'utilisateut sous forme de tableau que nous plaçons dans la section "Sectionpanier"*/
        let tableauSection = document.getElementById("Sectionpanier");

        //Création du tableau
        let tableauPanier = create("div", "class", "tableauPanier");
        let tableauHeaderLigne = create("div", "class", "tableauHeaderLigne");
        let tableauHeaderImage = document.createElement("div");
        let tableauHeaderNom = document.createElement("div");
        let tableauHeaderColor = document.createElement("div");
        let tableauHeaderQuantité = document.createElement("div");
        let tableauHeaderPrix = document.createElement("div");
        let tableauHeaderAction = document.createElement("div");
        let tableauFooterLigne = create("div", "class", "tableauFooterLigne");
        let tableauFooterPrixTotal = create("div", "class", "tableauFooterPrixTotal");



        /*Hiérarchisation des élements crées*/
        tableauSection.appendChild(tableauPanier);
        tableauPanier.appendChild(tableauHeaderLigne);
        tableauHeaderLigne.appendChild(tableauHeaderImage);
        tableauHeaderLigne.appendChild(tableauHeaderNom);
        tableauHeaderLigne.appendChild(tableauHeaderColor);
        tableauHeaderLigne.appendChild(tableauHeaderQuantité);
        tableauHeaderLigne.appendChild(tableauHeaderPrix);
        tableauHeaderLigne.appendChild(tableauHeaderAction);

        /*Attribution des données aux élements créees*/
        tableauHeaderImage.textContent = "Article";
        tableauHeaderNom.textContent = "Produit";
        tableauHeaderColor.textContent = "Couleur";
        tableauHeaderQuantité.textContent = "Quantité";
        tableauHeaderPrix.textContent = "Prix";
        tableauHeaderAction.textContent = "Action";


        /*Création d'une ligne dans le tableau pour chaque produit composant le panier*/
        JSON.parse(localStorage.getItem("monPanier")).forEach((article, index) => {
            let articleLigne = create("div", "id", "articleLigne");
            let articleImage = create("img", "id", "articleImage");
            let articleNom = create("div", "id", "articleNom");
            let articleColor = create("div", "id", "articleColor");
            let articlePrix = create("div", "id", "articlePrix");

            let quantity = create("input", "id", "quantity");
            quantity.setAttribute("type", "number");
            quantity.setAttribute("min", "1");
            quantity.setAttribute("value", article.quantity);


            let articleAction = create("i", "id", index);
            /*Attributs suplémentaires*/
            articleImage.setAttribute("src", article.imageUrl);
            articleAction.setAttribute("alt", "Retirer l'article du panier.");
            articleAction.setAttribute("class", "fas fa-trash-alt"); //Logo poubelle pour supprimer l'article du panier.

            /*Suppression de l'article en cliquant sur la poubelle*/
            articleAction.addEventListener("click", function (event) {
                suppressionArticle(event.target.id);
            });

            /*Hiérarchisation des élements crées*/
            tableauPanier.appendChild(articleLigne);
            articleLigne.appendChild(articleImage);
            articleLigne.appendChild(articleNom);
            articleLigne.appendChild(articleColor);
            articleLigne.appendChild(quantity);
            articleLigne.appendChild(articlePrix);
            articleLigne.appendChild(articleAction);

            /*Attribution des données aux élements créees*/
            articleNom.textContent = article.name;
            articleColor.textContent = article.colors;
            articlePrix.textContent = article.price / 100 + " ,00" + "€";
        });


        /*Création de la ligne du bas du tableau affichant le prix total de la commande*/
        tableauPanier.appendChild(tableauFooterLigne);
        tableauFooterLigne.appendChild(tableauFooterPrixTotal);

        JSON.parse(localStorage.getItem("monPanier")).forEach(priceArticle => {
            total += priceArticle.price / 100;
        });

        tableauFooterPrixTotal.textContent = "Prix total: " + total + ",00" + " €";
    }
}
affichagePanier();



/*FORMULAIRE*/

//Création de l'objet à envoyer, regroupant le formulaire et les articles
const commandeUser = {
    contact: {},
    products: [],
}

document.getElementById("formulaire").addEventListener("submit", function (envoi) {
    envoi.preventDefault();//

    //Avant d'envoyer un formulaire, vérification que le panier n'est pas vide.
    if (panier.length == 0) {
        alert("Attention, votre panier est vide.");
    }
    else {
        //Récupération des champs 
        let nomForm = document.getElementById("lastName").value;
        let prenomForm = document.getElementById("firstName").value;
        let emailForm = document.getElementById("email").value;
        let adresseForm = document.getElementById("address").value;
        let villeForm = document.getElementById("city").value;
        let codePostalForm = document.getElementById("Codepostal").value;

        //Création de l'objet formulaireObjet
        commandeUser.contact = {
            firstName: prenomForm,
            lastName: nomForm,
            address: adresseForm,
            city: villeForm,
            email: emailForm,
        }

        //Création du tableau des articles
        panier.forEach(articlePanier =>
            commandeUser.products.push(articlePanier._id)
        )

        //Envoi des données récupérées
        const optionsFetch = {
            headers: {
                'Content-Type': 'application/json',
            },
            method: "POST",
            body: JSON.stringify(commandeUser),
        }

        fetch(urlOrder, optionsFetch).then(function (response) {
            response.json().then(function (text) {
                console.log(text.orderId);
                window.location = `./confirmation.html?id=${text.orderId}&name=${prenomForm}&prix=${total}`
            });
        });
        localStorage.clear()
    }
})

<div class="divColors"><label for="couleur">Choisissez la couleur de votre Teddy:</label>
                    <select name="couleur" id="selectedColor">${color}</select></div>
                    <div class="divQuantity"><label  for="QuantiteProduit">Quantité</label>
                   <input id="inputQuantite" type="number" min="1" value="1"/></div>

let color = "";
data.colors.forEach(couleur => {
    color += `<option value="${couleur}">${couleur}</option>`;
});
