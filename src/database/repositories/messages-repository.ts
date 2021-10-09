import { IMessage } from '../models/messages'
import Message from '../models/messages'

class MessagesRepository {

  async create (data: IMessage): Promise<void | Error | IMessage> {
    try {
      return await Message.create(data)
    } catch (error) {
      throw error
    }
  }

  async findById(id: string): Promise<IMessage> {
    try {
      const message = await Message.findOne({ _id: id })

      if (!message) {
        throw new Error('This message does not exist')
      }

      return message
    } catch (error) {
      throw error
    }
  }

  async findAllMessagesWithUserPopulated(): Promise<IMessage[]> {
    try {
      const messages = await Message.find().populate('user')
      return messages
    } catch (error) {
      throw error
    }
  }

}

export { MessagesRepository }
