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
    // Check your console to see that the products are stored in the listOfProducts varible.
    listOfProducts.forEach (function (product) {
        
        //declare the maincontainer for all the content on page
        let mainContainer = document.getElementById('mainContainer');
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
        btnContainer.classList.add ('btnContainer');
        let addToCartBtn = document.createElement('a');
        btnContainer.appendChild(addToCartBtn);
        addToCartBtn.innerText = ('Lägg till i kundvagn');
        

        // Appending everything ---->
        mainContainer.appendChild(productContainer);
        productContainer.append(textContainer, imgContainer, priceContainer, btnContainer );
        textContainer.append (productHeader, productText);

    })

    // Add your code here, remember to brake your code in to smaller function blocks
    // to reduce complexity and increase readability. Each function should have
    // an explainetory comment like the one for this function, see row 22.
    
    // TODO: Remove the console.log and these comments when you've read them.
}