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

  @action updateControlValue (payload: Object) {
    callPromise('PUT', '/update-control-value', payload).then((data: string) => {
      if (data) {
        console.log(data)
      }
    })
  }

  @action deleteMessage (payload: Object) {
    callPromise('DELETE', '/delete-message', payload).then((data: string) => {
      if (data) {
        console.log(data)
      }
    })
  }
}

let controlStore = new ControlStore
export default controlStore