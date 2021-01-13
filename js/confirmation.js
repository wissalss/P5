//Attribution des données aux id respectifs
let confirmation = new URLSearchParams(window.location.search);

let nameConfirmation = document.getElementById("Namecommande");
let prixConfirmation = document.getElementById("Prixcommande");
let idConfirmation = document.getElementById("Idcommande");

nameConfirmation.textContent = confirmation.get('name');
prixConfirmation.textContent = confirmation.get('prix');
idConfirmation.textContent = confirmation.get('id');