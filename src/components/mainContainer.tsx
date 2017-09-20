import * as React from 'react'

export interface InitialProps { messages: object }

// 'HelloProps' describes the shape of props.
// State is never set so we use the 'undefined' type.
export class MainContainer extends React.Component<InitialProps, undefined> {
    render() {
        return (
          <div>{ this.props.messages }</div>
        )
    }
}
