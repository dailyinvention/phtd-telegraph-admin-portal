import * as React from 'react'

export interface InitialProps { messages: string }

// 'HelloProps' describes the shape of props.
// State is never set so we use the 'undefined' type.
export class MainContainer extends React.Component<InitialProps, undefined> {
    render() {
        return this.props.messages
    }
}
