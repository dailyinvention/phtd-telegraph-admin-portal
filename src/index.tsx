import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { MainContainer } from './components/mainContainer'
import { getMessages } from './services/modelServices'

interface DispatchProps {
  getMessages():Promise<any>
}

ReactDOM.render(
    <MainContainer messages={getMessages()} />,
    document.getElementById("portal")
)
