import * as React from 'react'
import { observer } from 'mobx-react'
import { Control } from './parts/control'
import styled from 'styled-components'
import { styles } from '../styles'

interface Props {
  controls: { controls: Array<object> }
}

const ControlsContainer = styled.ul`
  background-color: ${ styles.lightPrimaryColor };
  display: block;
  padding: 10px;
  margin: 10px 0px 0px 0px;
  border-radius: 2px;
  box-shadow: 1px 1px 1px #515151;
  list-style: none;
  && li {
    font-family: ${ styles.fontFamily }
  }
`

// Messages container part
@observer
export class Controls extends React.Component<Props, null> {
  
  private controlList: Array<any> = []

  render() {
    if (this.props.controls) {
      this.controlList = []
      this.props.controls.controls.map((messageObj: { type: string, label: string, name: string, value: number, order: number }, idx: number) => {
        this.controlList.push(<Control key={idx} type={messageObj.type} label={messageObj.label} name={messageObj.name} value={messageObj.value} order={messageObj.order} controls={this.props.controls} />)
      })
    }
    return (
      <ControlsContainer>{(this.controlList[0]) && this.controlList }</ControlsContainer>
    )
  }
}