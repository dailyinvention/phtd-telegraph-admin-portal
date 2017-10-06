import * as React from 'react'
import { observer } from 'mobx-react'
import { Messages } from './messages'
import { Controls } from './controls'
import controlStore from '../stores/controlStore'
import styled from 'styled-components'
import { styles } from '../styles'

const ContainerDiv = styled.div`
  background-color: ${ styles.defaultPrimaryColor };
  margin: 50px;
  padding: 10px;
  border-radius: 2px;

  @media only screen and (max-width : 426px) {
    margin: 10px;
  }
`
const ContainerH1 = styled.h1`
  color: ${ styles.textPrimaryColor };
  font-size: 20px;
  font-weight: normal;
  font-family: ${ styles.fontFamily };
`

// Initial main container object
@observer
export class MainContainer extends React.Component<null, null> {
  private controls: { messages: Array<object>, controls: Array<object> }
  private store: any

  componentWillMount () {
    controlStore.getControls()
  }

  render() {
    this.controls = controlStore.controls
    this.store = controlStore
    return (
      <ContainerDiv>
        <ContainerH1>Messages:</ContainerH1>
        <Messages controls={this.controls} store={this.store} />
        <ContainerH1>Controls:</ContainerH1>
        <Controls controls={this.controls} />
      </ContainerDiv>
    )

  }
}