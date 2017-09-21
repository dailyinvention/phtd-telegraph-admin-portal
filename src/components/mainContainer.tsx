import * as React from 'react'
import { Messages } from './messages'

export interface InitialProps { messages: Array<any> }

// Initial main container object
export class MainContainer extends React.Component<InitialProps, undefined> {
    render() {
        return (
          <Messages messages={this.props.messages} />
        )
    }
}
