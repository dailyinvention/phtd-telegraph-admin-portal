import * as React from 'react'
import { Message } from './parts/message'

export interface Props { messages: Array<object> }

// Messages container part
export class Messages extends React.Component<Props, undefined> {
  render() {
    let messageList : Array<any>
    if (this.props.messages) {
      this.props.messages.map((messageObj: { message: string }) => {
        messageList.push(<Message>{messageObj.message}</Message>)
      })
    }
    return (
      <ul>{(messageList) && {messageList}}</ul>
    )
  }
}