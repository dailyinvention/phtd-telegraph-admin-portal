
let shiftOrder = (array: { message: string, timestamp: number, order: number }[], startNum: number) => {
  let newArray: Array<object> = []
  array.map((item) => {
    item.order = startNum
    newArray.push(item)
    startNum++
  })
  return newArray
}



export { shiftOrder }