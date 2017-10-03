import * as React from 'react'
import * as ReactDOM from 'react-dom'
import styled from 'styled-material-components'

import { MainContainer } from './components/mainContainer'

const StyledContainer = styled(MainContainer)`
  
`

ReactDOM.render(
    <StyledContainer />,
    document.getElementById("portal")
)
