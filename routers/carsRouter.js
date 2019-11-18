import { Router } from 'express'
import { getAll, getOne, makeOne, changeOne, removeOne } from '../controllers/carsControllers'

const router = Router()

router
  .route('/')
  .get(getAll)
  .post(makeOne)

export default router