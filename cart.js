const imgUrl = '/assets/';
function initSite() {
    addProductsToWebpage();
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
    // skapar elements till cart.html
    function createCartSection(){
        const totalCost = localStorage.getItem('totalCost')
        const cartNumbers = localStorage.getItem('cartNumbers')
        
        
        const quantityContainer = document.createElement('div')
        quantityContainer.classList.add('quantity')
        const cartSection = document.createElement('div');
        cartSection.classList.add('cartContainer')
        const quantityBox = document.createElement('div')
        quantityBox.classList.add('quantityContaier')
        quantityBox.append(quantityContainer)
        const totalPriceBox = document.createElement('div')
        totalPriceBox.classList.add('priceContainer')
        const totalPriceContainer = document.createElement('div')
        totalPriceContainer.classList.add('.price')
        totalPriceBox.append(totalPriceContainer)
        const img = document.createElement('div')
        img.classList.add('imgContainer')
       

        
        quantityBox.append(`Antal: ${cartNumbers}`)
        totalPriceBox.append(`Totalt pris: ${totalCost}`)
        mainContainer.append(cartSection, totalPriceBox, quantityBox);
        
        
        let products = localStorage.getItem('productsInCart')
       
        products = JSON.parse(products)
        for (var i = 0; i < products.length; i++){
            const productCard = document.createElement('div');
            const title = document.createElement('h3')
            const imgDisp = document.createElement('img')
            imgDisp.setAttribute("src", `${imgUrl}/${products[i].image}`)
            imgDisp.setAttribute("alt", `${products[i].title}` )
            const productPrice = document.createElement('span')
            const productQuantity = document.createElement('span')


            productPrice.classList.add('productPrice')
            productQuantity.classList.add('productQuantity')
            productCard.classList.add('productCard')
            imgDisp.classList.add('imgContainer')
            

            
            productPrice.append(products[i].price + ' kr')
            productQuantity.append('antal: '+ products[i].quantity)
            title.append(products[i].title)
            cartSection.appendChild(productCard);
            productCard.append( imgDisp, title, productPrice , productQuantity )
        }

        
       
    }

    createCartSection();
    onLoadCartNumbers();
    // createProductCard();
}
