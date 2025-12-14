import { Router } from "express";
import test_controller from "../controllers/test.js";


const router = Router()

router.get('/orders', test_controller);
router.get('/orders/:id', test_controller);
router.post('/orders', test_controller);
router.put('/orders/:id', test_controller);
router.delete('/orders/:id', test_controller);
router.get('/orders/:id/items', test_controller);
router.post('/orders/:id/cancel', test_controller);

export default router;