import express from "../services/express.js";
import CartContainer from "./../classes/CartContainer.js";
import ProductContainer from "./../classes/ProductContainer.js";
import { __dirname, returnMessage } from "../utils.js";

const router = express.Router();
const cartContainer = new CartContainer(__dirname + "/data/carts.txt");
const productContainer = new ProductContainer(__dirname + "/data/products.txt");

router.post("/", async (req, res) => {
  const products = req.body.products.map(Number);
  const allProducts = (await productContainer.getAll()).payload;
  const foundProducts = await allProducts.filter((product) =>
    products.includes(product.id)
  );
  const cart = await cartContainer.save({ products: foundProducts });
  res.json(cart);
});

router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const cart = await cartContainer.deleteById(id);
  res.json(cart);
});

router.get("/:id/productos", async (req, res) => {
  const id = parseInt(req.params.id);
  const cart = await cartContainer.getById(id);
  res.json(cart);
});

router.post("/:id/productos", async (req, res) => {
  const id = parseInt(req.params.id);
  const products = req.body.products.map(Number);
  const allProducts = (await productContainer.getAll()).payload;
  const foundProducts = await allProducts.filter((product) =>
    products.includes(product.id)
  );
  if (foundProducts.length === 0) {
    res.json(returnMessage(true, "No se encontraron productos", null));
  } else {
    const result = await cartContainer.addProductToCartById(id, foundProducts);
    res.json(result);
  }
});

router.delete("/:id/productos/:productId", async (req, res) => {
  const id = parseInt(req.params.id);
  const productId = parseInt(req.params.productId);
  const cart = await cartContainer.deleteProductFromCartById(id, productId);
  res.json(cart);
});

export default router;
