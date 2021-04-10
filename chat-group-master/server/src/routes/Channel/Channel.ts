import express, { Request, Response } from 'express'
import { channelController } from '../../controllers/index'

export const router = express.Router()

router.post('/', channelController.create)

router.get('/', channelController.read  )