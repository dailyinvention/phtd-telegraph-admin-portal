import * as React from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import controlStore from '../../stores/controlStore'
import styled from 'styled-components'
import { styles } from '../../styles'

interface Props {
  type: string,
  label: string,
  name: string,
  value: number,
  order: number,
  controls: { controls: Array<object> }
}

interface State {
  fieldValue: number
}

const StyledInput = styled.input`
  font-size: 14px;
  padding: 10px;
  height: 20px;
  margin: 10px 0px 10px 10px;
`

// Messages container part
@observer
export class Control extends React.Component<Props, State> {
  private controlComp: any
  @observable fieldValue: number

  private handleChange = (e: any) => {
    this.fieldValue = e.target.value
    let payload: Object = { 
      type: this.props.type,
      label: this.props.label,
      name: this.props.name,
      value: this.fieldValue,
      order: this.props.order
    }

    controlStore.updateControlValue(payload)
    //controlStore.getControls()
  }

  componentWillMount () {
    this.fieldValue = this.props.value
  }

  render () {
    switch (this.props.type) {
      case 'number':
        this.controlComp = (<label>{this.props.label} <StyledInput type={this.props.type} name={this.props.name} value={this.fieldValue} onChange={(e) => this.handleChange(e)} /></label>)
        break
    }
    return (<li>{ this.controlComp }</li>)
  }
}