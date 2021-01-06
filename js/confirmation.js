//Attribution des données aux id respectifs
let Confirmation = new URLSearchParams(window.location.search);

let nameConfirmation = document.getElementById("Namecommande");
let prixConfirmation = document.getElementById("Prixcommande");
let idConfirmation = document.getElementById("Idcommande");

nameConfirmation.textContent = Confirmation.get('name');
prixConfirmation.textContent = Confirmation.get('prix');
idConfirmation.textContent = Confirmation.get('id');