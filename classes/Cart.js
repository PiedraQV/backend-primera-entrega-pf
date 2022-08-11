export default class Cart {
  constructor(id, products) {
    this.id = id;
    this.products = products;
    this.timestamp = Date.now();
  }
  
  getId() {
    return this.id;
  }

  getProducts() {
    return this.products;
  }

  getTimestamp() {
    return this.timestamp;
  }

  setProducts(products) {
    this.products = products;
  }
}
