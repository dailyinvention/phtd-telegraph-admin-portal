import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { injectGlobal } from 'styled-components'

import { MainContainer } from './components/mainContainer'

injectGlobal`
  @font-face {
    font-family: 'Droid Serif';
    src: url('/assets/DroidSerif-Regular.ttf');
  }
`

ReactDOM.render(
    <MainContainer />,
    document.getElementById("portal")
)
