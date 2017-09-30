
 export function callPromise(serviceType: string, url: string, payload?: object, done?: (err: string, data: string) => void) {
  return new Promise((resolve: any, reject: any) => {
    let xhr = new XMLHttpRequest()
    xhr.open(serviceType, url)
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response)
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
