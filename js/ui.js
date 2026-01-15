import { removeFromCart, onQuantityChange } from "./cart.js";
import { calculateTotalQuantity, calculateTotalPrice } from "./helpers.js";
//* Ui elemanlarını bir arada tutan obje

const uiElements = {
  menuBtn: document.querySelector("#menu-btn"),
  nav: document.querySelector("nav"),
  productList: document.querySelector("#products-list"),
  cartItems: document.querySelector(".cart-items"),
  cartQuantity: document.querySelector("#basket-btn"),
  totalAmount: document.querySelector(".cart-total"),
};

console.log(uiElements.totalAmount);

// ! Apiden alınan ürünleri render edecek fonksiyon

const renderProduct = (a, callBackFunction) => {
  const productsHtml = a
    .map(
      (b) =>
        `     <div class="product">
          
          <img
            src=${b.image}
            alt="product-image"
          />
       
          <div class="product-info">
            <h2>${b.title}</h2>
            <p>$${b.price.toFixed(2)}</p>
            <button class="add-to-cart" data-id="${b.id}" >Add to Cart</button>
          </div>
        </div>`
    )
    .join("");

  // oluşan productshtml i html içindeki product-list içine at

  uiElements.productList.innerHTML = productsHtml;

  //sepete ekle butonuna eriş

  const addToCartButtons = document.querySelectorAll(".add-to-cart");

  // erişelen butona tıklanınca olanları yaz

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", callBackFunction);
  });
};

//*sepetteki ürünleri renderlayan fonksiyon

const renderCartİtems = (cart) => {
  const cartItemsHtml = cart
    .map(
      (item) => `  <div class="cart-item">
            <img
              src="${item.image}"
            />
            <div class="cart-item-info">
              <h2 class="cart-item-title">${item.title}</h2>
              <input
                type="number"
                min="1"
                value="${item.quantity}"
                class="cart-item-quantity"
                data-id="${item.id}"
              />
            </div>
           
            <h3 class="cart-item-price">$${item.price.toFixed(2)}</h3>
            <button class="remove-button"  data-id="${item.id}">Remove</button>
          </div>`
    )
    .join("");

  // oluşturulan kartları arayüze  ekle
  uiElements.cartItems.innerHTML = cartItemsHtml;

  // remove-buttonlara eriş

  const removeButtons = document.querySelectorAll(".remove-button");

  removeButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      removeFromCart(e);
    });
  });

  // cart-item-quantity classlı inputlara elemanına eriş

  const quantityInputs = document.querySelectorAll(".cart-item-quantity");

  // quantityInputs içerisindeki herbir inputa eriş ve değişimini izle

  quantityInputs.forEach((input) => {
    input.addEventListener("change", (e) => {
      onQuantityChange(e);
    });
  });
};

//* sepette ürün bulunmadığında not found render eden fonksiyon

const renderNotFound = () => {
  uiElements.cartItems.innerHTML = `
<div class="cookieCard">
  <p class="cookieHeading">Products Not Found </p>
  <p class="cookieDescription">By using this website you automatically accept that we use cookies. <a href="#">What for?</a></p>
  <button class="acceptButton">Back To Home Page</button>
</div>
`;
};

//!sepetteki ürün sayısına göre sepet ikonunu güncelleyen fonksiyon
const renderCartQuantity = (cart) => {
  const totalQuantity = calculateTotalQuantity(cart);

  uiElements.cartQuantity.setAttribute("data-quantity", totalQuantity);
};

//!Sepetteki toplam fiyatı render edecek fonksiyon

const renderCartTotal = (cart) => {
  const totalCardAmount = calculateTotalPrice(cart);

  uiElements.totalAmount.innerText = `$ ${totalCardAmount.toFixed(2)}`;
};

export {
  uiElements,
  renderProduct,
  renderCartİtems,
  renderNotFound,
  renderCartQuantity,
  renderCartTotal,
};
