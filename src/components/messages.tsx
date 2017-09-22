import * as React from 'react'
import { Message } from './parts/message'

export interface Props { messages: Array<any> }

// Messages container part
export class Messages extends React.Component<Props, undefined> {
  render() {
    let messageList = this.props.messages.map((messageObj: { message: string }) => {
      <Message>{messageObj.message}</Message>
    })
    return (
      <ul>{messageList}</ul>
    )
  }
}