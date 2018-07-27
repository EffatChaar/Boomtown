import React, { Fragment } from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { ALL_ITEMS_QUERY, ALL_TAGS_QUERY } from '../apollo/queries';
import Home from './../pages/Home';
import Items from './../pages/Items';
import Profile from './../pages/Profile';
import Share from './../pages/Share';
import { ViewerContext } from '../context/ViewerProvider';
import FullScreenLoader from '../components/FullScreenLoader'


export default () => (
  <ViewerContext.Consumer>
    {({ loading, viewer, error }) => {
      if (!loading) return <FullScreenLoader />
      if (!viewer) {
        return (
          <Switch>
           <Route
             exact
             path='/welcome'
             name='home'
             component={Home}
           />
         <Redirect from='*' to='/welcome' />
        </Switch>
    )}}}
  </ViewerContext.Consumer>
)