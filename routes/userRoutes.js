import express from 'express';
import userController from '../controllers/userController.js';

const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = userController;

//// 3) ROUTES
// chain calls on the same route, functions the same as the code above.

const router = express.Router();

router.route('/').get(getAllUsers).post(createUser);

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

export default router;
