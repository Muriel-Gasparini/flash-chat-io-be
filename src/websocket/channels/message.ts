import { IUser } from "../../database/models/user"

function messageChannel (message: string, userAccount: IUser): void {
  console.log(`MESSAGE RECEIVED: ${message}`)
  console.log(`BY USER: ${userAccount}`)
}

export { messageChannel }