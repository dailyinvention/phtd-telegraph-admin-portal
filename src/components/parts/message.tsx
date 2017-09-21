import * as React from 'react'

// Messages container part
export class Message extends React.Component {
  render() {
    return (
      <li>{this.props.children}</li>
    )
  }
}