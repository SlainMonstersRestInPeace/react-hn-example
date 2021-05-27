import './css/index.scss'

import React from 'react'
import { default as ReactDom } from 'react-dom'

import App from './App'
import store from './redux/store'
import { Provider } from 'react-redux'

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)