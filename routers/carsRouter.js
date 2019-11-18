import { Router } from 'express'
import { getAll, getOne, makeOne, changeOne, removeOne } from '../controllers/carsControllers'
import { validateId, validatePost } from '../middleware/carsMiddleware';

const router = Router()

router
  .route('/')
  .get(getAll)
  .post(validatePost, makeOne)

router
  .route('/:id')
  .all(validateId)
  .get(getOne)
  .put(validatePost, changeOne)
  .delete(removeOne)

export default router