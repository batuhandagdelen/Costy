import { saveToLocale, getFromLocale, calculateTotalPrice } from "./helpers.js";
import {
  renderCartİtems,
  renderNotFound,
  renderCartQuantity,
  renderCartTotal,
} from "./ui.js";

//localestorageden sepete eklenen ürünleri al

let cart = getFromLocale("cart");

//!Sepete ürün ekleyecek fonksiyon

const addToCart = (e, products) => {
  //  İlk olarak sepete eklemek istediğimiz ürünü tespit etsin sonrasında bu ürünün sepette olup olmadığını kontrol etsin.Eğer ürün sepette varsa o ürünün miktarını bir arttırsın eğer ürün sepete ilk defa eklenecekse ürünü sepete eklesin.Sepete eklenen ürünler sayfa yenilendiğinde kapbolmasın diye localStorage'da eklenen ürünleri tutsun.

  //  hangi elemana tıklandığını bul  ve bu elemana eklenen id değerine eriş

  const productId = +e.target.dataset.id;

  // id si bilinen elemanı bul

  const foundedProduct = products.find((product) => product.id === productId);

  const exitingProduct = cart.find((item) => item.id === productId);
  // eğer sepette bu ürün varsa miktarını bir arttır
  if (exitingProduct) {
    exitingProduct.quantity++;
  }

  //eğer yoksa eklenecek ürün için bir obje oluştur.
  else {
    const cartItem = {
      ...foundedProduct,
      quantity: 1,
    };

    //oluşturulan ürünü cart objesine ekle
    cart.push(cartItem);
  }

  //sepet dizisini local storageye ekle
  saveToLocale("cart", cart);

  //sepete ekle butonuna tıklanınca içeriğini "added "a çevir

  e.target.textContent = "Added";

  setTimeout(() => {
    e.target.textContent = "Add to Cart";
  }, 2000);

  //header içindeki ürün sayısını gösteren ikonu güncelle
  renderCartQuantity(cart);
};

//!sepetten eleman kaldıracak fonksiyon

const removeFromCart = (e) => {
  // silmeyi onaylıyormusunuz?
  const response = confirm("Do you confirm to delete this product?");

  if (response) {
    // silinecek ürünün id sini bul
    const productId = +e.target.dataset.id;
    // silinecek ürün hariç diğer ürünleri filter ile bul
    cart = cart.filter((item) => item.id !== productId);

    // local storage yi güncelle
    saveToLocale("cart", cart);

    //sepetteki ürünlerin toplam fiyatını renderla

    renderCartTotal(cart);

    // güncellenen local storage sonucunda sepette ürün kaldıysa renderla kalmadıysa render not found renderla
    if (cart.length > 0) {
      // güncellenen local storage yi renderla
      renderCartİtems(cart);
    } else {
      renderNotFound();
    }
  }

  //header içindeki ürün sayısını gösteren ikonu güncelle
  renderCartQuantity(cart);
};

//!sepetteki ürün miktarını güncelleyecek fonksiyon

const onQuantityChange = (e) => {
  //güncellenecek elemanının id si
  const productId = +e.target.dataset.id;

  // güncellenecen elemanın güncel değeri

  const newOuantity = +e.target.value;

  // eğer güncellenen elemanın değeri o dan büyükse değeri güncelle değilse alert ver

  if (newOuantity > 0) {
    // id si bilinen elemanı cart dizisi içinde bul

    const updateItem = cart.find((item) => item.id === productId);

    // bulunan elemanın quantity değerini güncelle

    updateItem.quantity = newOuantity;

    // localstorage i güncelle

    saveToLocale("cart", cart);

    //sepetteki ürünlerin toplam fiyatını renderla

    renderCartTotal(cart);

    //header içindeki ürün sayısını gösteren ikonu güncelle
    renderCartQuantity(cart);
  } else {
    //alert ver
    alert("Please enter a value grater than 0");

    //fonksiyonu durdur
    return;
  }
};

export { addToCart, removeFromCart, onQuantityChange };
