import React, { Component } from 'react'

import './commonFunc/AsyncInterceptors'
import AppRouter from './AppRouter'
import './App.css'

class App extends Component {
    render() {
        return (
            <div className='app'>
              	<AppRouter />
            </div>
         )
     }
}

export default App