//*Apiden ürün verilerini alacak fonksiyon

const fetchProducts = async () => {
  try {
    const response = await fetch("../db.json");

    const data = await response.json();

    return data.products;
  } catch (error) {
    alert("An error occurred while retrieving products from the API!!");
    return [];
  }
};

export default fetchProducts;
