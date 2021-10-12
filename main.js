var listOfProducts;

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



const initSite = () => {

    loadProducts()

    
    
    // This would also be a good place to initialize other parts of the UI
}



/** Uses the loaded products data to create a visible product list on the website */
function addProductsToWebpage() {
    
    let mainSection = document.getElementsByTagName("main")[0]
    
    const loadProducts = document.createElement("div")
    loadProducts.classList.add("iphoneX")
    
    let textTitle = document.createElement("h1")
    textTitle.classList.add("cardTitle")
    mainSection.appendChild(loadProducts)
    loadProducts.appendChild(textTitle)
    
    listOfProducts.forEach((product) => {
        
       
        
    });

    

   
   
    // Check your console to see that the products are stored in the listOfProducts varible.
    console.log(listOfProducts);

    // Add your code here, remember to brake your code in to smaller function blocks
    // to reduce complexity and increase readability. Each function should have
    // an explainetory comment like the one for this function, see row 22.
    
    // TODO: Remove the console.log and these comments when you've read them.
}


window.addEventListener("load", initSite)