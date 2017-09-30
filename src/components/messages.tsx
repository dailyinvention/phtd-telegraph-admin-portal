import * as React from 'react'
import { observer } from 'mobx-react'
import { Message } from './parts/message'

interface Props {
  controls: { messages: Array<object> }
}

// Messages container part
@observer
export class Messages extends React.Component<Props, null> {
  private messageList: Array<any> = []

  render() {
    if (this.props.controls) {
      this.props.controls.messages.map((messageObj: { message: string }, idx: number) => {
        this.messageList.push(<Message key={idx}>{messageObj.message}</Message>)
      })
    }
    return (
      <ul>{(this.messageList[0]) && this.messageList }</ul>
    )
  }
}