import * as React from 'react'
import { Messages } from './messages'

interface Props { messages: any }
interface State { messages: any }

// Initial main container object
export class MainContainer extends React.Component<Props, State> {
 
    state = {messages: this.props.messages}
    public getMessages = (messages: any) => {
      messages.then((result: any) => {
        this.state.messages = JSON.parse(result)
      })
    }
    render () {
        this.getMessages(this.props.messages)
        return (
          <Messages messages={this.state.messages} />
        )
    }
}
