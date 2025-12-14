import { Router } from "express";
import test_controller from "../controllers/test.js";


const router = Router()

router.get('/users/profile', test_controller); // user
router.put('/users/profile', test_controller); // user
router.delete('/users/profile', test_controller); // user
router.get('/users/profile/orders', test_controller); // user

router.get('/users', test_controller); // admin
router.get('/users/:id', test_controller); // admin
router.get('/users/:id/orders', test_controller); // admin
router.put('/users/:id', test_controller); // admin
router.delete('/users/:id', test_controller); // admin


export default router;