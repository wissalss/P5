const urlOrder = "http://localhost:3000/api/teddies/order";

/*fonction création éléments, attribution*/
function create(type, Qualified, nomType) {
    let nomVariable = document.createElement(type);
    nomVariable.setAttribute(Qualified, nomType);
    return nomVariable;
}

/*Création du panier utilisateur si besoin*/
if (localStorage.getItem("monPanier")) {
    console.log("Panier OK");
} else {
    console.log("Création du panier");
    let init = [];
    localStorage.setItem("monPanier", (JSON.stringify(init)));
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
    console.log("suppression article i :", i);
    panier.splice(i, 1); //suppression de l'element i du tableau;  
    localStorage.clear(); //on vide le storage avant de le mettre à jour;
    localStorage.setItem("monPanier", JSON.stringify(panier)); //maj du panier sans l'élément i;
    window.location.reload();
}

let total = 0; //On stock le prix total dans cette variable afin de l'afficher dans le tableau et dans l'URL

/*Affichage du panier utilisateur dans la page "panier"*/
function affichagePanier() {
    if (panier.length > 0) {
        document.getElementById("panierVide").remove();

       

        /*Nous allons présenter le panier à l'utilisateut sous forme de tableau que nous plaçons dans la section "Sectionpanier"*/
        let tableauSection = document.getElementById("Sectionpanier");

        //Création du tableau
        let tableauPanier = create("div", "class", "tableauPanier");
        let tableauHeaderLigne = create("div", "class", "tableauHeaderLigne");
        let tableauHeaderImage = document.createElement("div");
        let tableauHeaderNom = document.createElement("div");
        let tableauHeaderPrix = document.createElement("div");
        let tableauHeaderAction = document.createElement("div");
        let tableauFooterLigne = create("div", "class", "tableauFooterLigne");
        let tableauFooterPrixTotal = create("div", "class", "tableauFooterPrixTotal");



        /*Hiérarchisation des élements crées*/
        tableauSection.appendChild(tableauPanier);
        tableauPanier.appendChild(tableauHeaderLigne);
        tableauHeaderLigne.appendChild(tableauHeaderImage);
        tableauHeaderLigne.appendChild(tableauHeaderNom);
        tableauHeaderLigne.appendChild(tableauHeaderPrix);
        tableauHeaderLigne.appendChild(tableauHeaderAction);

        /*Attribution des données aux élements créees*/
        tableauHeaderImage.textContent = "Article";
        tableauHeaderNom.textContent = "Produit";
        tableauHeaderPrix.textContent = "Prix";
        tableauHeaderAction.textContent = "Action";

        /*Création d'une ligne dans le tableau pour chaque produit composant le panier*/
        JSON.parse(localStorage.getItem("monPanier")).forEach((article, index) => {
            let articleLigne = create("div", "id", "articleLigne");
            let articleImage = create("img", "id", "articleImage");
            let articleNom = create("div", "id", "articleNom");
            let articlePrix = create("div", "id", "articlePrix");
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
            articleLigne.appendChild(articlePrix);
            articleLigne.appendChild(articleAction);

            /*Attribution des données aux élements créees*/
            articleNom.textContent = article.name;
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
