import * as React from 'react'
import { observer } from 'mobx-react'
import { Control } from './parts/control'

interface Props {
  controls: { controls: Array<object> }
}

// Messages container part
@observer
export class Controls extends React.Component<Props, null> {
  
  private controlList: Array<any> = []

  render() {
    if (this.props.controls) {
      this.props.controls.controls.map((messageObj: { type: string, label: string, name: string, value: number, order: number }, idx: number) => {
        this.controlList.push(<Control key={idx} type={messageObj.type} label={messageObj.label} name={messageObj.name} value={messageObj.value} order={messageObj.order} controls={this.props.controls} />)
      })
    }
    return (
      <ul>{(this.controlList[0]) && this.controlList }</ul>
    )
  }
}