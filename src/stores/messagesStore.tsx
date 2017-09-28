import { action, observable } from 'mobx'
import { callPromise } from '../services/modelServices'


class MessagesStore {
  @observable messages: object[] = []

  @action getMessages () {
    let returnedMessages
    callPromise('GET', '/get-messages', null, (err: string, data: string) => {
      if (data) {
        returnedMessages = JSON.parse(data)
      }
    })
    this.messages = returnedMessages
  }
}

let messagesStore = new MessagesStore
export default messagesStore