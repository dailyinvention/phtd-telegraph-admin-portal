import * as React from 'react'
import { observer } from 'mobx-react'

interface Props {
  type: string,
  label: string,
  name: string,
  value: number
}

interface State {
  fieldValue: number
}

// Messages container part
@observer
export class Control extends React.Component<Props, State> {
  private controlComp: any

  constructor (props: any) {
    super(props)
    this.state = {
      fieldValue: props.fieldValue || 1000
    }
  }

  private handleChange = (e: any) => {
    this.setState({
      fieldValue: e.target.value
    })
  }

  componentWillMount () {
    switch (this.props.type) {
      case 'number':
        this.controlComp = (<label>{this.props.label} <input type={this.props.type} name={this.props.name} value={this.state.fieldValue} onChange={(e) => this.handleChange(e)} /></label>)
        break
    }
  }

  render () {
    return (<li>{ this.controlComp }</li>)
  }
}