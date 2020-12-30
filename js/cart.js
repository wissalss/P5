let cartsAjout = document.querySelectorAll('.carts');

// let product = [
//     {
//         name: 'hoddy',
//         price: 35,
//         tag: "blue",
//         inCart: 0
//     }]

//Déclaration des variables stockées dans localStorage

let orderId = "";
let orderName = "";
let chosenColor = "";
let inCart = 0;
// let product = example, dans le projet c'est teddy et ses var 

for (let i = 0; i < cartsAjout.length; i++) {
    cartsAjout[i].addEventListener('click', () => {
        cartNumbers(product[i]);
        totalCost(product[i]);
    })
}
function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if (productNumbers) {
        document.querySelector('.cartcount span').textContent = productNumbers;
    }
}
function cartNumbers(product) {

    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);
    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cartcount span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cartcount span').textContent = 1;
    }
    setItems(product);
}
function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {
        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}
// pour le price des produits 
function totalCost(product) {
    // console.log("the product price is", product.price);
    let cartCost = localStorage.getItem("totalCost");
    console.log("my cartCost is", cartCost);

    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);

    } else {
        localStorage.setItem("totalCost", product.price);
    }

}

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);

    console.log(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem("totalCost");

    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += ` <div class="product"> 
            <ion-icon name="close-circle-outline"></ion-icon>
            <img src="${product.imageUrl} ${product.tag}">
            </div>
            <div class="price"> €${product.price}.00</div>
            <div class="quantity"> 
            <ion-icon name="arrow-back-circle-outline"></ion-icon>
            <span>${item.inCart}</span>
            <ion-icon name="arrow-forward-circle-outline"></ion-icon>
            </div>
            <div class="total"> €${item.inCart * product.price}.00
            </div>
            `
        });
        productContainer.innerHTML += ` 
            <div class="panierTotalContainer">
            <h3 class="panierTotalTitle"> Total Panier </h3>
            <h3 class="panierTotal"> €${cartCost}.00 </h3>
            </div>
            `;
    }
}
onLoadCartNumbers();
displayCart();

// const teddySchema = mongoose.Schema({
//     name: { type: String, required: true },
//     price: { type: Number, required: true },
//     description: { type: String, required: true },
//     colors: { type: [String], required: true },
//     imageUrl: { type: String, required: true }
//   });