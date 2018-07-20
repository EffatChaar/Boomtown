import React, { Fragment } from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { ALL_ITEMS_QUERY, ALL_TAGS_QUERY } from '../apollo/queries';
import Home from './../pages/Home';
import Items from './../pages/Items';
import Profile from './../pages/Profile';
import Share from './../pages/Share';



export default () => (/* @TODO: Add your menu component here */
  <Fragment>  
    <Switch>
        <Route  exact path="/welcome" component={ Home }
                />
        <Route  exact path="/items" component={ Items }
                />
        <Route  exact path="/share" component={ Share }
                />
        <Route  exact path="/profile" component={ Profile }
                />
        <Route  exact path="/profile/:id" component={ Profile }
                />
        <Redirect to="/items" component={ Items } />           
    </Switch>
  </Fragment>
)
 {/**
       * @TODO: Define routes here for: /items, /profile, /profile/:userid, and /share
       *
       * Provide a wildcard redirect to /items for any undefined route using <Redirect />.
       *
       * Later, we'll add logic to send users to one set of routes if they're logged in,
       * or only view the /welcome page if they are not.
       */}