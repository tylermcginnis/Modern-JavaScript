import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Nav from './Nav'
import Loading from './Loading'

const Home = lazy(() => import('./Home'))
const Battle = lazy(() => import('./Battle'))
const Results = lazy(() => import('./Results'))
const Popular = lazy(() => import('./Popular'))

function App () {
  return (
    <Router>
      <div className='container'>
        <Nav />

        <Suspense fallback={<Loading />}>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/battle' component={Battle} />
            <Route path='/battle/results' component={Results} />
            <Route path='/popular' component={Popular} />
            <Route render={() => <p>Not Found</p>} />
          </Switch>
        </Suspense>
      </div>
    </Router>
  )
}

export default App;