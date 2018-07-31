import React,{Fragment}  from 'react'
import { Redirect, Route, Switch } from 'react-router'
import Home from './../pages/Home';
import Items from './../pages/Items';
import Profile from './../pages/Profile';
import Share from './../pages/Share';
import { ViewerContext } from '../context/ViewerProvider';
import Header from '../components/Header/Header'

export default () => (
  <ViewerContext.Consumer>
    {({ loading, viewer, error }) => {
      if (loading) return '...Loading...'
      if (!viewer) {
        return (
          <Switch>
            <Route
             exact path='/welcome' name='home'component={Home}
            />
            <Redirect from='*' to='/welcome' />
          </Switch>
          )
        }
        return (  
          <Fragment>
            <Header/>
          <Switch>
            <Route  exact path="/items" component={ Items }
                />
            <Route  exact path="/share" component={ Share }
                />
            <Route  exact path="/profile" component={ Profile }
                />
            <Route  exact path="/profile/:userid" component={ Profile }
                />           
            <Redirect to="/items" />
          </Switch>
          </Fragment>
        )}}
  </ViewerContext.Consumer>
)
