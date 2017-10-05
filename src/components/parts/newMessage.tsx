import * as React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { shiftOrder } from '../../services/utils'
import styled from 'styled-components'
import { styles } from '../../styles'

interface Props {
  store: any
}

const StyledButton = styled.button`
  padding: 10px;
  font-size: 16px;
  margin: 10px 0px 10px 10px;
  border-radius: 5px;
  background-color: ${ styles.darkPrimaryColor };
  color: ${ styles.textPrimaryColor };
  cursor: pointer;
  border: 0px;
  box-shadow: 1px 1px 1px #999;
  font-family: ${ styles.fontFamily };
  &:hover {
    background-color: ${ styles.defaultPrimaryColor };
  }
`
const StyledInput = styled.input`
  font-size: 14px;
  padding: 10px;
  height: 20px;
  margin: 10px 0px 10px 10px;
`

// Messages container part
@observer
export class NewMessage extends React.Component<Props, null> {
  @observable addMessageDisplay: boolean = false
  private timeStamp: number
  private order: number
  private fieldValue: string

  private changeDisplay = () => {
    this.addMessageDisplay = (this.addMessageDisplay) ? false : true
  }

  // Initiates when 'New Message' button clicked
  private addMessage = () => {
    let payloadMessages = this.props.store.controls.messages
    this.timeStamp = Date.now()
    this.order  = 1
    let emptyMessage = { 'message': '', 'timestamp': this.timeStamp, 'order': this.order }
    payloadMessages = (payloadMessages[0]) ? shiftOrder(payloadMessages, 2) : []
    payloadMessages.push(emptyMessage)
    let payload = {
      'messages': payloadMessages
    }
    this.props.store.changeMessages(payload, true)
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

  // Updates message value when value entered in input field
  private handleChange = (e: any) => {
    this.fieldValue = e.target.value
    let payload: Object = { 
      message: this.fieldValue,
      timestamp: this.timeStamp,
      order: this.order
    }

    this.props.store.updateMessageValue(payload)
    //controlStore.getControls()
  }

  render() {
    return (
    (this.addMessageDisplay) ? 
      <div>
        <StyledInput type='text' name='newMessage' onChange={(e) => this.handleChange(e)}  />
          <StyledButton onClick={(e) => { 
              this.changeDisplay()
              this.props.store.getControls()
            }
          }
        >Submit</StyledButton>
        <StyledButton onClick={this.cancelMessage}>Cancel</StyledButton>
      </div> : 
      <StyledButton onClick={(e) => {
          this.changeDisplay()
          this.addMessage()
        }
      }>New Message</StyledButton>
    )
  }
}