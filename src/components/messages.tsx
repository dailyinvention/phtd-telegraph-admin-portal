import * as React from 'react'
import { Message } from './parts/message'

export interface containerProps { messages: Array<any> }

// Messages container part
export class Messages extends React.Component<containerProps, undefined> {
  render() {
    let messageList = this.props.messages.map((messageObj: { message: string }) => {
      <Message>{messageObj.message}</Message>
    })
    return (
      <ul>{messageList}</ul>
    )
  }
}