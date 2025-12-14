import { Router } from "express";
import test_controller from "../controllers/test.js";


const router = Router()

router.get('/payments', test_controller);
router.get('/payments/:id', test_controller);
router.post('/payments', test_controller);
router.put('/payments/:id', test_controller);
router.get('/payments/webhook', test_controller);
router.get('/payments/orders/:orderId', test_controller);

export default router;