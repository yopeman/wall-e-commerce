import { Router } from "express";
import test_controller from "../controllers/test.js";


const router = Router()

router.get('/products', test_controller);
router.get('/products/search', test_controller);
router.get('/products/:id', test_controller);
router.post('/products', test_controller);
router.put('/products/:id', test_controller);
router.delete('/products/:id', test_controller);
router.post('/products/:id/images', test_controller);
router.delete('/products/:id/images/:imgId', test_controller);

export default router;