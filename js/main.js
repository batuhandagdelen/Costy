//*İmports

import {
  renderProduct,
  uiElements,
  renderCartİtems,
  renderNotFound,
  renderCartQuantity,
  renderCartTotal,
} from "./ui.js";
import fetchProducts from "./api.js";
import { addToCart } from "./cart.js";
import { getFromLocale } from "./helpers.js";

//*sayfa yüklendiğinde bunları yap
document.addEventListener("DOMContentLoaded", async () => {
  //menu-btn e tıklanınca nav bölümünün açılması
  uiElements.menuBtn.addEventListener("click", () => {
    uiElements.nav.classList.toggle("open");
  });

  let cart = getFromLocale("cart");

  //header daki sepet ikonunda miktarı yaz

  renderCartQuantity(cart);

  //*eğer anasayfadaysan bu işleri yap

  if (window.location.pathname.includes("/index.html")) {
    //apiden verileri al

    const products = await fetchProducts();

    // apiden alınan dizinin herbir elemanını render et

    renderProduct(products, (e) => {
      addToCart(e, products);
    });
  } else {
    // sepet dolu ise

    if (cart.length > 0) {
      renderCartİtems(cart);

      renderCartTotal(cart);
    }
    //sepet boş ise
    else {
      renderNotFound();
    }
  }
});
