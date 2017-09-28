import * as React from 'react'
import { Messages } from './messages'
import { observer } from 'mobx-react'

interface Props { messagesStore: any }

// Initial main container object
@observer
export class MainContainer extends React.Component<Props, null> {

  render() {
    if (this.state.messagesArray) {
      return (
        <Messages messagesStore={this.props.messagesStore} />
      )
    }
    return null
  }
}