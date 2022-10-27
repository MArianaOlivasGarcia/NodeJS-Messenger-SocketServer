import { Router } from 'express';
import { login, register, renew } from '../controllers/auth.controllers';
import { verifyJwt } from '../middlewares/verify-jwt.middleware';


const router: Router = Router();

router.post('/register', register )

router.post('/login', login )

// router.get('/renew', verifyJwt , renew )
router.get('/renew',renew )


export default router;