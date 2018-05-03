/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { AppRegistry,} from 'react-native'
import Game from './src/index.js'

const APP_INFO=require('./app.json')

if(APP_INFO.appMode==='game'){
    AppRegistry.registerComponent('game', () => Game)
}


