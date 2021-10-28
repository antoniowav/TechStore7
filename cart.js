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
    
    function createCartSection(){
        let cartSection = document.createElement('div');
        cartSection.classList.add('cartSection');
        mainContainer.append(cartSection);
        // let productCard = localStorage.getItem('productsQuantity');
        // productCard = JSON.parse(productCard);
        productCard = document.createElement('div');
        productCard.classList.add('productCard');
        cartSection.append(productCard);
        for (var i = 0; i < localStorage.length; i++){
            productCard.append(localStorage.getItem(localStorage.key(i)));
            
        }
    }
    
    createCartSection();
    onLoadCartNumbers();
    // createProductCard();
}

