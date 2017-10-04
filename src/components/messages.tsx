import * as React from 'react'
import { observer } from 'mobx-react'
import { Message } from './parts/message'
import { NewMessage } from './parts/newMessage'

interface Props {
  controls: { messages: Array<object> }
  store: any
}

// Messages container part
@observer
export class Messages extends React.Component<Props, null> {
  private messageList: Array<any> = []
  public displayNewMessage: boolean

  private deleteClick = (timestamp: number) => {
    this.props.store.deleteMessage({'timestamp': timestamp})
  }

  render() {
    if (this.props.controls) {
      this.messageList = []
      this.props.controls.messages.map((messageObj: { message: string, timestamp: number }) => {
        this.messageList.push(
          <div key={messageObj.timestamp}>
            <Message>{messageObj.message}</Message>
            <button onClick={(e: any) => { this.deleteClick(messageObj.timestamp)}} >
              <img src='/images/deletecustom.png' alt='Delete button' />
            </button>
          </div>
        )
      })
    }
    return (
      <ul><NewMessage store={this.props.store} />{(this.messageList[0]) && this.messageList }</ul>
    )
  }
}