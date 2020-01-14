import { Router } from 'express';
import { indexInicio } from '../controllers/index.controller'
const router = Router();

router.route('/')
.get(indexInicio);
export default router;