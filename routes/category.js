import { Router } from "express";
import test_controller from "../controllers/test.js";


const router = Router()

router.get('/categories', test_controller);
router.get('/categories/:id', test_controller);
router.post('/categories', test_controller);
router.put('/categories/:id', test_controller);
router.delete('/categories/:id', test_controller);
router.get('/categories/:id/products', test_controller);

export default router;