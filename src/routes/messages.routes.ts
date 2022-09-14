


import { Router } from 'express';
import { create, getChat } from '../controllers/messages.controllers';
import { verifyJwt } from '../middlewares/verify-jwt.middleware';


const router: Router = Router();


router.get('/:to', verifyJwt , getChat )

router.post('/', verifyJwt , create )


export default router;