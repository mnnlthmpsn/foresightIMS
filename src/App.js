import React from 'react'
import { Route, Switch } from 'react-router-dom'

// components
import Home from './components/home'
import Next from './components/next'

const App = () => (
  <div>
    <main>
      {/* routes */}
      <Switch>
        <Route path='/' component={Home} exact/>
        <Route path='/next' component={Next} />
      </Switch>
    </main>
  </div>
)

export default App