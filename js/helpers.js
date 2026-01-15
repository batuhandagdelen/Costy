//!LocaleStorage a kayıt yapacak fonksiyon

const saveToLocale = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

//!LocaleStorage dan kayıtlı verileri alacak  fonksiyon

const getFromLocale = (key) => {
  return JSON.parse(localStorage.getItem(key)) || [];
};

//!Sepetteki toplam ürün miktarını hesaplayan fonksiyon

const calculateTotalQuantity = (cart) => {
  // ürünlerin toplamını hesapla
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  return totalQuantity;
};

//!Sepetteki ürünlerin toplam fiyatını hesaplayan fonksiyon

const calculateTotalPrice = (cart) => {
  //sepetteki toplam fiyatı bul
  const cartItemsAmount = cart.reduce(
    (total, product) => total + product.quantity * product.price,
    0
  );

  let totalAmount;

  // eğer toplam 500 dolardan aşağıdaysa 100 dolar kargo ücreti ekle
  if (cartItemsAmount <= 500) {
    totalAmount = cartItemsAmount + 100;
  } else {
    totalAmount = cartItemsAmount;
  }

  return totalAmount;
};

export {
  saveToLocale,
  getFromLocale,
  calculateTotalQuantity,
  calculateTotalPrice,
};
