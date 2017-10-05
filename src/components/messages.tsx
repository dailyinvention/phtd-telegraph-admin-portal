import * as React from 'react'
import { observer } from 'mobx-react'
import { Message } from './parts/message'
import { NewMessage } from './parts/newMessage'
import { shiftOrder } from '../services/utils'
import styled from 'styled-components'
import { styles } from '../styles'

interface Props {
  controls: { messages: Array<object> }
  store: any
}

const MessagesContainer = styled.ul`
  background-color: ${ styles.lightPrimaryColor };
  display: block;
  padding: 10px;
  margin: 0;
  border-radius: 2px;
  box-shadow: 1px 1px 1px #515151;
  list-style: none;
`
const MessagesLI = styled.li`
  display: block;
  margin: 10px;
  padding: 20px;
  background-color: ${(props: { isNew: boolean }) => (props.isNew) ? styles.accentColor : styles.textPrimaryColor };
  box-shadow: 1px 1px 1px #999;
  font-family: ${ styles.fontFamily };
  color: ${ styles.primaryTextColor };
  font-size: 17px;
  border: 1px solid ${ styles.dividerColor };
  && span {
    line-height: 50px;
  }
`
const DeleteButton = styled.button`
  border-radius: 50%;
  background-color: ${ styles.lightPrimaryColor };
  border: 1px solid #BDBDBD;
  float: right;
  && img {
    opacity: 0.5;
  }
  cursor: pointer;
`

const ClearFloat = styled.br`
  clear: both;
`

// Messages container part
@observer
export class Messages extends React.Component<Props, null> {
  private messageList: Array<any> = []
  public displayNewMessage: boolean

  private deleteClick = (timestamp: number) => {
    let payloadMessages = this.props.store.controls.messages
    let newPayloadMessages: { message: string, timestamp: number, order: number }[] = []
    payloadMessages.map((payloadMessage: { message: string, timestamp: number, order: number }) => {
      if (payloadMessage.timestamp !== timestamp) {
        newPayloadMessages.push(payloadMessage)
      }
    })
    payloadMessages = shiftOrder(newPayloadMessages, 1)
    let payload = {
      messages: payloadMessages
    }
    this.props.store.changeMessages(payload, true)
  }

  render() {
    if (this.props.controls) {
      this.messageList = []
      this.props.controls.messages.map((messageObj: { message: string, timestamp: number, isNew?: boolean }) => {
        if (!messageObj.isNew) {
          this.messageList.push(
            <MessagesLI key={messageObj.timestamp} isNew={false}>
              <Message>{messageObj.message}</Message>
              <DeleteButton onClick={(e: any) => { this.deleteClick(messageObj.timestamp) }} >
                <img src='/images/deletecustom.png' alt='Delete button' />
              </DeleteButton><ClearFloat />
            </MessagesLI>
          )
        } else {
          this.messageList.push(
          <MessagesLI key={messageObj.timestamp} isNew={true}>
            <Message>{messageObj.message}</Message>
          </MessagesLI>
          )
        }
      })
    }
    return (
      <MessagesContainer><NewMessage store={this.props.store} />{(this.messageList[0]) && this.messageList }</MessagesContainer>
    )
  }
}