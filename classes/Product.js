class Product {
  constructor(id, title, description, code, stock, price, thumbnail) {
    this.title = title;
    this.price = parseFloat(price);
    this.description = description;
    this.code = code;
    this.stock = parseInt(stock);
    this.thumbnail = thumbnail;
    this.id = id;
    this.timestamp = Date.now();
  }
  getId() {
    return this.id;
  }
  getTitle() {
    return this.title;
  }
  getThumbnail() {
    return this.thumbnail;
  }
  getPrice() {
    return this.price;
  }
  getDescription() {
    return this.description;
  }
  getCode() {
    return this.code;
  }
  getStock() {
    return this.stock;
  }
  getTimestamp() {
    return this.timestamp;
  }

  setTitle(title) {
    this.title = title;
  }
  setDescription(description) {
    this.description = description;
  }
  setCode(code) {
    this.code = code;
  }
  setStock(stock) {
    this.stock = parseInt(stock);
  }
  setPrice(price) {
    this.price = parseFloat(price);
  }
  setThumbnail(thumbnail) {
    this.thumbnail = thumbnail;
  }
}

export default Product;
