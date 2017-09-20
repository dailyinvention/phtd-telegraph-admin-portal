import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { MainContainer } from './components/mainContainer'
import { getMessages } from './services/models'

ReactDOM.render(
    <MainContainer messages={this.getMessages} />,
    document.getElementById("portal")
);
