import { action, observable } from 'mobx'
import { observer } from 'mobx-react'
import { callPromise } from '../services/modelServices'

class ControlStore {
  @observable controls: { messages: object[], controls: object[] }

  @action getControls () {
    callPromise('GET', '/get-controls', null).then((data: string) => {
      this.controls = { messages: [], controls: [] }
      if (data) {
        this.controls = JSON.parse(data)
      }
    })
  }

  @action updateControlValue (name) {
    callPromise('PUT', '/update-control-value', {}).then((data: string) => {
      this.controls = { messages: [], controls: [] }
      if (data) {
        this.controls = JSON.parse(data)
      }
    })
  }
}

let controlStore = new ControlStore
export default controlStore