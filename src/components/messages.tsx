import * as React from 'react'
import { observer } from 'mobx-react'
import { Message } from './parts/message'
import { Button as DeleteButton} from './parts/button'

interface Props {
  controls: { messages: Array<object> }
}

// Messages container part
@observer
export class Messages extends React.Component<Props, null> {
  private messageList: Array<any> = []

  render() {
    if (this.props.controls) {
      this.props.controls.messages.map((messageObj: { message: string, timestamp: number }) => {
        this.messageList.push(
          <div key={messageObj.timestamp}>
            <Message>{messageObj.message}</Message>
            <DeleteButton imageSrc={'/site/images/deletecustom.png'} imageAlt={'Delete button'} />
          </div>
        )
      })
    }
    return (
      <ul>{(this.messageList[0]) && this.messageList }</ul>
    )
  }
}