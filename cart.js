const imgUrl = "/assets/";
function initSite() {
  addProductsToWebpage();
}

/** Uses the loaded products data to create a visible product list on the website */
function addProductsToWebpage() {
  let mainContainer = document.getElementById("mainContainer");
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
    setItems(product);
  }
  // Creates elements to cart.html
  function createCartSection() {
    const totalCost = localStorage.getItem("totalCost");
    const cartNumbers = localStorage.getItem("cartNumbers");
    const cartSection = document.createElement("div");
    cartSection.classList.add("cartContainer");
    const quantityBox = document.createElement("div");
    quantityBox.classList.add("quantityContainer");
    const totalPriceBox = document.createElement("div");
    totalPriceBox.classList.add("priceContainer");
    const img = document.createElement("div");
    img.classList.add("imgContainer");

    // Creates "slutför köp" button

    const checkoutBtnFlex = document.createElement("div");
    checkoutBtnFlex.classList.add("checkoutBtnFlex");
    const checkOutBtnContainer = document.createElement("div");
    checkOutBtnContainer.classList.add("checkOutBtnContainer");
    const checkOutBtnText = document.createElement("span");
    checkOutBtnText.innerText = "Slutför ditt köp";
    const checkoutBtnIcon = document.createElement("i");
    checkoutBtnIcon.classList.add("fas", "fa-check");

    checkOutBtnContainer.append(checkoutBtnIcon, checkOutBtnText);
    checkoutBtnFlex.append(checkOutBtnContainer);

    checkOutBtnContainer.addEventListener("click", PurchaseMessage);

    // Creates a popup after confirm purchase
    function PurchaseMessage() {
      let confirmBuyContainer = document.createElement("div");
      confirmBuyContainer.classList.add("confirmBuyContainer");

      let confirmBuyContent = document.createElement("div");
      confirmBuyContent.classList.add("confirmBuyContent");

      let checkIcon = document.createElement("i");
      checkIcon.classList.add("fas", "fa-check-circle");

      let confirmBuyMessage = document.createElement("h1");
      confirmBuyMessage.innerText = "Tack för ditt köp!";

      let goBackHomeBtnContainer = document.createElement("div");
      goBackHomeBtnContainer.innerText = "Fortsätt handla";
      goBackHomeBtnContainer.classList.add("goBackHomeBtnContainer");

      let goBackHomeBtnLink = document.createElement("a");
      goBackHomeBtnLink.href = "index.html";

      goBackHomeBtnLink.append(goBackHomeBtnContainer);

      confirmBuyContent.append(checkIcon, confirmBuyMessage, goBackHomeBtnLink);

      checkOutBtnContainer.removeEventListener("click", PurchaseMessage);
      localStorage.clear();

      confirmBuyContainer.append(confirmBuyContent);
      mainContainer.append(confirmBuyContainer);
    }

    let products = localStorage.getItem("productsInCart");

    // Creates cart-symbol
    let cartIcon = document.createElement("i");
    cartIcon.classList.add("fas", "fa-shopping-cart");

    // Creates Kundvagn-rubrik texten
    let cartHeaderContainer = document.createElement("div");
    cartHeaderContainer.classList.add("cartHeaderContainer");
    let cartHeader = document.createElement("h1");
    cartHeader.classList.add("cartTitle");
    cartHeader.innerText = "Kundvagn";

    cartHeaderContainer.append(cartIcon, cartHeader);
    mainContainer.append(cartHeaderContainer);

    // This IF statemen only runs if cart is Empty!
    if (products == null) {
      let basketEmpty = document.createElement("h3");
      basketEmpty.innerText = "Kundvagnen är tom!";

      let basketEmptyContainer = document.createElement("div");
      basketEmptyContainer.classList.add("message");

      basketEmptyContainer.append(basketEmpty);
      mainContainer.append(basketEmptyContainer);
    } else {
      quantityBox.append(`Antal: ${cartNumbers}`);
      totalPriceBox.append(`Totalt pris: ${totalCost} kr`);
      mainContainer.append(
        cartSection,
        totalPriceBox,
        quantityBox,
        checkoutBtnFlex
      );

      products = JSON.parse(products);

      // Rendering productcards to the cart.html
      for (var i = 0; i < products.length; i++) {
        const productCard = document.createElement("div");
        const title = document.createElement("h1");
        const imgDisp = document.createElement("img");
        const imgContainer = document.createElement("div");
        imgDisp.setAttribute("src", `${imgUrl}/${products[i].image}`);
        imgDisp.setAttribute("alt", `${products[i].title}`);
        const productPrice = document.createElement("h6");
        const productQuantity = document.createElement("h5");

        // Creates the element for the "remove item button"
        const deleteProductBtn = document.createElement("div");
        deleteProductBtn.classList.add("deleteProductBtn");
        const deleteProductBtnText = document.createElement("span");
        deleteProductBtnText.innerText = "Ta bort";
        const deleteProductBtnIcon = document.createElement("i");
        deleteProductBtnIcon.classList.add("far", "fa-trash-alt");

        deleteProductBtn.append(deleteProductBtnIcon, deleteProductBtnText);

        productPrice.classList.add("productPrice");
        productQuantity.classList.add("productQuantity");
        productCard.classList.add("productCard");
        imgContainer.classList.add("imgContainer");

        productPrice.append(products[i].price + " kr");
        productQuantity.append("Antal: " + products[i].quantity);
        title.append(products[i].title);
        cartSection.appendChild(productCard);
        imgContainer.append(imgDisp);
        productCard.append(
          imgContainer,
          title,
          productPrice,
          productQuantity,
          deleteProductBtn
        );
      }
    }
  }

  createCartSection();
  onLoadCartNumbers();

  //  delete button logic
  let deleteButton = document.querySelectorAll(".deleteProductBtn");

  for (let i = 0; i < deleteButton.length; i++) {
    let data = JSON.parse(localStorage.getItem("productsInCart"));

    deleteButton[i].addEventListener("click", () => {
      removeItems(i, data[i]);
    });
  }

  function removeItems(index, product) {
    let data = localStorage.getItem("productsInCart");
    let cartQuantity = localStorage.getItem("cartNumbers");
    let totalPrice = localStorage.getItem("totalCost");
    data = JSON.parse(data);
    if (product.quantity === 1) {
      data.splice(index, 1);
    } else {
      data[index].quantity -= 1;
    }
    localStorage.removeItem("productsInCart");
    localStorage.setItem("productsInCart", JSON.stringify(data));
    localStorage.setItem("cartNumbers", cartQuantity - 1);
    localStorage.setItem("totalCost", totalPrice - product.price);
    hideBtn();
    location.reload();
  }

  function hideBtn() {
    let quantityLeft = localStorage.getItem("cartNumbers");
    quantityLeft = JSON.parse(quantityLeft);
    if (quantityLeft === 0) {
      localStorage.clear();
    }
  }
}
