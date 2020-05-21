import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './login'
import Home from './home'
import QuestionForm from './QuestionForm'
import Leaderboard from './leaderBoard'
import QuestionView from './QuestionView'
import  PrivateRoute from '../authentication/PrivateRoute'
import NotFound from './404Page'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
    console.log('----------')
  }

  render() {
    return (
      <div className="App"> 
        <Router>
              <PrivateRoute path="/" exact component={ Home }/> 
              <PrivateRoute path="/add" component={ QuestionForm }/>
              <PrivateRoute path="/leaderboard" component={ Leaderboard }/>
              <Route path="/login" exact component={ Login }/>
              <PrivateRoute path="/404-page" component={NotFound}/>
              <PrivateRoute path="/questions/:id" component={ QuestionView }/>
        </Router>
      </div>
    )
  }
}

export default connect()(App)
