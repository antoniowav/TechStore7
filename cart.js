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
        quantityBox.classList.add('quantityContainer')
        quantityBox.append(quantityContainer)
        const totalPriceBox = document.createElement('div')
        totalPriceBox.classList.add('priceContainer')
        const totalPriceContainer = document.createElement('div')
        totalPriceContainer.classList.add('.price')
        totalPriceBox.append(totalPriceContainer)
        const img = document.createElement('div')
        img.classList.add('imgContainer')

        // Skapar "slutför köp" knappen

        const checkoutBtnFlex = document.createElement('div')
        checkoutBtnFlex.classList.add('checkoutBtnFlex')
        const checkOutBtnContainer = document.createElement('div');
        checkOutBtnContainer.classList.add('checkOutBtnContainer');
        const checkOutBtnText = document.createElement('span');
        checkOutBtnText.innerText = ('Slutför ditt köp');
        const checkoutBtnIcon = document.createElement('i');
        checkoutBtnIcon.classList.add('fas', 'fa-check');

        checkOutBtnContainer.append(checkoutBtnIcon, checkOutBtnText);
        checkoutBtnFlex.append(checkOutBtnContainer);
       

        
        
        
        
        let products = localStorage.getItem('productsInCart')

        // skapar cart-symbol
        let cartIcon = document.createElement('i');
        cartIcon.classList.add('fas', 'fa-shopping-cart');
        
        // Skapar Kundvagn-rubrik texten
        let cartHeaderContainer = document.createElement('div');
        cartHeaderContainer.classList.add('cartHeaderContainer')
        let cartHeader = document.createElement('h1');
        cartHeader.innerText=('Kundvagn');

        cartHeaderContainer.append(cartIcon, cartHeader);
        mainContainer.append(cartHeaderContainer);


        
        // Detta if-statement körs bara om kundvagen är TOM!
        if (products == null){
            let basketEmpty = document.createElement('h3');
            basketEmpty.innerText=('Kundvagnen är tom!')

            let basketEmptyContainer = document.createElement('div');
            basketEmptyContainer.classList.add('message')

            basketEmptyContainer.append(basketEmpty);
            mainContainer.append(basketEmptyContainer); 

       } else {

        quantityBox.append(`Antal: ${cartNumbers}`)
        totalPriceBox.append(`Totalt pris: ${totalCost} kr`)
        mainContainer.append(cartSection, totalPriceBox, quantityBox, checkoutBtnFlex);
       
        products = JSON.parse(products)
        for (var i = 0; i < products.length; i++){
            const productCard = document.createElement('div');
            const title = document.createElement('h1')
            const imgDisp = document.createElement('img')
            const imgContainer = document.createElement('div');
            imgDisp.setAttribute("src", `${imgUrl}/${products[i].image}`)
            imgDisp.setAttribute("alt", `${products[i].title}` )
            const productPrice = document.createElement('h6')
            const productQuantity = document.createElement('h5')


            productPrice.classList.add('productPrice')
            productQuantity.classList.add('productQuantity')
            productCard.classList.add('productCard')
            imgContainer.classList.add('imgContainer')
            

            
            productPrice.append(products[i].price + ' kr')
            productQuantity.append('Antal: '+ products[i].quantity)
            title.append(products[i].title)
            cartSection.appendChild(productCard);
            imgContainer.append(imgDisp);
            productCard.append( imgContainer, title, productPrice , productQuantity )

        
        
        }

    }

       

        
       
    }

    createCartSection();
    onLoadCartNumbers();
    // createProductCard();
}
