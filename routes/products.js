import express from "../services/express.js";
import upload from "../services/upload.js";
import ProductContainer from "../classes/ProductContainer.js";
import { __dirname, authMiddleware } from "../utils.js";

const router = express.Router();
const productContainer = new ProductContainer(__dirname + "/data/products.txt");

const filePath = (filename) => {
  const urlBase = process.env.URLBASE || "http://localhost:8080";
  return `${urlBase}/images/${filename}`;
};


router.get("/", async (_, res) => {
  const result = await productContainer.getAll();
  res.json(result);
});


router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const result = await productContainer.getById(id);
  res.json(result);
});

router.post(
  "/",
  authMiddleware,
  upload.single("thumbnail"),
  async (req, res) => {
    const product = req.body;
    if (req.file) {
      const thumbnail = filePath(req.file.filename);
      product.thumbnail = thumbnail;
      const result = await productContainer.save(product);
      res.json(result);
    } else {
      res.json(
        JSON.stringify({
          status: "error",
          message: "La imagen no se pudo subir",
          payload: null,
        })
      );
    }
  }
);

router.put(
  "/:id",
  authMiddleware,
  upload.single("thumbnail"),
  async (req, res) => {
    const id = parseInt(req.params.id);
    const product = req.body;
    product.thumbnail = null;
    if (req.file) {
      const thumbnail = filePath(req.file.filename);
      product.thumbnail = thumbnail;
    }
    const result = await productContainer.updateById(id, product);
    res.json(result);
  }
);

router.delete("/:id", authMiddleware, async (req, res) => {
  const id = parseInt(req.params.id);
  const result = productContainer.deleteById(id);
  res.json(result);
});

export default router;
