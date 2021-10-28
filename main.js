
var listOfProducts;
const imgUrl = '/assets/';

/** Get products from the json file and store it in a gobal variable */
function loadProducts() {
    fetch("./products.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(products) {
        listOfProducts = products;
        addProductsToWebpage();
    });
    
}


function initSite() {
    loadProducts();
    // This would also be a good place to initialize other parts of the UI
}

/** Uses the loaded products data to create a visible product list on the website */

 function addProductsToWebpage() {

    let mainContainer = document.getElementById('mainContainer');

    listOfProducts.forEach((product) => {
        let productCard = createProductCard(product)
        mainContainer.append(productCard)
        
    })

    let basket = document.querySelectorAll('.btnContainer');

    

  /*   listOfProducts.push('inCart', 0); */

    for (let i=0; i < basket.length; i++) {
        basket[i].addEventListener('click', () => {
            cartNumbers(listOfProducts[i]);
            totalCost(listOfProducts[i])
        })

       
    }

   // Add to cart function

    function onLoadCartNumbers() {
        let productNumber = localStorage.getItem('cartNumbers');

        if(productNumber) {
            document.querySelector('.itemsNumber, span').textContent = productNumber;
        }
    }

   function cartNumbers(product) {
       
       let productNumber = localStorage.getItem('cartNumbers');
       productNumber = parseInt(productNumber);

       if(productNumber) {
        
            localStorage.setItem('cartNumbers', productNumber + 1);
            document.querySelector('.itemsNumber, span').textContent = productNumber + 1;
        } else {
            localStorage.setItem('cartNumbers', 1);
            document.querySelector('.itemsNumber, span').textContent = 1;

        }
        setItems(product);
       
    }
    
    
    onLoadCartNumbers();
}
// shows item quantity in localstorage
function setItems(product) {
    let cartItems = localStorage.getItem('productsQuantity');
    cartItems = JSON.parse(cartItems);
    if(cartItems != null) {
        if(cartItems[product.model] == undefined) {
           cartItems = {
                ...cartItems,
                [product.model]: product
           } 
        }
        cartItems[product.model].quantity += 1;
    } else {
        product.quantity = 1;
        cartItems = { 
            [product.model]: product
        }
    }

   localStorage.setItem('productsQuantity', JSON.stringify (cartItems));
}
// shows Total cost in Localstorage
function totalCost(product){
    let basketCost = localStorage.getItem('totalCost');
    if(basketCost != null){
        basketCost = parseInt(basketCost);
        localStorage.setItem('totalCost', basketCost + product.price);
    } else {
        localStorage.setItem("totalCost", product.price);
    }
}
  // add products from localstorage to Cart.html
  function displayCart(){
    let cartItems = localStorage.getItem('productsQuantity');
    cartItems = JSON.parse(cartItems);
    let productCard = document.querySelector('.productCard');
    
    if(cartItems && productCard){
        productCard.innerHTML = '';
        Object.values(cartItems).map(item => {
            productCard.innerHTML += `
            <div class="product">
                 <i class="fas fa-times-circle"></i>
                 <img src="./asstes/${item.image}.png">
                 <span>${item.title}</span>
            `
        });
    }
}
displayCart();



function createProductCard(product) {

    // create div-container for each phone
    let productContainer = document.createElement('div');
    productContainer.classList.add('productContainer');
    

    //create img-container and IMG-tag
    let imgContainer = document.createElement('div');
    imgContainer.classList.add('imgContainer');
    let productImg = document.createElement('img');   
    productImg.src = imgUrl + product.image;
    imgContainer.appendChild (productImg);


    // create div-text descripton for each phone
    let textContainer = document.createElement('div');
    textContainer.classList.add ('textContainer');

    let productHeader = document.createElement('H1')
    let productText = document.createElement('p');
    

    productHeader.innerText = product.title;
    productText.innerText = product.description;



    //create price div and p-tag
    let priceContainer = document.createElement('div');
    priceContainer.classList.add ('priceContainer');
    priceText = document.createElement ('p');
    priceContainer.appendChild (priceText);
    priceText.innerText = product.price + ' kr';

    // create button div and tag
    let btnContainer = document.createElement('div');
    let cartIconContainer = document.createElement('div')
    cartIconContainer.classList.add('cartIconContainer')
    let addToCartBtn = document.createElement('div');
    addToCartBtn.classList.add ('cartBtn')
    let btnText = document.createTextNode ('Lägg till i kundvagnen');
    btnContainer.classList.add ('btnContainer');
    
    let cartIcon = document.createElement('i');
    cartIcon.classList.add('fas', 'fa-cart-arrow-down');


    // adding event listener to button
    
    
    
    
    btnContainer.append (cartIconContainer);
    addToCartBtn.append (btnText);
    btnContainer.appendChild(addToCartBtn);
    cartIconContainer.appendChild (cartIcon);
    
    // Appending everything ---->
    productContainer.append(textContainer, imgContainer, priceContainer, btnContainer);
    textContainer.append (productHeader, productText);

    return productContainer
}





