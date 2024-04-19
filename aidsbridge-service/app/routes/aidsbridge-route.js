import express from 'express';
import * as hivController from '../controllers/aidsbridge-controller.js';
const router = express.Router();

router.route('/login')
.post(hivController.userLogin);

export default router;