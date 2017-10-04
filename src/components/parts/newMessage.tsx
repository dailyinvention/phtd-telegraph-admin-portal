import * as React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { shiftOrder } from '../../services/utils'

interface Props {
  store: any
}

// Messages container part
@observer
export class NewMessage extends React.Component<Props, null> {
  @observable addMessageDisplay: boolean = false

  private changeDisplay = () => {
    this.addMessageDisplay = (this.addMessageDisplay) ? false : true
  }

  private addMessage = () => {
    let payloadMessages = this.props.store.controls.messages
    let emptyMessage = { 'message': '', 'timestamp': Date.now(), 'order': 1 }
    payloadMessages = (payloadMessages[0]) ? shiftOrder(payloadMessages, 2) : []
    payloadMessages.push(emptyMessage)
    let payload = {
      'messages': payloadMessages
    }
    this.props.store.newMessages(payload)
  }

  render() {
    return (
    (this.addMessageDisplay) ? 
      <div>
        <input type='text' name='newMessage' />
          <button onClick={(e) => { 
              this.changeDisplay()
            }
          }
        >Submit</button>
        <button>Cancel</button>
      </div> : 
      <button onClick={(e) => {
          this.changeDisplay()
          this.addMessage()
        }
      }>New Message</button>
    )
  }
}