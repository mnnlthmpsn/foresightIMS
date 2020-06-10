import React from 'react'
import { Route, Switch } from 'react-router-dom'

// ui components
import Nav from './ui/nav'
import TitleBar from './ui/titlebar'

// components
import Home from './components/home'
import AddItem from './components/addItem'
import ItemContextProvider from './context/itemContext'
import SellOrUpdate from './components/sellOrUpdate'
import Sell from './components/sell'
import Update from './components/update'
import Revert from './components/revert'

const App = () => {
  return (
    <div className='container'>
      <TitleBar />
      <div className='app'>
        <div className='side'>
          <Nav />
        </div>
        <div className='main'>
          <main>
            <Switch>
              <ItemContextProvider>
                <Route path='/' component={Home} exact />
                <Route path='/add' component={AddItem} />
                <Route path='/sellOrUpdate' component={SellOrUpdate} />
                <Route path='/sell' component={Sell} />
                <Route path='/update' component={Update} />
                <Route path='/revert' component={Revert} />
              </ItemContextProvider>
            </Switch>
          </main>
        </div>
      </div>
    </div>
  )
}

export default App
