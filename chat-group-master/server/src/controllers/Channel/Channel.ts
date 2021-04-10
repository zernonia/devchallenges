import { Channel, Message, User } from '../../models/index'
import { Request, Response } from 'express'
import { CrudController } from '../CrudController'

export class ChannelController extends CrudController {
  public async create(
    req: Request<import("express-serve-static-core").ParamsDictionary>,
    res: Response
  ): Promise<void> {
    const { name, admin, description } = req.body
    try {
      const channel = await Channel.create({ admin, name, description })
      const data = {
        $push: {
          channel: channel._id
        }
      }
      const user = await User.findByIdAndUpdate( admin , data)
      res.status(201).json(channel)
    } catch (err) {
      res.status(400).json(err)
    }
  }

  public async addMessage (
    req: Request<import("express-serve-static-core").ParamsDictionary>,
    res: Response
  ): Promise<void> {
    const { message, user } = req.body
    try {
      const msg = await Message.create({ user, message })
      res.status(201).json(msg)

    } catch (err) {
      res.status(400).json(err)
    }
  }
  
  public (
    req: Request<import("express-serve-static-core").ParamsDictionary>,
    res: Response
  ): void {
    throw new Error("Method not implemented.");
  }

  public async read(
    req: Request<import("express-serve-static-core").ParamsDictionary>,
    res: Response
  ): Promise<void> {
    try {
      const channel = await Channel.find({})
      res.json(channel)

    } catch (err) {
      res.status(400).json(err)
    }
  }

  public update(
    req: Request<import("express-serve-static-core").ParamsDictionary>,
    res: Response
  ): void {
    throw new Error("Method not implemented.");
  }

  public delete(
    req: Request<import("express-serve-static-core").ParamsDictionary>,
    res: Response
  ): void {
    throw new Error("Method not implemented.");
  }
}
