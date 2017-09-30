import * as React from 'react'
import { observer } from 'mobx-react'
import { Message } from './parts/message'
import messagesStore from '../stores/messagesStore'

// Messages container part
@observer
export class Messages extends React.Component<null, null> {
  private messages: Array<object>
  private messageList: Array<any> = []

  componentWillMount () {
    messagesStore.getMessages()
  }

  render() {
    this.messages = messagesStore.messages
    if (this.messages instanceof Array) {
      this.messages.map((messageObj: { message: string }, idx: number) => {
        this.messageList.push(<Message key={idx}>{messageObj.message}</Message>)
      })
    }
    return (
      <ul>{(this.messageList[0]) && this.messageList }</ul>
    )
  }
}