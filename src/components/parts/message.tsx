import * as React from 'react'
import { observer } from 'mobx-react'


// Messages container part
@observer
export class Message extends React.Component {
  render() {
    return (
      <span>{this.props.children}</span>
    )
  }
}