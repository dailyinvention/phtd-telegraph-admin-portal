import * as React from 'react'
import { observer } from 'mobx-react'
import { Messages } from './messages'
import { Controls } from './controls'
import controlStore from '../stores/controlStore'

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
      <div>
        <Messages controls={this.controls} store={this.store} />
        <Controls controls={this.controls} />
      </div>
    )

  }
}