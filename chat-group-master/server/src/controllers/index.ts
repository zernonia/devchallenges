import { UserController } from './User/User'
import { ChannelController } from './Channel/Channel'

const userController = new UserController()
const channelController = new ChannelController()

export {
  userController,
  channelController
}