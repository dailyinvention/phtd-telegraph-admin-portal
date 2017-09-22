
 export function callPromise(serviceType: string, url: string, payload?: object) {
  return new Promise((resolve: any, reject: any) => {
    let xhr = new XMLHttpRequest()
    xhr.open(serviceType, url)
    xhr.onload = () => {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr.response)
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText
        })
      }
    }
    xhr.onerror = () => {
      reject({
        status: this.status,
        statusText: xhr.statusText
      })
    }
    if (payload) {
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
      xhr.send(JSON.stringify(payload))
    } else {
      xhr.send()
    }
  })
}

export function getMessages () {
  let returnedMessages = this.callPromise('GET', '/get-messages')
  return returnedMessages
}
