import React, { useEffect } from 'react'
import './App.css'

import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from 'react-router-dom'

//Redux
import { Provider } from 'react-redux'
import store from './store'

//Components
import Landing from './pages/Landing'
import NewPost from './pages/NewPost'
import GetProfile from './pages/GetProfile'
import CreateProfile from './pages/CreateProfile'
import ReadPost from './pages/ReadPost'
import GetMyProfile from './pages/GetMyProfile'

import Login from './pages/Login'
import Register from './pages/Register'

//PrivateRoute
import PrivateRoute from './routing/PrivateRoute'

//Actions
import { loadUser } from './actions/auth'
import setAuthToken from './utils/setAuthToken'

//홈페이지에 들어갈때마다 token이 있는지 확인하기
if (localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route
              exact
              path="/get-profile/:id"
              render={(routeProps) => (
                <GetProfile {...routeProps} key={routeProps.match.params.id} />
              )}
              // component={withRouter(GetProfile)}
            />
            <Route exact path="/read-post/:id" component={ReadPost} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <PrivateRoute exact path="/new-post" component={NewPost} />
            <PrivateRoute
              exact
              path="/get-my-profile"
              component={GetMyProfile}
            />
            <PrivateRoute
              exact
              path="/create-profile"
              component={CreateProfile}
            />
          </Switch>
        </Router>
      </div>
    </Provider>
  )
}

export default App
