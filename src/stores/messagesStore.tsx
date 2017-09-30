import { action, observable } from 'mobx'
import { observer } from 'mobx-react'
import { callPromise } from '../services/modelServices'

class MessagesStore {
  @observable messages: object[] = []

  @action getMessages () {
    let returnedMessages
    callPromise('GET', '/get-messages', null).then((data: string) => {
      this.messages = []
      if (data) {
        this.messages = JSON.parse(data)
      }
    })
  }
}

let messagesStore = new MessagesStore
export default messagesStore