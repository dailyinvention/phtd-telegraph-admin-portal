import * as React from 'react'
import * as ReactDOM from 'react-dom'
import messagesStore from './stores/messagesStore'

import { MainContainer } from './components/mainContainer'

ReactDOM.render(
    <MainContainer messagesStore={ messagesStore } />,
    document.getElementById("portal")
)
