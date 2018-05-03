import React, { Component } from 'react'
import RootRouter from './router'

import './App.css'

class App extends Component {
    render() {
        return (
            <div className='app'>
              	<RootRouter />
            </div>
         )
     }
}

export default App