var listOfProducts;
const imgUrl = "/assets/";
let cartArray = [];
/** Get products from the json file and store it in a gobal variable */
function loadProducts() {
  fetch("./products.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (products) {
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
  let mainContainer = document.getElementById("mainContainer");

  listOfProducts.forEach((product) => {
    let productCard = createProductCard(product);
    mainContainer.append(productCard);
  });

  let basket = document.querySelectorAll(".btnContainer");

  /*   listOfProducts.push('inCart', 0); */

  for (let i = 0; i < basket.length; i++) {
    basket[i].addEventListener("click", () => {
      cartNumbers(listOfProducts[i]);
      totalCost(listOfProducts[i]);
    });
  }

  // Add to cart function

  function onLoadCartNumbers() {
    let productNumber = localStorage.getItem("cartNumbers");

    if (productNumber) {
      document.querySelector(".itemsNumber, span").textContent = productNumber;
    }
  }

  // LoclaStorage quantity logic
  function cartNumbers(product) {
    let productNumber = localStorage.getItem("cartNumbers");
    productNumber = parseInt(productNumber);

    if (productNumber) {
      localStorage.setItem("cartNumbers", productNumber + 1);
      document.querySelector(".itemsNumber, span").textContent =
        productNumber + 1;
    } else {
      localStorage.setItem("cartNumbers", 1);
      document.querySelector(".itemsNumber, span").textContent = 1;
    }
    itemsInLocal(product);
  }

  onLoadCartNumbers();
}

// shows items in cart
function itemsInLocal(product) {
  let getCartArray = localStorage.getItem("productsInCart");
  getCartArray = JSON.parse(getCartArray);

  if (!getCartArray) {
    cartArray.push(product);
  } else {
    cartArray = getCartArray;
  }

  if (cartArray.some((item) => item.title === product.title)) {
    cartArray.map((item) => {
      if (item.title === product.title) {
        !item.quantity ? (item.quantity = 1) : (item.quantity += 1);
      }
    });
  } else {
    cartArray.push(product);
    cartArray.map((item) => {
      if (item.title === product.title) {
        !item.quantity ? (item.quantity = 1) : (item.quantity += 1);
      }
    });
  }

  localStorage.setItem("productsInCart", JSON.stringify(cartArray));
}

// shows Total cost in Localstorage
function totalCost(product) {
  let basketCost = localStorage.getItem("totalCost");
  if (basketCost != null) {
    basketCost = parseInt(basketCost);
    localStorage.setItem("totalCost", basketCost + product.price);
  } else {
    localStorage.setItem("totalCost", product.price);
  }
}

// Creates elements in index.html
function createProductCard(product) {
  // create div-container for each phone
  let productContainer = document.createElement("div");
  productContainer.classList.add("productContainer");

  //create img-container and IMG-tag
  let imgContainer = document.createElement("div");
  imgContainer.classList.add("imgContainer");
  let productImg = document.createElement("img");
  productImg.src = imgUrl + product.image;
  imgContainer.appendChild(productImg);

  // create div-text descripton for each phone
  let textContainer = document.createElement("div");
  textContainer.classList.add("textContainer");

  let productHeader = document.createElement("H1");
  let productText = document.createElement("p");

  productHeader.innerText = product.title;
  productText.innerText = product.description;

  //create price div and p-tag
  let priceContainer = document.createElement("div");
  priceContainer.classList.add("priceContainer");
  priceText = document.createElement("p");
  priceContainer.appendChild(priceText);
  priceText.innerText = product.price + " kr";

  // create button div and tag
  let btnContainer = document.createElement("div");
  let cartIconContainer = document.createElement("div");
  cartIconContainer.classList.add("cartIconContainer");
  let addToCartBtn = document.createElement("div");
  addToCartBtn.classList.add("cartBtn");
  let btnText = document.createTextNode("Lägg till i kundvagnen");
  btnContainer.classList.add("btnContainer");

  let cartIcon = document.createElement("i");
  cartIcon.classList.add("fas", "fa-cart-arrow-down");

  // adding event listener to button

  btnContainer.append(cartIconContainer);
  addToCartBtn.append(btnText);
  btnContainer.appendChild(addToCartBtn);
  cartIconContainer.appendChild(cartIcon);

  // Appending everything ---->
  productContainer.append(
    textContainer,
    imgContainer,
    priceContainer,
    btnContainer
  );
  textContainer.append(productHeader, productText);

  return productContainer;
}
