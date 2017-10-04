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
  private timeStamp: number

  private changeDisplay = () => {
    this.addMessageDisplay = (this.addMessageDisplay) ? false : true
  }

  // Initiates when 'New Message' button clicked
  private addMessage = () => {
    let payloadMessages = this.props.store.controls.messages
    this.timeStamp = Date.now()
    let emptyMessage = { 'message': '', 'timestamp': this.timeStamp, 'order': 1 }
    payloadMessages = (payloadMessages[0]) ? shiftOrder(payloadMessages, 2) : []
    payloadMessages.push(emptyMessage)
    let payload = {
      'messages': payloadMessages
    }
    this.props.store.changeMessages(payload)
  }

  // Initiates when 'Cancel' button clicked.  Removes empty message from database.
  private cancelMessage = () => {
    let payloadMessages = this.props.store.controls.messages
    let newPayloadMessages: { message: string, timestamp: number, order: number }[] = []
    payloadMessages.map((payloadMessage: { message: string, timestamp: number, order: number }) => {
      if (payloadMessage.timestamp !== this.timeStamp) {
        newPayloadMessages.push(payloadMessage)
      }
    })
    payloadMessages = shiftOrder(newPayloadMessages, 1)
    let payload = {
      messages: payloadMessages
    }
    this.props.store.changeMessages(payload, true)
    this.changeDisplay()
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
        <button onClick={this.cancelMessage}>Cancel</button>
      </div> : 
      <button onClick={(e) => {
          this.changeDisplay()
          this.addMessage()
        }
      }>New Message</button>
    )
  }
}