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

  @action changeMessages (payload: Object, reloadMessages?: boolean) {
    callPromise('POST', '/change-messages', payload).then((data: string) => {
      if (data) {
        console.log(data)
        if (reloadMessages) {
          this.getControls()
        }
      }
    })
  }

  @action updateMessageValue (payload: Object) {
    callPromise('PUT', '/update-message-value', payload).then((data: string) => {
      if (data) {
        console.log(data)
        this.getControls()
      }
    })
  }
}

let controlStore = new ControlStore
export default controlStore