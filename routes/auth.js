import { Router } from "express";
import test_controller from "../controllers/test.js";

const router = Router()

router.post('/register', test_controller);
router.post('/login', test_controller);

export default router;