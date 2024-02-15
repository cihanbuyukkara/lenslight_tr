import express from 'express'; // express module import edildi 
import * as userController from '../controllers/userController.js'; // photoController import edildi 
import * as authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router(); // router oluşturuldu

router.route('/register').post(userController.createUser);
router.route('/login').post(userController.loginUser);
router.route('/dashboard').get(authMiddleware.authenticateToken, userController.getDashboardPage);
router.route('/').post(userController.getAllUsers);
router.route('/id').post(userController.getAUser);



export default router; 